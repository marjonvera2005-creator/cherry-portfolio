'use client';

import Reveal from './Reveal';
import { skills } from '../lib/content';

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <Reveal as="h2" className="section-title">Skills</Reveal>
      <ul className="skills">
        {skills.map(([mark, name], i) => (
          <Reveal as="li" key={name} style={{ transitionDelay: `${i * 45}ms` }}>
            <span aria-hidden="true">{mark}</span>
            {name}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
