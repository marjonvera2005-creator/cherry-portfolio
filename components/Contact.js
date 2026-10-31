'use client';

import Icon from './Icons';
import Reveal from './Reveal';
import { profile } from '../lib/content';

const socials = [
  ['facebook', 'Facebook', profile.facebook],
  ['github', 'GitHub', profile.github],
];

export default function Contact() {
  // No backend: the form opens a prefilled email to Cherry
  const onSubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Portfolio message from ${f.get('name')}`;
    const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`;
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contact">
      <Reveal as="h2" className="section-title">Contact Me</Reveal>
      <Reveal as="p" className="contact-lead">Have an opportunity or a question? Send me a message.</Reveal>
      <div className="contact-grid">
        <Reveal as="form" className="form" onSubmit={onSubmit}>
          <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" rows={5} placeholder="Your message" required /></label>
          <button className="btn primary wide" type="submit">Send Message <Icon name="send" /></button>
          <p className="form-note">This opens the message in your email app, ready to send.</p>
        </Reveal>
        <Reveal className="find">
          <h3>Find Me</h3>
          <a className="find-row" href={`mailto:${profile.email}`}>
            <span><Icon name="mail" /></span>
            <div><strong>Email</strong><small>{profile.email}</small></div>
          </a>
          <a className="find-row" href={profile.phoneHref}>
            <span><Icon name="phone" /></span>
            <div><strong>Phone</strong><small>{profile.phoneDisplay}</small></div>
          </a>
          <div className="find-row">
            <span><Icon name="school" /></span>
            <div><strong>School</strong><small>{profile.school}</small></div>
          </div>
          <div className="socials">
            {socials.map(([icon, label, url]) =>
              url ? (
                <a key={icon} className="social" href={url} target="_blank" rel="noopener" aria-label={label}>
                  <Icon name={icon} />
                </a>
              ) : (
                <span key={icon} className="social" role="img" aria-label={label}>
                  <Icon name={icon} />
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
