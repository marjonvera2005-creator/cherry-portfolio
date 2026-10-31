'use client';

import { useEffect, useState } from 'react';
import Icon from './Icons';
import Lanyard from './Lanyard';
import { typedLines } from '../lib/content';

function Typed() {
  const [text, setText] = useState(typedLines[0]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let line = 0, chars = 0, deleting = false, timer;
    const step = () => {
      const full = typedLines[line];
      chars += deleting ? -1 : 1;
      setText(full.slice(0, chars));
      let wait = deleting ? 35 : 70;
      if (!deleting && chars === full.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && chars === 0) {
        deleting = false;
        line = (line + 1) % typedLines.length;
        wait = 300;
      }
      timer = setTimeout(step, wait);
    };
    step();
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="typed" aria-label={typedLines[0]}>
      <span aria-hidden="true">{text}</span>
      <i className="caret" aria-hidden="true" />
    </p>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <h1>
          <span className="grad">Welcome to</span>
          <br />
          My Portfolio
        </h1>
        <Typed />
        <p className="lead">
          I enjoy designing and creating websites that are visually appealing, user-friendly, and easy to navigate, and
          I&apos;m learning how to turn ideas into working products.
        </p>
        <div className="actions">
          <a className="btn primary" href="#projects">
            View Projects <Icon name="arrow" />
          </a>
          <a className="btn ghost" href="#contact">
            Contact Me <Icon name="send" />
          </a>
        </div>
      </div>
      <Lanyard />
    </section>
  );
}
