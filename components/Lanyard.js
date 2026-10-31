'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { profile } from '../lib/content';

const SEGMENTS = 14;
const GRAVITY = 0.55;
const ITERATIONS = 18;
const DAMP = 0.965;

// A verlet rope pinned above the viewport, with the badge hanging off its end
export default function Lanyard() {
  const stageRef = useRef(null);
  const strapRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current, strap = strapRef.current, badge = badgeRef.current;
    const ctx = strap.getContext('2d');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const readAccent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    let accent = readAccent();
    let pts = [], segLen = 0, anchor = { x: 0, y: 0 }, offsetY = 0;
    let dragging = false, grab = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    let pinned = false, angle = 0, angleV = 0, onScreen = true, raf, resizeTimer;

    const simulate = () => {
      pts.forEach((p, i) => {
        if (i === 0) return;
        const vx = (p.x - p.px) * DAMP, vy = (p.y - p.py) * DAMP;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      });
      const end = pts[SEGMENTS];
      for (let k = 0; k < ITERATIONS; k++) {
        pts[0].x = anchor.x;
        pts[0].y = anchor.y;
        if (dragging) {
          end.x = target.x;
          end.y = target.y;
        }
        for (let i = 0; i < SEGMENTS; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
          if (d <= segLen) continue; // the strap can go slack but not stretch
          const diff = (d - segLen) / d / 2;
          if (i !== 0) {
            a.x += dx * diff;
            a.y += dy * diff;
          }
          b.x -= dx * diff;
          b.y -= dy * diff;
        }
      }
      if (dragging) {
        end.x = target.x;
        end.y = target.y;
      }
      const prev = pts[SEGMENTS - 3];
      const wanted = -Math.atan2(end.x - prev.x, end.y - prev.y);
      angleV += (wanted - angle) * 0.06 - (end.x - end.px) * 0.0012;
      angleV *= 0.9;
      angle += angleV;
    };

    const render = () => {
      const r = strap.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < SEGMENTS; i++) {
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2);
        }
        ctx.lineTo(pts[SEGMENTS].x, pts[SEGMENTS].y);
      };
      path();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 15;
      ctx.stroke();
      path();
      ctx.strokeStyle = 'rgba(255,255,255,.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      if (pinned) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, 9, 0, 6.29);
        ctx.fill();
      }
      const e = pts[SEGMENTS];
      const tilt = Math.max(-22, Math.min(22, (e.x - e.px) * 2.2));
      badge.style.transform = `translate(${e.x - badge.offsetWidth / 2}px, ${e.y - offsetY - 6}px) perspective(800px) rotateZ(${angle}rad) rotateY(${tilt}deg)`;
    };

    const layout = () => {
      const r = strap.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      strap.width = r.width * ratio;
      strap.height = r.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      offsetY = stage.getBoundingClientRect().top - r.top;
      const stacked = innerWidth <= 760; // on phones the strap hangs from a pin instead of the top of the page
      anchor = { x: r.width / 2, y: stacked ? 10 : -10 };
      pinned = stacked;
      const restY = offsetY + 70;
      segLen = (restY - anchor.y) / SEGMENTS;
      pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
        const y = anchor.y + segLen * i;
        return { x: anchor.x, y, px: anchor.x, py: y };
      });
      render(); // also moves the badge when resized while scrolled out of view
      if (!reduceMotion) pts[SEGMENTS].px -= 34; // opening swing
    };

    const pointerPos = ev => {
      const r = strap.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };
    const onDown = ev => {
      dragging = true;
      badge.classList.add('dragging');
      badge.setPointerCapture(ev.pointerId);
      const p = pointerPos(ev), e = pts[SEGMENTS];
      grab = { x: p.x - e.x, y: p.y - e.y };
      target = { x: e.x, y: e.y };
      ev.preventDefault();
    };
    const onMove = ev => {
      if (!dragging) return;
      const p = pointerPos(ev), r = strap.getBoundingClientRect(), half = badge.offsetWidth / 2;
      // keep the badge on screen
      target = {
        x: Math.max(half - r.left, Math.min(innerWidth - half - r.left, p.x - grab.x)),
        y: Math.max(40, Math.min(r.height - 80, p.y - grab.y)),
      };
      if (reduceMotion) {
        pts[SEGMENTS].x = target.x;
        pts[SEGMENTS].y = target.y;
      }
    };
    const release = () => {
      dragging = false;
      badge.classList.remove('dragging');
    };
    badge.addEventListener('pointerdown', onDown);
    badge.addEventListener('pointermove', onMove);
    badge.addEventListener('pointerup', release);
    badge.addEventListener('pointercancel', release);

    const visible = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
    });
    visible.observe(stage);
    const themeWatch = new MutationObserver(() => {
      accent = readAccent();
      if (reduceMotion) render();
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    };
    addEventListener('resize', onResize);

    const frame = () => {
      if (onScreen) {
        simulate();
        render();
      }
      raf = requestAnimationFrame(frame);
    };
    layout();
    if (!reduceMotion) frame();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      visible.disconnect();
      themeWatch.disconnect();
      removeEventListener('resize', onResize);
      badge.removeEventListener('pointerdown', onDown);
      badge.removeEventListener('pointermove', onMove);
      badge.removeEventListener('pointerup', release);
      badge.removeEventListener('pointercancel', release);
    };
  }, []);

  return (
    <div className="badge-stage" ref={stageRef}>
      <canvas id="strap" ref={strapRef} aria-hidden="true" />
      <div className="badge" ref={badgeRef} role="img" aria-label={`ID badge of ${profile.name}. Drag to swing it.`}>
        <div className="badge-clip" />
        <div className="badge-head">
          <b>FRONT-END</b>
          <span>DEVELOPER</span>
        </div>
        <Image src="/assets/cherry.jpg" alt="" width={1254} height={1254} sizes="250px" priority draggable={false} />
        <div className="badge-foot">
          <strong>{profile.fullName}</strong>
          <span>{profile.course}</span>
        </div>
      </div>
    </div>
  );
}
