<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(1, width);
      pointer.y = event.clientY / Math.max(1, height);
    };

    const drawRibbon = (
      path: Path2D,
      gradient: CanvasGradient,
      alpha: number,
      blur = 0,
      blend: GlobalCompositeOperation = "source-over"
    ) => {
      context.save();
      context.globalAlpha = alpha;
      context.globalCompositeOperation = blend;
      context.filter = blur > 0 ? `blur(${blur}px)` : "none";
      context.fillStyle = gradient;
      context.fill(path);
      context.restore();
    };

    const pathOuter = (wave: number) => {
      const path = new Path2D();
      path.moveTo(-160, 150);
      path.bezierCurveTo(-120, 410 + wave * 24, -40, 650, 120, 760);
      path.bezierCurveTo(340, 910, 650, 850 - wave * 10, 890, 870);
      path.bezierCurveTo(1120, 890, 1250, 870, 1360, 990);
      path.bezierCurveTo(1450, 1090, 1420, 1220, 1380, 1300);
      path.lineTo(1160, 1280);
      path.bezierCurveTo(1190, 1130, 1120, 1050, 950, 1010);
      path.bezierCurveTo(700, 950, 390, 980, 150, 895);
      path.bezierCurveTo(-40, 830, -150, 620, -220, 200);
      path.closePath();
      return path;
    };

    const pathLeftStripe = (wave: number) => {
      const path = new Path2D();
      path.moveTo(-190, 190);
      path.bezierCurveTo(-135, 390 + wave * 10, -90, 610, 58, 735);
      path.bezierCurveTo(238, 885, 540, 860, 820, 880);
      path.bezierCurveTo(990, 892, 1120, 910, 1248, 1010);
      path.bezierCurveTo(1325, 1070, 1348, 1180, 1320, 1280);
      path.lineTo(1468, 1290);
      path.bezierCurveTo(1505, 1130, 1445, 1008, 1328, 918);
      path.bezierCurveTo(1170, 795, 1005, 780, 770, 770);
      path.bezierCurveTo(470, 758, 210, 760, 92, 620);
      path.bezierCurveTo(8, 520, -8, 330, 8, 170);
      path.closePath();
      return path;
    };

    const pathInnerShade = (wave: number) => {
      const path = new Path2D();
      path.moveTo(60, 165);
      path.bezierCurveTo(190, 270, 390, 300, 660, 320 + wave * 18);
      path.bezierCurveTo(980, 345, 1280, 330, 1580, 480);
      path.bezierCurveTo(1780, 580, 1860, 770, 1910, 1060);
      path.lineTo(1310, 1110);
      path.bezierCurveTo(1240, 940, 1100, 850, 860, 825);
      path.bezierCurveTo(555, 795, 270, 825, 110, 700);
      path.bezierCurveTo(-15, 605, -35, 360, 60, 165);
      path.closePath();
      return path;
    };

    const pathBottom = (wave: number) => {
      const path = new Path2D();
      path.moveTo(-150, 820);
      path.bezierCurveTo(150, 950, 420, 1010, 720, 1000);
      path.bezierCurveTo(1010, 990, 1120, 955 + wave * 18, 1270, 1050);
      path.bezierCurveTo(1380, 1120, 1570, 1140, 2060, 1060);
      path.lineTo(2060, 1250);
      path.lineTo(-150, 1250);
      path.closePath();
      return path;
    };

    const pathTop = (wave: number) => {
      const path = new Path2D();
      path.moveTo(590, -130);
      path.bezierCurveTo(810, 160, 1050, 160 + wave * 16, 1320, 125);
      path.bezierCurveTo(1600, 88, 1760, 85, 2080, 250);
      path.lineTo(2080, -140);
      path.closePath();
      return path;
    };

    const pathRightGlow = (wave: number) => {
      const path = new Path2D();
      path.moveTo(1305, 650);
      path.bezierCurveTo(1485, 720 + wave * 20, 1550, 855, 1520, 1120);
      path.lineTo(1325, 1160);
      path.bezierCurveTo(1365, 935, 1260, 820, 1070, 790);
      path.bezierCurveTo(1180, 748, 1250, 700, 1305, 650);
      path.closePath();
      return path;
    };

    const draw = (time: number) => {
      eased.x += (pointer.x - eased.x) * 0.018;
      eased.y += (pointer.y - eased.y) * 0.018;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#001904");
      base.addColorStop(0.42, "#001205");
      base.addColorStop(1, "#000701");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      const coverScale = Math.max(width / 1920, height / 1080);
      const offsetX = (width - 1920 * coverScale) / 2 + (eased.x - 0.5) * 6;
      const offsetY = (height - 1080 * coverScale) / 2 + (eased.y - 0.5) * 4;
      const wave = media.matches ? 0 : Math.sin(time * 0.00008) * 0.35;
      const drift = media.matches ? 0 : Math.sin(time * 0.00003) * 4;

      context.save();
      context.translate(offsetX + drift, offsetY);
      context.scale(coverScale, coverScale);

      const leftBloom = context.createRadialGradient(20, 710, 40, 20, 710, 520);
      leftBloom.addColorStop(0, "rgba(155, 255, 38, 0.9)");
      leftBloom.addColorStop(0.45, "rgba(92, 210, 30, 0.52)");
      leftBloom.addColorStop(1, "rgba(0, 18, 4, 0)");
      context.fillStyle = leftBloom;
      context.fillRect(-260, 80, 820, 1080);

      const rightBloom = context.createRadialGradient(1450, 980, 20, 1450, 980, 520);
      rightBloom.addColorStop(0, "rgba(131, 255, 64, 0.55)");
      rightBloom.addColorStop(0.55, "rgba(17, 125, 21, 0.24)");
      rightBloom.addColorStop(1, "rgba(0, 18, 4, 0)");
      context.fillStyle = rightBloom;
      context.fillRect(930, 520, 780, 780);

      const outerGradient = context.createLinearGradient(-130, 725, 1500, 965);
      outerGradient.addColorStop(0, "#a6f128");
      outerGradient.addColorStop(0.25, "#2ea521");
      outerGradient.addColorStop(0.58, "#0d5c17");
      outerGradient.addColorStop(0.82, "#6edc3b");
      outerGradient.addColorStop(1, "#05230a");
      drawRibbon(pathOuter(wave), outerGradient, 0.98, 1.25);

      const stripeGradient = context.createLinearGradient(-120, 500, 1410, 1120);
      stripeGradient.addColorStop(0, "rgba(185, 255, 36, 0.96)");
      stripeGradient.addColorStop(0.18, "rgba(97, 215, 34, 0.72)");
      stripeGradient.addColorStop(0.46, "rgba(18, 122, 26, 0.52)");
      stripeGradient.addColorStop(0.72, "rgba(115, 239, 57, 0.62)");
      stripeGradient.addColorStop(1, "rgba(6, 34, 9, 0.18)");
      drawRibbon(pathLeftStripe(wave), stripeGradient, 0.82, 1.5, "screen");

      const bottomGradient = context.createLinearGradient(-120, 900, 1700, 1110);
      bottomGradient.addColorStop(0, "rgba(96, 205, 37, 0.34)");
      bottomGradient.addColorStop(0.38, "rgba(7, 85, 19, 0.5)");
      bottomGradient.addColorStop(0.7, "rgba(6, 51, 14, 0.52)");
      bottomGradient.addColorStop(1, "rgba(1, 14, 4, 0.1)");
      drawRibbon(pathBottom(wave), bottomGradient, 0.86, 2);

      const rightGradient = context.createLinearGradient(1060, 690, 1540, 1120);
      rightGradient.addColorStop(0, "rgba(11, 59, 16, 0.1)");
      rightGradient.addColorStop(0.55, "rgba(126, 255, 73, 0.72)");
      rightGradient.addColorStop(1, "rgba(5, 25, 8, 0.18)");
      drawRibbon(pathRightGlow(wave), rightGradient, 0.82, 1.5, "screen");

      const topGradient = context.createLinearGradient(620, -80, 1960, 240);
      topGradient.addColorStop(0, "rgba(110, 208, 42, 0.34)");
      topGradient.addColorStop(0.45, "rgba(7, 70, 16, 0.42)");
      topGradient.addColorStop(1, "rgba(0, 17, 4, 0.04)");
      drawRibbon(pathTop(wave), topGradient, 0.84, 1.25);

      const shadeGradient = context.createLinearGradient(0, 220, 1780, 920);
      shadeGradient.addColorStop(0, "rgba(0, 10, 2, 0.82)");
      shadeGradient.addColorStop(0.45, "rgba(0, 23, 5, 0.68)");
      shadeGradient.addColorStop(1, "rgba(0, 4, 1, 0.82)");
      drawRibbon(pathInnerShade(wave), shadeGradient, 0.96, 4);

      const innerGreen = context.createLinearGradient(80, 760, 1480, 905);
      innerGreen.addColorStop(0, "rgba(30, 132, 22, 0.25)");
      innerGreen.addColorStop(0.5, "rgba(5, 82, 18, 0.32)");
      innerGreen.addColorStop(1, "rgba(102, 215, 58, 0.18)");
      drawRibbon(pathOuter(wave * 0.5), innerGreen, 0.36, 5, "screen");

      const finalSweep = context.createLinearGradient(-40, 560, 1450, 1080);
      finalSweep.addColorStop(0, "rgba(182, 255, 39, 0.54)");
      finalSweep.addColorStop(0.22, "rgba(75, 205, 34, 0.34)");
      finalSweep.addColorStop(0.55, "rgba(18, 135, 31, 0.22)");
      finalSweep.addColorStop(0.82, "rgba(132, 255, 78, 0.28)");
      finalSweep.addColorStop(1, "rgba(0, 20, 5, 0)");
      drawRibbon(pathLeftStripe(wave * 0.35), finalSweep, 0.54, 1, "screen");

      context.restore();

      const vignette = context.createRadialGradient(width * 0.52, height * 0.48, 0, width * 0.52, height * 0.48, Math.max(width, height) * 0.76);
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.64, "rgba(0, 0, 0, 0.16)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.72)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      if (!media.matches) {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
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
