'use client';

import { useEffect, useState } from 'react';
import Icon from './Icons';
import Reveal, { useInView } from './Reveal';
import { certificates, profile, skills } from '../lib/content';

// Networking Basics has two certificate files but counts as one certification
const certificationCount = new Set(certificates.map(c => c.title)).size;

function Stat({ icon, value, label, note, href }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(value);

  useEffect(() => {
    if (!inView || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    let raf;
    const tick = now => {
      const p = Math.min((now - start) / 900, 1);
      setCount(Math.round(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <a ref={ref} className={`stat reveal${inView ? ' in' : ''}`} href={href}>
      <Icon name={icon} />
      <b>{count}</b>
      <strong>{label}</strong>
      <span>{note}</span>
    </a>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <Reveal as="h2" className="section-title">About Me</Reveal>
      <div className="about-grid">
        <Reveal className="about-name">
          <h3>
            <span className="grad">Hi, I&apos;m</span>
            <br />
            Cherry Mae{' '}
            <br />
            Atibula
          </h3>
          <a className="btn primary" href="#contact">Contact Me</a>
        </Reveal>
        <Reveal className="about-text">
          <p>
            I&apos;m a <strong>{profile.course}</strong> student at {profile.school}, working toward a career as a{' '}
            <strong>Front-end Developer</strong>.
          </p>
          <p>I want to keep improving both my creativity and my technical skills, and to grow professionally by building for the technology industry.</p>
          <a className="link-btn" href="#projects">
            See my work <Icon name="arrow" />
          </a>
        </Reveal>
      </div>

      <Reveal as="h3" className="sub-title">Education</Reveal>
      <Reveal className="edu">
        <div className="edu-mark"><Icon name="school" /></div>
        <div>
          <strong>{profile.school}</strong>
          <span>Bachelor of Science in Computer Science</span>
        </div>
      </Reveal>

      <div className="stats">
        <Stat icon="code" value={1} label="Projects" note="Work I've built" href="#projects" />
        <Stat icon="award" value={certificationCount} label="Certifications" note="Skills I've validated" href="#certificates"/>
        <Stat icon="layers" value={skills.length} label="Skills" note="What I work with" href="#skills" />
      </div>
    </section>
  );
}
