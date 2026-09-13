'use client'

import { useEffect, useRef, useState } from 'react'
import * as styles from './hero-shader.css'
import {
  COMPOSITE_FRAGMENT,
  NEBULA_FRAGMENT,
  NOISE_BAKE_FRAGMENT,
  VERTEX_SOURCE,
} from './hero-shader.glsl'

const NOISE_SIZE = 64
const NEBULA_SCALE = 0.5
const EXPOSURE = 1.6
const FLY_SPEED = 0.04
const IS_DEV = process.env.NODE_ENV !== 'production'

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

function activateProgram(gl: WebGL2RenderingContext, program: WebGLProgram) {
  // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is WebGL, not a React hook
  gl.useProgram(program)
}

function getUniforms<const T extends readonly string[]>(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: T,
): Record<T[number], WebGLUniformLocation | null> {
  const out = {} as Record<T[number], WebGLUniformLocation | null>
  for (const name of names) {
    out[name as T[number]] = gl.getUniformLocation(program, name)
  }
  return out
}

interface FBO {
  fbo: WebGLFramebuffer
  texture: WebGLTexture
  width: number
  height: number
}

function createFBO(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
): FBO {
  const fbo = gl.createFramebuffer()
  const texture = gl.createTexture()
  if (!fbo || !texture) throw new Error('Failed to create framebuffer')

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, width, height)
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

function deleteFBO(gl: WebGL2RenderingContext, fbo: FBO) {
  gl.deleteFramebuffer(fbo.fbo)
  gl.deleteTexture(fbo.texture)
}

// Renders the tileable noise volume slice by slice. Runs once per context.
function bakeNoiseVolume(
  gl: WebGL2RenderingContext,
  vao: WebGLVertexArrayObject,
): WebGLTexture {
  const texture = gl.createTexture()
  if (!texture) throw new Error('Failed to create noise texture')
  gl.bindTexture(gl.TEXTURE_3D, texture)
  gl.texStorage3D(
    gl.TEXTURE_3D,
    1,
    gl.RGBA8,
    NOISE_SIZE,
    NOISE_SIZE,
    NOISE_SIZE,
  )
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT)

  const program = createProgram(gl, VERTEX_SOURCE, NOISE_BAKE_FRAGMENT)
  const uSlice = gl.getUniformLocation(program, 'uSlice')
  const fbo = gl.createFramebuffer()
  if (!fbo) throw new Error('Failed to create bake framebuffer')

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.viewport(0, 0, NOISE_SIZE, NOISE_SIZE)
  activateProgram(gl, program)
  gl.bindVertexArray(vao)
  for (let z = 0; z < NOISE_SIZE; z++) {
    gl.framebufferTextureLayer(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      texture,
      0,
      z,
    )
    gl.uniform1f(uSlice, (z + 0.5) / NOISE_SIZE)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.bindTexture(gl.TEXTURE_3D, null)
  gl.deleteFramebuffer(fbo)
  gl.deleteProgram(program)
  return texture
}

// --- Runtime ---

interface DebugInfo {
  frames: number
  running: boolean
  renderScale: number
  lowPower: boolean
  gpuMs: number
}

declare global {
  interface Window {
    __heroShader?: DebugInfo
  }
}

interface RuntimeCallbacks {
  onFallback: () => void
  onRestore: () => void
}

interface GLResources {
  gl: WebGL2RenderingContext
  vao: WebGLVertexArrayObject
  buffer: WebGLBuffer
  noise: WebGLTexture
  nebulaProgram: WebGLProgram
  compositeProgram: WebGLProgram
  nebulaUniforms: Record<
    'uNoise' | 'uTime' | 'uResolution' | 'uMouse' | 'uFlySpeed',
    WebGLUniformLocation | null
  >
  compositeUniforms: Record<
    | 'uNebula'
    | 'uTime'
    | 'uFrame'
    | 'uResolution'
    | 'uMouse'
    | 'uPixelScale'
    | 'uExposure'
    | 'uFlySpeed',
    WebGLUniformLocation | null
  >
  nebulaFBO: FBO | null
  timer: GpuTimer | null
}

// Optional GPU timing (dev only) via EXT_disjoint_timer_query_webgl2.
interface GpuTimer {
  ext: {
    TIME_ELAPSED_EXT: number
    GPU_DISJOINT_EXT: number
  }
  query: WebGLQuery | null
  average: number
}

function createGpuTimer(gl: WebGL2RenderingContext): GpuTimer | null {
  const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2')
  if (!ext) return null
  return { ext, query: null, average: 0 }
}

function detectLowPower(): boolean {
  if (IS_DEV && new URLSearchParams(location.search).has('lowpower')) {
    return true
  }
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)')
  return coarse.matches || (navigator.hardwareConcurrency ?? 8) <= 4
}

// Dev-only override: ?fly=0 for a static field, ?fly=0.1 for a faster run.
function devFlySpeed(): number {
  if (!IS_DEV) return FLY_SPEED
  const v = new URLSearchParams(location.search).get('fly')
  return v === null || Number.isNaN(Number(v)) ? FLY_SPEED : Number(v)
}

function startHeroShader(
  canvas: HTMLCanvasElement,
  callbacks: RuntimeCallbacks,
): () => void {
  const lowPower = detectLowPower()
  const dprCap = lowPower ? 1.5 : 2
  const targetFrameMs = 1000 / (lowPower ? 30 : 60)
  const nebulaEvery = lowPower ? 3 : 2
  const flySpeed = devFlySpeed()

  let res: GLResources | null = null
  let disposed = false
  let rafId = 0
  let renderScale = lowPower ? 0.85 : 1
  let dpr = Math.min(window.devicePixelRatio || 1, dprCap)
  let needsResize = true
  let intersecting = true
  let prefersReducedMotion = false
  let time = 0
  let frame = 0
  let lastRaf = 0
  let lastDraw = -Infinity
  let nebulaDirty = true

  // Adaptive scale bookkeeping
  const warmupMs = 2000
  let startedAt = 0
  let intervalSum = 0
  let intervalCount = 0
  let scaleSteps = 0

  const mouse = { x: 0, y: 0 }
  const mouseTarget = { x: 0, y: 0 }

  const debug: DebugInfo | null = IS_DEV
    ? { frames: 0, running: false, renderScale, lowPower, gpuMs: 0 }
    : null
  if (debug) window.__heroShader = debug

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) {
    callbacks.onFallback()
    return () => {}
  }

  function fail(err: unknown) {
    console.error('HeroShader:', err)
    teardownGL()
    callbacks.onFallback()
  }

  function initGL(): boolean {
    if (!gl) return false
    try {
      const vao = gl.createVertexArray()
      const buffer = gl.createBuffer()
      if (!vao || !buffer) throw new Error('Failed to create geometry')
      gl.bindVertexArray(vao)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      )
      // All programs share the same single-attribute layout at location 0.
      gl.enableVertexAttribArray(0)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.bindVertexArray(null)

      const nebulaProgram = createProgram(gl, VERTEX_SOURCE, NEBULA_FRAGMENT)
      const compositeProgram = createProgram(
        gl,
        VERTEX_SOURCE,
        COMPOSITE_FRAGMENT,
      )
      const noise = bakeNoiseVolume(gl, vao)

      res = {
        gl,
        vao,
        buffer,
        noise,
        nebulaProgram,
        compositeProgram,
        nebulaUniforms: getUniforms(gl, nebulaProgram, [
          'uNoise',
          'uTime',
          'uResolution',
          'uMouse',
          'uFlySpeed',
        ] as const),
        compositeUniforms: getUniforms(gl, compositeProgram, [
          'uNebula',
          'uTime',
          'uFrame',
          'uResolution',
          'uMouse',
          'uPixelScale',
          'uExposure',
          'uFlySpeed',
        ] as const),
        nebulaFBO: null,
        timer: debug ? createGpuTimer(gl) : null,
      }
      needsResize = true
      nebulaDirty = true
      return true
    } catch (err) {
      fail(err)
      return false
    }
  }

  function teardownGL() {
    if (!res) return
    const { gl } = res
    if (res.nebulaFBO) deleteFBO(gl, res.nebulaFBO)
    if (res.timer?.query) gl.deleteQuery(res.timer.query)
    gl.deleteTexture(res.noise)
    gl.deleteBuffer(res.buffer)
    gl.deleteVertexArray(res.vao)
    gl.deleteProgram(res.nebulaProgram)
    gl.deleteProgram(res.compositeProgram)
    res = null
  }

  // --- Sizing ---

  function applySize() {
    if (!res) return
    const { gl } = res
    const scale = dpr * renderScale
    const w = Math.max(1, Math.floor(canvas.clientWidth * scale))
    const h = Math.max(1, Math.floor(canvas.clientHeight * scale))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    const nw = Math.max(1, Math.ceil(w * NEBULA_SCALE))
    const nh = Math.max(1, Math.ceil(h * NEBULA_SCALE))
    if (
      !res.nebulaFBO ||
      res.nebulaFBO.width !== nw ||
      res.nebulaFBO.height !== nh
    ) {
      if (res.nebulaFBO) deleteFBO(gl, res.nebulaFBO)
      res.nebulaFBO = createFBO(gl, nw, nh)
    }
    nebulaDirty = true
  }

  // --- Drawing ---

  function drawFrame() {
    if (!res) return
    const { gl, vao, nebulaUniforms, compositeUniforms, timer } = res

    if (needsResize) {
      needsResize = false
      applySize()
    }
    const nebula = res.nebulaFBO
    if (!nebula) return

    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight
    const pixelScale = dpr * renderScale

    let timing = false
    if (timer && !timer.query) {
      timer.query = gl.createQuery()
      if (timer.query) {
        gl.beginQuery(timer.ext.TIME_ELAPSED_EXT, timer.query)
        timing = true
      }
    }

    gl.bindVertexArray(vao)

    if (nebulaDirty || frame % nebulaEvery === 0) {
      nebulaDirty = false
      gl.bindFramebuffer(gl.FRAMEBUFFER, nebula.fbo)
      gl.viewport(0, 0, nebula.width, nebula.height)
      activateProgram(gl, res.nebulaProgram)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_3D, res.noise)
      gl.uniform1i(nebulaUniforms.uNoise, 0)
      gl.uniform1f(nebulaUniforms.uTime, time)
      gl.uniform2f(nebulaUniforms.uResolution, nebula.width, nebula.height)
      gl.uniform2f(nebulaUniforms.uMouse, mouse.x, mouse.y)
      gl.uniform1f(nebulaUniforms.uFlySpeed, flySpeed)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, width, height)
    activateProgram(gl, res.compositeProgram)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, nebula.texture)
    gl.uniform1i(compositeUniforms.uNebula, 1)
    gl.uniform1f(compositeUniforms.uTime, time)
    gl.uniform1f(compositeUniforms.uFrame, frame % 64)
    gl.uniform2f(compositeUniforms.uResolution, width, height)
    gl.uniform2f(compositeUniforms.uMouse, mouse.x, mouse.y)
    gl.uniform1f(compositeUniforms.uPixelScale, pixelScale)
    gl.uniform1f(compositeUniforms.uExposure, EXPOSURE)
    gl.uniform1f(compositeUniforms.uFlySpeed, flySpeed)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    if (timer && timing) {
      gl.endQuery(timer.ext.TIME_ELAPSED_EXT)
    }
    frame++
    if (debug) debug.frames = frame
  }

  function pollGpuTimer() {
    if (!res?.timer?.query || !debug) return
    const { gl, timer } = res
    const query = timer.query as WebGLQuery
    const available = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE)
    const disjoint = gl.getParameter(timer.ext.GPU_DISJOINT_EXT)
    if (available && !disjoint) {
      const ns = gl.getQueryParameter(query, gl.QUERY_RESULT) as number
      const ms = ns / 1e6
      timer.average = timer.average === 0 ? ms : timer.average * 0.9 + ms * 0.1
      debug.gpuMs = timer.average
    }
    if (available || disjoint) {
      gl.deleteQuery(query)
      timer.query = null
    }
  }

  function renderOnce() {
    if (!res) return
    time = 0
    drawFrame()
  }

  // --- Loop ---

  function shouldRun() {
    return (
      res !== null &&
      !disposed &&
      intersecting &&
      !document.hidden &&
      !prefersReducedMotion
    )
  }

  function syncLoop() {
    const run = shouldRun()
    if (debug) debug.running = run
    if (run && !rafId) {
      lastRaf = 0
      startedAt = performance.now()
      intervalSum = 0
      intervalCount = 0
      rafId = requestAnimationFrame(tick)
    } else if (!run && rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  function tick(now: number) {
    rafId = 0
    if (!shouldRun()) return
    rafId = requestAnimationFrame(tick)

    if (lastRaf !== 0) {
      const dt = Math.min((now - lastRaf) / 1000, 0.1)
      time += dt
      if (now - startedAt > warmupMs) {
        intervalSum += now - lastRaf
        intervalCount++
        if (intervalCount >= 60) {
          const mean = intervalSum / intervalCount
          intervalSum = 0
          intervalCount = 0
          if (
            mean > targetFrameMs * 1.6 &&
            scaleSteps < 3 &&
            renderScale > 0.5
          ) {
            renderScale = Math.max(0.5, renderScale - 0.15)
            scaleSteps++
            needsResize = true
            if (debug) debug.renderScale = renderScale
          }
        }
      }
    }
    lastRaf = now

    if (now - lastDraw < targetFrameMs - 2) return
    lastDraw = now

    mouse.x += (mouseTarget.x - mouse.x) * 0.05
    mouse.y += (mouseTarget.y - mouse.y) * 0.05

    pollGpuTimer()
    drawFrame()
  }

  // --- Environment listeners ---

  const reducedMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  )
  prefersReducedMotion = reducedMotionQuery.matches
  function onReducedMotionChange(e: MediaQueryListEvent) {
    prefersReducedMotion = e.matches
    syncLoop()
    if (prefersReducedMotion) renderOnce()
  }
  reducedMotionQuery.addEventListener('change', onReducedMotionChange)

  let dprQuery: MediaQueryList | null = null
  function watchDpr() {
    dprQuery?.removeEventListener('change', onDprChange)
    dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    dprQuery.addEventListener('change', onDprChange)
  }
  function onDprChange() {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap)
    needsResize = true
    watchDpr()
    if (!rafId) renderOnce()
  }
  watchDpr()

  const resizeObserver = new ResizeObserver(() => {
    needsResize = true
    if (!rafId) renderOnce()
  })
  resizeObserver.observe(canvas)

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      intersecting = entry.isIntersecting
      syncLoop()
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  function onVisibilityChange() {
    syncLoop()
  }
  document.addEventListener('visibilitychange', onVisibilityChange)

  function setMouseTarget(clientX: number, clientY: number) {
    mouseTarget.x = (clientX / window.innerWidth) * 2 - 1
    mouseTarget.y = -((clientY / window.innerHeight) * 2 - 1)
  }
  function onMouseMove(e: MouseEvent) {
    setMouseTarget(e.clientX, e.clientY)
  }
  function onTouchMove(e: TouchEvent) {
    const touch = e.touches[0]
    if (touch) setMouseTarget(touch.clientX, touch.clientY)
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })

  function onContextLost(e: Event) {
    e.preventDefault()
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
    // Resources are gone with the context; just drop our references.
    res = null
    callbacks.onFallback()
  }
  function onContextRestored() {
    if (disposed) return
    if (initGL()) {
      callbacks.onRestore()
      renderOnce()
      syncLoop()
    }
  }
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  // --- Start ---

  if (initGL()) {
    renderOnce()
    syncLoop()
  }

  return () => {
    disposed = true
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onTouchMove)
    canvas.removeEventListener('webglcontextlost', onContextLost)
    canvas.removeEventListener('webglcontextrestored', onContextRestored)
    reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    dprQuery?.removeEventListener('change', onDprChange)
    teardownGL()
    if (debug && window.__heroShader === debug) {
      window.__heroShader = undefined
    }
  }
}

// --- Component ---

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    return startHeroShader(canvas, {
      onFallback: () => setUseFallback(true),
      onRestore: () => setUseFallback(false),
    })
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      {useFallback && <div className={styles.fallback} />}
    </>
  )
}
