'use client';

import { useEffect, useRef } from 'react';

// Twinkling specks and occasional shooting stars behind the page
export default function Sky() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const readSpeck = () => getComputedStyle(document.documentElement).getPropertyValue('--speck').trim();
    let w, h, raf;
    let dots = [];
    let meteors = [];
    let speck = readSpeck();

    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const a = d.a * (0.65 + 0.35 * Math.sin((t / 900) * d.s + d.p));
        ctx.fillStyle = `rgba(${speck},${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.29);
        ctx.fill();
      }
      if (reduceMotion) return;
      if (Math.random() < 0.004 && meteors.length < 2) {
        meteors.push({ x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, life: 0 });
      }
      meteors = meteors.filter(m => m.life < 1);
      for (const m of meteors) {
        m.life += 0.014;
        m.x += 7;
        m.y += 4.2;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - 110, m.y - 66);
        g.addColorStop(0, `rgba(${speck},${0.65 * (1 - m.life)})`);
        g.addColorStop(1, `rgba(${speck},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - 110, m.y - 66);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    const size = () => {
      const r = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      c.width = w * r;
      c.height = h * r;
      ctx.setTransform(r, 0, 0, r, 0, 0);
      dots = Array.from({ length: Math.round((w * h) / 14000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        a: Math.random() * 0.5 + 0.15,
        s: Math.random() * 2 + 0.5,
        p: Math.random() * 6.28,
      }));
      if (reduceMotion) draw(0);
    };

    const themeWatch = new MutationObserver(() => {
      speck = readSpeck();
      if (reduceMotion) draw(0);
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    addEventListener('resize', size);
    size();
    if (!reduceMotion) raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      removeEventListener('resize', size);
    };
  }, []);

  return <canvas id="sky" ref={ref} aria-hidden="true" />;
}
