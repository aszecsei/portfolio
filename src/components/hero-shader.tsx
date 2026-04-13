'use client'

import { useEffect, useRef, useState } from 'react'
import * as styles from './hero-shader.css'

// --- GLSL Sources ---

const VERTEX_SOURCE = `#version 300 es
in vec2 aPosition;
out vec2 vUV;
void main() {
  vUV = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// Pass 1: scene (fluid + particles) rendered to FBO
const SCENE_FRAGMENT = `#version 300 es
precision highp float;

in vec2 vUV;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

// --- Ashima simplex noise (public domain) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// --- FBM (fractal Brownian motion) ---
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vec2 uv = vUV;
  float aspect = uResolution.x / uResolution.y;

  // Fluid parallax + slow ambient drift
  float t = uTime * 0.08;
  vec2 drift = vec2(sin(uTime * 0.015) * 0.01, uTime * 0.003);
  vec2 fluidUV = uv + uMouse * 0.02 + drift;
  vec2 fluidCoord = vec2(fluidUV.x * aspect, fluidUV.y);

  // --- Layer 1: Fluid with domain warping ---
  // First pass: sample noise to distort the coordinates themselves
  float warpX = snoise(vec3(fluidCoord * 1.5, t * 0.7));
  float warpY = snoise(vec3(fluidCoord * 1.5 + 10.0, t * 0.6));
  vec2 warpedCoord = fluidCoord + vec2(warpX, warpY) * 0.08;

  // Second pass: sample FBM on the warped coordinates for organic flow
  float n1 = fbm(vec3(warpedCoord * 2.0, t));
  float n2 = fbm(vec3(warpedCoord * 2.0 + 5.0, t * 1.3));

  // Color palette
  vec3 base = vec3(0.04, 0.04, 0.06);
  vec3 purple = vec3(0.698, 0.294, 0.937);
  vec3 cyan = vec3(0.196, 0.631, 0.886);

  vec3 fluid = base;
  fluid += purple * smoothstep(-0.1, 0.6, n1) * 0.12;
  fluid += cyan * smoothstep(-0.1, 0.6, n2) * 0.10;

  // Third pass: highlights warped further by previous noise for swirling detail
  float highlight = fbm(vec3(warpedCoord * 3.0 + n1 * 0.5, t * 0.7));
  fluid += vec3(0.5, 0.3, 0.7) * smoothstep(0.3, 0.8, highlight) * 0.06;

  // --- Layer 2: Vignette ---
  vec2 vignetteCenter = vec2(0.5, 0.45);
  float vignette = distance(uv, vignetteCenter);
  vignette = smoothstep(0.2, 0.9, vignette);
  fluid *= 1.0 - vignette * 0.6;

  // --- Layer 3: Glitter / particles at multiple depths ---
  // 4 layers from far (small parallax) to near (large parallax).
  // All use high-frequency noise + high exponent for sharp pinpoint specks.
  const int PARTICLE_LAYERS = 4;
  float layerParallax[4] = float[](0.0015, 0.003, 0.0055, 0.0085);
  float layerScale[4] = float[](85.0, 80.0, 75.0, 70.0);
  float layerSpeed[4] = float[](0.35, 0.28, 0.22, 0.15);
  float layerBright[4] = float[](1.0, 1.2, 1.4, 1.8);
  float layerExponent[4] = float[](24.0, 14.0, 14.0, 12.0);
  vec3 layerTint[4] = vec3[](
    vec3(0.8, 0.8, 0.9),
    vec3(0.9, 0.8, 1.0),
    vec3(0.7, 0.85, 1.0),
    vec3(1.0, 0.9, 0.95)
  );
  // Fly-through: two overlapping cycles offset by half a period, crossfaded
  float layerFlyRate[4] = float[](0.012, 0.018, 0.025, 0.033);
  float flyMaxZoom = 0.3;
  vec2 noiseCenter = vec2(0.5 * aspect, 0.5);

  for (int i = 0; i < PARTICLE_LAYERS; i++) {
    vec2 pUV = uv + uMouse * layerParallax[i];
    vec2 pCoord = vec2(pUV.x * aspect, pUV.y);

    for (int p = 0; p < 2; p++) {
      float phase = fract(uTime * layerFlyRate[i] + float(p) * 0.5);
      float expand = 1.0 + phase * flyMaxZoom;
      float fade = smoothstep(0.0, 0.15, phase) * smoothstep(1.0, 0.85, phase);

      vec2 flyCoord = noiseCenter + (pCoord - noiseCenter) / expand;

      float sNoise = snoise(vec3(flyCoord * layerScale[i], uTime * layerSpeed[i] + float(i) * 7.0 + float(p) * 100.0));
      float sp = pow(max(sNoise, 0.0), layerExponent[i]);

      float mask = smoothstep(0.0, 0.6, snoise(vec3(flyCoord * 4.0 + float(i) * 3.0, uTime * 0.05)));
      sp *= mask * fade;

      fluid += layerTint[i] * sp * layerBright[i];
    }
  }

  fragColor = vec4(fluid, 1.0);
}
`

// Pass 2: composite — samples the scene texture with noise-distorted UVs
const COMPOSITE_FRAGMENT = `#version 300 es
precision highp float;

in vec2 vUV;
out vec4 fragColor;

uniform sampler2D uScene;
uniform float uTime;
uniform vec2 uResolution;

// Simplex noise (same as scene shader, needed for UV distortion)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec2 uv = vUV;
  float aspect = uResolution.x / uResolution.y;
  vec2 coord = vec2(uv.x * aspect, uv.y);

  // Layered distortion at different scales and speeds
  float t = uTime * 0.06;

  // Large slow undulation — broad warping like heat haze
  float d1x = snoise(vec3(coord * 1.2, t * 0.5));
  float d1y = snoise(vec3(coord * 1.2 + 5.0, t * 0.4));

  // Medium ripple — gives a liquid lens feel
  float d2x = snoise(vec3(coord * 3.5, t * 0.9 + 20.0));
  float d2y = snoise(vec3(coord * 3.5 + 8.0, t * 0.8 + 20.0));

  // Fine caustic-like shimmer
  float d3x = snoise(vec3(coord * 8.0, t * 1.4 + 40.0));
  float d3y = snoise(vec3(coord * 8.0 + 12.0, t * 1.2 + 40.0));

  // Combine: large amplitude for slow, small for fast
  vec2 distortion = vec2(
    d1x * 0.012 + d2x * 0.005 + d3x * 0.002,
    d1y * 0.012 + d2y * 0.005 + d3y * 0.002
  );

  vec2 distortedUV = uv + distortion;

  // Clamp to avoid sampling outside texture
  distortedUV = clamp(distortedUV, 0.0, 1.0);

  fragColor = texture(uScene, distortedUV);
}
`

// --- WebGL helpers ---

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Failed to create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${info}`)
  }
  return shader
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertSource: string,
  fragSource: string,
): WebGLProgram {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSource)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSource)
  const program = gl.createProgram()
  if (!program) throw new Error('Failed to create program')
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${info}`)
  }
  gl.detachShader(program, vert)
  gl.detachShader(program, frag)
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  return program
}

function createFBO(gl: WebGL2RenderingContext, width: number, height: number) {
  const fbo = gl.createFramebuffer()
  const texture = gl.createTexture()
  if (!fbo || !texture) return null

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA8,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  )
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.bindTexture(gl.TEXTURE_2D, null)

  return { fbo, texture, width, height }
}

// --- Component ---

interface GLState {
  gl: WebGL2RenderingContext
  sceneProgram: WebGLProgram
  compositeProgram: WebGLProgram
  vao: WebGLVertexArrayObject
  buffer: WebGLBuffer
  fbo: WebGLFramebuffer
  fboTexture: WebGLTexture
  fboWidth: number
  fboHeight: number
  sceneUniforms: {
    uTime: WebGLUniformLocation | null
    uResolution: WebGLUniformLocation | null
    uMouse: WebGLUniformLocation | null
  }
  compositeUniforms: {
    uScene: WebGLUniformLocation | null
    uTime: WebGLUniformLocation | null
    uResolution: WebGLUniformLocation | null
  }
}

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glStateRef = useRef<GLState | null>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const startTimeRef = useRef(0)
  const needsResizeRef = useRef(false)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Attempt WebGL2 context
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'default',
    })
    if (!gl) {
      setUseFallback(true)
      return
    }

    // Build programs
    let sceneProgram: WebGLProgram
    let compositeProgram: WebGLProgram
    try {
      sceneProgram = createProgram(gl, VERTEX_SOURCE, SCENE_FRAGMENT)
      compositeProgram = createProgram(gl, VERTEX_SOURCE, COMPOSITE_FRAGMENT)
    } catch (e) {
      console.error('HeroShader:', e)
      setUseFallback(true)
      return
    }

    // Shared fullscreen quad geometry
    const vao = gl.createVertexArray()
    const buffer = gl.createBuffer()
    if (!vao || !buffer) {
      setUseFallback(true)
      return
    }
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // Bind aPosition for both programs (same layout)
    const posLoc = gl.getAttribLocation(sceneProgram, 'aPosition')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)

    const sceneUniforms = {
      uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
      uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
      uMouse: gl.getUniformLocation(sceneProgram, 'uMouse'),
    }
    const compositeUniforms = {
      uScene: gl.getUniformLocation(compositeProgram, 'uScene'),
      uTime: gl.getUniformLocation(compositeProgram, 'uTime'),
      uResolution: gl.getUniformLocation(compositeProgram, 'uResolution'),
    }

    // --- Sizing ---
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function getPixelSize() {
      if (!canvas) return { w: 1, h: 1 }
      return {
        w: Math.floor(canvas.clientWidth * dpr),
        h: Math.floor(canvas.clientHeight * dpr),
      }
    }

    // Initial FBO
    const { w: initW, h: initH } = getPixelSize()
    canvas.width = initW
    canvas.height = initH
    const fboState = createFBO(gl, initW, initH)
    if (!fboState) {
      setUseFallback(true)
      return
    }

    glStateRef.current = {
      gl,
      sceneProgram,
      compositeProgram,
      vao,
      buffer,
      fbo: fboState.fbo,
      fboTexture: fboState.texture,
      fboWidth: fboState.width,
      fboHeight: fboState.height,
      sceneUniforms,
      compositeUniforms,
    }

    function resize() {
      needsResizeRef.current = true
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // --- Visibility ---
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    // --- Reduced motion ---
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // --- Mouse ---
    function onMouseMove(e: MouseEvent) {
      mouseTargetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTargetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0]
      if (!touch) return
      mouseTargetRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1
      mouseTargetRef.current.y = -((touch.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)

    // --- Context lost/restored ---
    function onContextLost(e: Event) {
      e.preventDefault()
      cancelAnimationFrame(rafRef.current)
      setUseFallback(true)
    }
    function onContextRestored() {
      setUseFallback(false)
    }
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    // --- Render loop ---
    startTimeRef.current = performance.now()

    function render() {
      const state = glStateRef.current
      if (!state) return

      if (visibleRef.current) {
        const { gl, sceneProgram, compositeProgram, vao } = state

        // Handle resize: rebuild FBO at new size
        if (needsResizeRef.current && canvas) {
          needsResizeRef.current = false
          const { w, h } = getPixelSize()
          if (w !== state.fboWidth || h !== state.fboHeight) {
            canvas.width = w
            canvas.height = h
            // Delete old FBO resources
            gl.deleteFramebuffer(state.fbo)
            gl.deleteTexture(state.fboTexture)
            const newFbo = createFBO(gl, w, h)
            if (newFbo) {
              state.fbo = newFbo.fbo
              state.fboTexture = newFbo.texture
              state.fboWidth = newFbo.width
              state.fboHeight = newFbo.height
            }
          }
        }

        // Lerp mouse
        mouseRef.current.x +=
          (mouseTargetRef.current.x - mouseRef.current.x) * 0.05
        mouseRef.current.y +=
          (mouseTargetRef.current.y - mouseRef.current.y) * 0.05

        const time = (performance.now() - startTimeRef.current) / 1000
        const width = gl.drawingBufferWidth
        const height = gl.drawingBufferHeight

        gl.bindVertexArray(vao)

        // --- Pass 1: render scene to FBO ---
        gl.bindFramebuffer(gl.FRAMEBUFFER, state.fbo)
        gl.viewport(0, 0, width, height)
        // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is WebGL, not a React hook
        gl.useProgram(sceneProgram)
        gl.uniform1f(state.sceneUniforms.uTime, time)
        gl.uniform2f(state.sceneUniforms.uResolution, width, height)
        gl.uniform2f(
          state.sceneUniforms.uMouse,
          mouseRef.current.x,
          mouseRef.current.y,
        )
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        // --- Pass 2: composite to screen with distortion ---
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, width, height)
        // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is WebGL, not a React hook
        gl.useProgram(compositeProgram)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, state.fboTexture)
        gl.uniform1i(state.compositeUniforms.uScene, 0)
        gl.uniform1f(state.compositeUniforms.uTime, time)
        gl.uniform2f(state.compositeUniforms.uResolution, width, height)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(render)
      }
    }

    rafRef.current = requestAnimationFrame(render)

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      if (fboState) {
        gl.deleteFramebuffer(fboState.fbo)
        gl.deleteTexture(fboState.texture)
      }
      gl.deleteBuffer(buffer)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(sceneProgram)
      gl.deleteProgram(compositeProgram)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      glStateRef.current = null
    }
  }, [])

  if (useFallback) {
    return <div className={styles.fallback} />
  }

  return <canvas ref={canvasRef} className={styles.canvas} />
}
