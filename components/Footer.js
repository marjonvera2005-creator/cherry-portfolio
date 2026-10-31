import { profile } from '../lib/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="brand">{profile.name}</p>
        <p>Aspiring front-end developer building websites that are clear, friendly, and easy to use.</p>
      </div>
      <div>
        <h4>Navigation</h4>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#certificates">Certificates</a>
        <a href="#contact">Contact</a>
      </div>
      <p className="copy">© 2026 {profile.fullName}</p>
    </footer>
  );
}
