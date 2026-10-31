'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1300;
    const start = performance.now();
    let raf, timer;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 2));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(() => setDone(true), 150);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <p className="loader-num">
        {Math.round(progress * 100)}
        <small>%</small>
      </p>
      <div className="loader-bar">
        <i style={{ width: `${progress * 100}%` }} />
      </div>
      <p className="loader-text">Loading portfolio</p>
    </div>
  );
}
