'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import Reveal from './Reveal';
import { certificates } from '../lib/content';

export default function Certificates() {
  const modal = useRef(null);
  const [cert, setCert] = useState(null);

  const open = c => {
    setCert(c);
    modal.current.showModal();
  };

  return (
    <section className="certificates" id="certificates">
      <Reveal as="h2" className="section-title">Certificates</Reveal>
      <div className="certs">
        {certificates.map((c, i) => (
          <Reveal key={c.file} style={{ transitionDelay: `${i * 90}ms` }}>
            <button className="cert" type="button" onClick={() => open(c)}>
              <span className="cert-img">
                <Image src={`/assets/certificates/${c.file}.png`} alt="" width={c.width} height={c.height} sizes="(max-width: 760px) 100vw, 33vw" />
              </span>
              <strong>{c.title}</strong>
              <span>{c.issuer}</span>
              <em>{c.date}</em>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal dialogRef={modal} className="cert-modal" labelledBy="cmTitle">
        <h3 id="cmTitle">{cert?.fullTitle ?? cert?.title}</h3>
        {cert && (
          <>
            <Image
              src={`/assets/certificates/${cert.file}.png`}
              alt={`Certificate: ${cert.fullTitle ?? cert.title}`}
              width={cert.width}
              height={cert.height}
              sizes="960px"
            />
            <a className="btn ghost" href={`/assets/certificates/${cert.file}.pdf`} target="_blank" rel="noopener">
              Open PDF
            </a>
          </>
        )}
      </Modal>
    </section>
  );
}
