'use client';

import { useEffect, useState } from 'react';
import Icon from './Icons';
import usePill from './usePill';

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['certificates', 'Certificates', 'Certs'],
  ['contact', 'Contact'],
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const nav = usePill('a.active', active);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main > section').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
    };
    // cross-fades the whole page where the browser supports it
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(apply);
    else apply();
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };

  return (
    <nav className="nav" ref={nav} aria-label="Main">
      {links.map(([id, label, short]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'active' : undefined}>
          {short ? (
            <>
              <span className="label-long">{label}</span>
              <span className="label-short">{short}</span>
            </>
          ) : (
            label
          )}
        </a>
      ))}
      <button className="theme-btn" type="button" aria-label="Switch color theme" onClick={toggleTheme}>
        <Icon name="moon" className="i-moon" />
        <Icon name="sun" className="i-sun" />
      </button>
    </nav>
  );
}
