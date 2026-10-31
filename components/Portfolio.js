'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Icon from './Icons';
import Modal from './Modal';
import Reveal from './Reveal';
import { project } from '../lib/content';

export default function Portfolio() {
  const projectModal = useRef(null);
  const { home, varieties, profile } = project.screens;

  return (
    <section className="portfolio" id="projects">
      <Reveal as="h2" className="section-title">Projects</Reveal>
      <Reveal as="article" className="project">
        <div className="project-shot">
          {[varieties, home, profile].map(s => (
            <Image key={s.src} {...s} sizes="(max-width: 960px) 36vw, 20vw" />
          ))}
        </div>
        <div className="project-body">
          <h3>{project.name}</h3>
          <p className="project-sub">{project.subtitle}</p>
          <p>{project.summary}</p>
          <button className="btn ghost" type="button" onClick={() => projectModal.current.showModal()}>
            Details <Icon name="arrow" />
          </button>
        </div>
      </Reveal>

      <Modal dialogRef={projectModal} className="project-modal" labelledBy="pmTitle">
        <h3 id="pmTitle">{project.name}</h3>
        <p className="project-sub">{project.subtitle}</p>
        <p>{project.description}</p>
        <div className="phones">
          {[home, varieties, profile].map(s => (
            <Image key={s.src} {...s} sizes="(max-width: 760px) 30vw, 220px" />
          ))}
        </div>
        <div className="modal-cols">
          <div>
            <h4>Technologies Used</h4>
            <ul className="chips">
              {project.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h4>Supported Varieties</h4>
            <ul className="varieties">
              {project.varieties.map(([name, text]) => (
                <li key={name}><strong>{name}</strong> {text}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </section>
  );
}
