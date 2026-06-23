<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  // Minimal pass-through vertex shader. A single oversized triangle in clip
  // space (-1,-1)(3,-1)(-1,3) fully covers the viewport, so the fragment
  // shader runs for every pixel on screen.
  const VERT = `#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

  // Xbox "Waves" dynamic background — procedural fullscreen fragment shader.
  // Color is a pure function of screen position (gl_FragCoord) and time.
  const FRAG = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2  u_res;   // drawing-buffer size in pixels
uniform float u_time;  // seconds since load

vec3 greenMap(float b){
  b = clamp(b, 0.0, 1.0);
  vec3 c = vec3(0.006, 0.018, 0.004);
  c = mix(c, vec3(0.040, 0.140, 0.022), smoothstep(0.04, 0.34, b));
  c = mix(c, vec3(0.180, 0.380, 0.055), smoothstep(0.30, 0.62, b));
  c = mix(c, vec3(0.460, 0.620, 0.130), smoothstep(0.58, 0.85, b));
  c = mix(c, vec3(0.660, 0.800, 0.250), smoothstep(0.85, 1.00, b));
  return c;
}

void main(){
  vec2 p = (gl_FragCoord.xy * 2.0 - u_res) / u_res.y;
  float t = u_time;

  float d = (p.x + p.y) * 0.70710678;
  float s = (p.x - p.y) * 0.70710678;

  float warp =
        0.80 * sin(s * 0.80 + t * 0.13)
      + 0.16 * sin(s * 1.70 - t * 0.17 + 1.7);
  float D = d + warp;

  const float BANDS = 2.05;
  float slide = t * 0.05;
  float phase = D * BANDS + slide;
  float Dc    = (floor(phase) + 0.5 - slide) / BANDS;
  float aDc   = abs(Dc);

  float gap   = smoothstep(0.35, 0.82, aDc);
  float ridge = exp(-pow((aDc - 1.55) / 1.05, 2.0));
  float macro = gap * ridge;

  float q  = sign(Dc) * s;
  float qs = q - 1.3 * sin(t * 0.09);
  float lengthFade = smoothstep(-2.4, -0.6, qs) * (1.0 - smoothstep(0.5, 2.1, qs));

  float b = macro * lengthFade;

  float fp = fract(phase);
  b *= mix(0.86, 1.0, smoothstep(0.0, 0.13, fp) * smoothstep(0.0, 0.13, 1.0 - fp));

  fragColor = vec4(greenMap(b), 1.0);
}`;

  onMount(() => {
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power"
    });

    // WebGL2 unavailable: fall back to a solid Xbox-green base color so the
    // hero never renders against a transparent/black void.
    if (!gl) {
      canvas.style.background = "#001205";
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.background = "#001205";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      canvas.style.background = "#001205";
      return;
    }
    gl.useProgram(program);

    // Fullscreen triangle.
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };

    const render = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!media.matches) {
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Reduced motion: render a single static frame and stop.
    if (media.matches) {
      render(start);
    } else {
      frame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
    };
  });
</script>

<canvas bind:this={canvas} class="wave-background" aria-hidden="true"></canvas>

<style lang="scss">
  .wave-background {
    position: fixed;
    inset: 0;
    z-index: -3;
    width: 100%;
    height: 100%;
    background: #001205;
  }
</style>
