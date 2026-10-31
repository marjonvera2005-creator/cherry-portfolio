'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Slides a highlight (the container's ::before) to the element matching `selector`
export default function usePill(selector, active) {
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const box = ref.current;
    const place = () => {
      const el = box.querySelector(selector);
      if (!el) {
        box.style.setProperty('--pill-w', '0px');
        return;
      }
      box.style.setProperty('--pill-x', `${el.offsetLeft}px`);
      box.style.setProperty('--pill-w', `${el.offsetWidth}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(box);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [selector, active]);

  return ref;
}
