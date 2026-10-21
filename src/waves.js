const waveLayers = [
  { height: 0.2, amplitude: 0.12, speed: 0.0003, alpha: 0.25, phase: 0 },
  { height: 0.4, amplitude: 0.105, speed: 0.00025, alpha: 0.4, phase: 2 },
  { height: 0.6, amplitude: 0.084, speed: 0.0002, alpha: 0.5, phase: 4 },
  { height: 0.7, amplitude: 0.056, speed: 0.00015, alpha: 1, phase: 6 },
];

const container = document.querySelector('.page-waves');
const canvas = container?.querySelector('canvas');
const context = canvas?.getContext('2d', { alpha: true });

if (container && canvas && context) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let frameId = 0;
  let startedAt = 0;

  const clear = () => context.clearRect(0, 0, width, height);

  const draw = (timestamp = 0) => {
    if (!startedAt) startedAt = timestamp;
    const elapsed = timestamp - startedAt;
    clear();
    context.fillStyle = '#0693e3';

    waveLayers.forEach((wave, index) => {
      const baseline = height * wave.height;
      const amplitude = Math.min(height * wave.amplitude, 42);
      const step = Math.max(2, Math.round(width / 500));
      context.beginPath();
      context.moveTo(0, height);

      for (let x = 0; x <= width; x += step) {
        const primary = Math.sin(x * 0.006 + elapsed * wave.speed + wave.phase) * amplitude;
        const secondary = Math.sin(x * 0.0027 - elapsed * wave.speed * 0.68 + wave.phase * 1.4) * amplitude * 0.42;
        context.lineTo(x, baseline + primary + secondary);
      }

      context.lineTo(width, height);
      context.closePath();
      context.globalAlpha = wave.alpha;
      context.fill();
    });

    context.globalAlpha = 1;
    if (!reducedMotion.matches) frameId = window.requestAnimationFrame(draw);
  };

  const resize = () => {
    const bounds = container.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    draw(startedAt ? performance.now() : 0);
  };

  const refreshMotion = () => {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    draw(performance.now());
  };

  reducedMotion.addEventListener('change', refreshMotion);
  new ResizeObserver(resize).observe(container);
  resize();
}
