// GLSL sources for the hero background.
//
// Pipeline:
//   0. NOISE_BAKE_FRAGMENT  -> tileable 64^3 RGBA8 noise volume (once)
//   1. NEBULA_FRAGMENT      -> half-res nebula, sqrt-encoded linear light
//   2. COMPOSITE_FRAGMENT   -> nebula + hash-grid stars, tone map, dither

export const VERTEX_SOURCE = `#version 300 es
layout(location = 0) in vec2 aPosition;
out vec2 vUV;
void main() {
  vUV = (aPosition + 1.0) * 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const COMMON_GLSL = `
uvec3 pcg3d(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}

uvec4 pcg4d(uvec4 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  v ^= v >> 16u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}
`

// Pass 0: bake periodic gradient noise into one z-slice of a 3D texture.
// Every channel tiles over the unit cube so the volume can be sampled with
// REPEAT wrapping and never shows a seam.
//   R, G: two independent 1-octave fields (used as a 2D warp vector)
//   B:    3-octave FBM, 0..1
//   A:    3-octave ridged FBM, 0..1 (filaments)
export const NOISE_BAKE_FRAGMENT = `#version 300 es
precision highp float;

in vec2 vUV;
out vec4 fragColor;

uniform float uSlice;

${COMMON_GLSL}

vec3 gradAt(vec3 cell, float period, uint seed) {
  vec3 wrapped = mod(cell, period);
  uvec3 h = pcg3d(uvec3(ivec3(wrapped)) + seed * 7919u);
  return normalize(vec3(h) * (2.0 / 4294967295.0) - 1.0);
}

float pnoise(vec3 p, float period, uint seed) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float n000 = dot(gradAt(i + vec3(0, 0, 0), period, seed), f - vec3(0, 0, 0));
  float n100 = dot(gradAt(i + vec3(1, 0, 0), period, seed), f - vec3(1, 0, 0));
  float n010 = dot(gradAt(i + vec3(0, 1, 0), period, seed), f - vec3(0, 1, 0));
  float n110 = dot(gradAt(i + vec3(1, 1, 0), period, seed), f - vec3(1, 1, 0));
  float n001 = dot(gradAt(i + vec3(0, 0, 1), period, seed), f - vec3(0, 0, 1));
  float n101 = dot(gradAt(i + vec3(1, 0, 1), period, seed), f - vec3(1, 0, 1));
  float n011 = dot(gradAt(i + vec3(0, 1, 1), period, seed), f - vec3(0, 1, 1));
  float n111 = dot(gradAt(i + vec3(1, 1, 1), period, seed), f - vec3(1, 1, 1));
  float n = mix(
    mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
    mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
    u.z
  );
  // Gradient noise lives in roughly [-0.7, 0.7]; stretch to [-1, 1].
  return clamp(n * 1.45, -1.0, 1.0);
}

void main() {
  vec3 p = vec3(vUV, uSlice);

  float r = pnoise(p * 4.0, 4.0, 11u) * 0.5 + 0.5;
  float g = pnoise(p * 4.0, 4.0, 23u) * 0.5 + 0.5;

  float fbm = 0.0;
  float ridged = 0.0;
  float amp = 0.5;
  float freq = 4.0;
  for (int o = 0; o < 3; o++) {
    float n = pnoise(p * freq, freq, 37u + uint(o) * 5u);
    fbm += amp * n;
    float rd = 1.0 - abs(pnoise(p * freq, freq, 53u + uint(o) * 5u));
    ridged += amp * rd * rd;
    amp *= 0.5;
    freq *= 2.0;
  }
  float b = clamp(fbm / 0.875 * 0.5 + 0.5, 0.0, 1.0);
  float a = clamp(ridged / 0.875, 0.0, 1.0);

  fragColor = vec4(r, g, b, a);
}
`

// Pass 1: nebula at half resolution. Output is sqrt-encoded linear light so an
// RGBA8 target keeps enough precision in the darks.
export const NEBULA_FRAGMENT = `#version 300 es
precision highp float;
precision highp sampler3D;

in vec2 vUV;
out vec4 fragColor;

uniform sampler3D uNoise;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uFlySpeed;

${COMMON_GLSL}

vec4 N(vec3 p) { return texture(uNoise, p); }

vec3 rampMagenta(float e) {
  const vec3 c0 = vec3(0.003, 0.003, 0.006);
  const vec3 c1 = vec3(0.035, 0.010, 0.120);
  const vec3 c2 = vec3(0.267, 0.042, 0.518);
  const vec3 c3 = vec3(0.900, 0.250, 0.500);
  const vec3 c4 = vec3(1.000, 0.780, 0.580);
  vec3 c = mix(c0, c1, smoothstep(0.00, 0.25, e));
  c = mix(c, c2, smoothstep(0.25, 0.55, e));
  c = mix(c, c3, smoothstep(0.55, 0.80, e));
  return mix(c, c4, smoothstep(0.80, 1.00, e));
}

vec3 rampTeal(float e) {
  const vec3 c0 = vec3(0.003, 0.003, 0.006);
  const vec3 c1 = vec3(0.008, 0.030, 0.070);
  const vec3 c2 = vec3(0.030, 0.300, 0.420);
  const vec3 c3 = vec3(0.150, 0.750, 0.850);
  const vec3 c4 = vec3(0.800, 0.980, 1.000);
  vec3 c = mix(c0, c1, smoothstep(0.00, 0.25, e));
  c = mix(c, c2, smoothstep(0.25, 0.55, e));
  c = mix(c, c3, smoothstep(0.55, 0.80, e));
  return mix(c, c4, smoothstep(0.80, 1.00, e));
}

const int NEB_LAYERS = 4;
const float NZ_FAR = 1.6;
const float NZ_NEAR = 0.45;

void main() {
  // 4% overscan so the composite pass has slack at the edges.
  vec2 uv = (vUV - 0.5) * 1.04 + 0.5;
  float aspect = uResolution.x / uResolution.y;
  vec2 s = (uv - 0.5) * vec2(aspect, 1.0);
  float t = uTime;

  // Distant, dim backdrop that does not move.
  float far = N(vec3(rot(0.75) * (s * 1.4 + 0.5) * 0.30, 9.9 + t * 0.0018)).b;
  vec3 col = vec3(0.02, 0.03, 0.10) * smoothstep(0.30, 0.90, far) * 0.5;

  // Depth slices, far to near. Each slice is sampled in world space at its
  // depth, so near slices project larger and expand faster as the camera
  // advances. A slice is re-seeded when it wraps back to the far plane.
  for (int i = 0; i < NEB_LAYERS; i++) {
    float fi = float(i);
    float cycle = t * uFlySpeed + fi / float(NEB_LAYERS) + 0.37;
    float phase = fract(cycle);
    float z = mix(NZ_FAR, NZ_NEAR, phase);
    float zo = fi * 13.7 + floor(cycle) * 29.1;
    vec2 q = s * z + uMouse * 0.06 + vec2(fi * 3.1, fi * 1.7);

    vec4 w = N(vec3(q * 0.28, zo + t * 0.0030));
    vec2 warp = (w.rg - 0.5) * 0.6;
    vec2 qw = q + warp;
    float dens = N(vec3(rot(0.40 + fi) * qw * 0.45, zo + 7.3 + t * 0.0040)).b;
    float ridge = N(vec3(rot(1.10 + fi) * qw * 1.00, zo + 2.1 + t * 0.0060)).a;
    float dust = N(vec3(rot(2.00 + fi) * (q + warp * 0.5) * 0.80, zo + 4.6 + t * 0.0025)).b;

    float body = smoothstep(0.48, 0.88, dens);
    float fil = pow(ridge, 4.0) * smoothstep(0.42, 0.74, dens);
    float e = clamp(body * 0.60 + fil * 0.70, 0.0, 1.0);

    float lane = smoothstep(0.58, 0.82, dust);
    e *= 1.0 - 0.85 * lane;

    float hue = smoothstep(0.35, 0.65, w.b);
    vec3 em = mix(rampMagenta(e), rampTeal(e), hue) * 0.7;
    em = mix(em, vec3(0.006, 0.003, 0.002), lane * body * 0.6);

    float fade = smoothstep(0.0, 0.2, phase) * smoothstep(1.0, 0.8, phase);
    // Dust in this slice absorbs light from the slices behind it.
    float absorb = lane * body * 0.5 * fade;
    col = col * (1.0 - absorb) + em * fade * 0.5;
  }

  float vig = smoothstep(0.35, 1.05, length((uv - 0.5) * vec2(1.0, 1.3)));
  col *= 1.0 - 0.7 * vig;

  fragColor = vec4(sqrt(clamp(col, 0.0, 1.0)), 1.0);
}
`

// Pass 2: composite. Decodes the nebula, adds four hash-grid star layers,
// darkens the region under the hero text, tone maps, converts to sRGB and
// dithers.
export const COMPOSITE_FRAGMENT = `#version 300 es
precision highp float;

in vec2 vUV;
out vec4 fragColor;

uniform sampler2D uNebula;
uniform float uTime;
uniform float uFrame;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uPixelScale; // device pixels per CSS pixel
uniform float uExposure;
uniform float uFlySpeed; // layer cycles per second; 0 = static field

${COMMON_GLSL}

vec3 starTemp(float k) {
  const vec3 blue = vec3(0.62, 0.74, 1.00);
  const vec3 white = vec3(1.00, 0.97, 0.93);
  const vec3 warm = vec3(1.00, 0.72, 0.46);
  return k < 0.5 ? mix(blue, white, k * 2.0) : mix(white, warm, (k - 0.5) * 2.0);
}

float twinkle(float t, float ph, float rate, float amt) {
  float s = sin(t * rate + ph) * sin(t * rate * 0.613 + ph * 2.7);
  return 1.0 - amt * (0.5 + 0.5 * s);
}

// Perspective star field. Each layer is a plane of stars at world depth z;
// the camera moves forward, so z shrinks over time, stars project outward
// from the screen centre and grow as they approach. When a layer wraps back
// to the far plane it is re-seeded, so the pattern never repeats.
const int STAR_LAYERS = 7;
const float Z_NEAR = 0.12;
const float Z_FAR = 1.0;
const float CELL_WORLD = 44.0; // CSS px per cell at z = 1

vec3 starLayer(int i, vec2 css, vec2 center, float t, float px) {
  float fi = float(i);
  float cycle = t * uFlySpeed + fi / float(STAR_LAYERS);
  float phase = fract(cycle);
  uint seed = uint(i) * 131u + uint(floor(cycle)) * 7u;
  float z = mix(Z_FAR, Z_NEAR, phase);

  // Lateral camera offset from the mouse: near stars shift more.
  vec2 world = (css - center) * z + uMouse * 40.0;
  vec2 p = rot(fi * 0.7) * world / CELL_WORLD;
  vec2 cid = floor(p);
  vec2 f = p - cid;

  uvec4 h = pcg4d(uvec4(uvec2(ivec2(cid) + 0x8000), seed, 0u));
  vec4 r = vec4(h) * (1.0 / 4294967295.0);
  if (r.w > 0.38) return vec3(0.0);

  float temp = float(h.x >> 16u) * (1.0 / 65535.0);
  float ph = float(h.x & 0xffffu) * (1.0 / 65535.0) * 6.2831;
  vec2 pos = 0.5 + (r.xy - 0.5) * 0.6;
  float cellPx = CELL_WORLD / z * px; // device px per cell on screen
  vec2 rel = (f - pos) * cellPx;
  float d = length(rel);

  float mag = pow(r.z, 3.0);
  bool bright = r.z > 0.985;

  // Apparent size grows as the star approaches.
  float grow = pow(1.0 / z, 0.6) * 0.5;
  float sigma = max(0.55, (0.35 + 0.7 * mag) * px * grow);
  float core = exp(-d * d / (2.0 * sigma * sigma));
  float tail = 0.03 * mag * exp(-d / (3.0 * sigma));

  float rmax = min(min(pos.x, 1.0 - pos.x), min(pos.y, 1.0 - pos.y));
  float win = smoothstep(rmax, rmax * 0.6, length(f - pos));

  // Fade in at the far plane, out before the wrap at the near plane.
  float fade = smoothstep(0.0, 0.25, phase) * smoothstep(1.0, 0.82, phase);
  float tw = twinkle(t, ph, 1.2 + 2.5 * r.y, 0.15 + 0.3 * r.x);
  float I = (0.03 + 1.4 * mag) * tw * fade;
  vec3 tint = starTemp(pow(temp, 1.3));
  vec3 c = tint * (core + tail);

  if (bright) {
    float hr = (4.0 + 10.0 * mag) * px * grow;
    float halo = 0.10 / (1.0 + (d * d) / (hr * hr));
    halo *= halo;
    float spk = exp(-abs(rel.x) * 0.20 / px) * exp(-abs(rel.y) * 1.2 / px)
              + exp(-abs(rel.y) * 0.20 / px) * exp(-abs(rel.x) * 1.2 / px);
    spk *= exp(-d * 0.05 / px) * 0.25;
    c += tint * (halo * 4.0 + spk);
    I *= 2.5;
  }
  return c * I * win;
}

// Interleaved gradient noise, jittered per frame.
float ign(vec2 p, float frame) {
  p += frame * 5.588238;
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

void main() {
  float px = uPixelScale;
  vec2 css = gl_FragCoord.xy / px;
  float aspect = uResolution.x / uResolution.y;

  vec2 nuv = (vUV - 0.5) / 1.04 + 0.5;
  vec3 neb = texture(uNebula, nuv).rgb;
  neb *= neb;

  // Legibility ellipse under the hero content.
  vec2 lq = (vUV - 0.5) * vec2(aspect, 1.0) / vec2(0.55, 0.30);
  float leg = 1.0 - 0.55 * smoothstep(1.0, 0.0, dot(lq, lq));

  vec2 center = uResolution * 0.5 / px;
  vec3 stars = vec3(0.0);
  for (int i = 0; i < STAR_LAYERS; i++) {
    stars += starLayer(i, css, center, uTime, px);
  }
  stars *= mix(leg, 1.0, 0.6);

  vec3 col = neb * leg + stars;
  col = 1.0 - exp(-col * uExposure);
  col = pow(col, vec3(1.0 / 2.2));
  col += (ign(gl_FragCoord.xy, uFrame) - 0.5) / 255.0;
  fragColor = vec4(col, 1.0);
}
`
