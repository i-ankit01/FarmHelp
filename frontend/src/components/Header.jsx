import logo from "../assets//1749736593810.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .fh-header {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          height: 72px;
          background: rgba(245, 240, 232, 0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(74, 46, 26, 0.12);
          font-family: 'DM Sans', sans-serif;
        }

        .fh-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .fh-logo img {
          width: 46px;
          height: 46px;
          object-fit: cover;
          border-radius: 8px;
        }

        .fh-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2C1A0E;
          letter-spacing: -0.02em;
          text-decoration: none;
        }

        .fh-brand-name span { color: #D4820A; }

        .fh-nav {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .fh-nav a {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4A2E1A;
          text-decoration: none;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          position: relative;
          transition: color 0.2s;
          cursor: pointer;
        }

        .fh-nav a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #D4820A;
          transition: width 0.3s ease;
        }

        .fh-nav a:hover { color: #D4820A; }
        .fh-nav a:hover::after { width: 100%; }

        .fh-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .fh-btn-ghost {
          padding: 0.5rem 1.25rem;
          border: 1.5px solid #4A2E1A;
          background: transparent;
          color: #4A2E1A;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .fh-btn-ghost:hover {
          background: #2C1A0E;
          color: #F5F0E8;
          border-color: #2C1A0E;
        }

        .fh-btn-primary {
          padding: 0.5rem 1.5rem;
          background: #D4820A;
          color: #FDFAF5;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .fh-btn-primary:hover {
          background: #6B3F2A;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,130,10,0.25);
        }

        /* Hamburger */
        .fh-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }

        .fh-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #2C1A0E;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .fh-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .fh-hamburger.open span:nth-child(2) { opacity: 0; }
        .fh-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .fh-mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(245,240,232,0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(74,46,26,0.12);
          z-index: 99;
          padding: 1.5rem 2rem;
          flex-direction: column;
          gap: 0;
          font-family: 'DM Sans', sans-serif;
        }

        .fh-mobile-menu.open { display: flex; }

        .fh-mobile-menu a {
          display: block;
          padding: 0.875rem 0;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #4A2E1A;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid rgba(74,46,26,0.08);
          transition: color 0.2s;
          cursor: pointer;
        }

        .fh-mobile-menu a:last-of-type { border-bottom: none; }
        .fh-mobile-menu a:hover { color: #D4820A; }

        .fh-mobile-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .fh-mobile-actions a { flex: 1; justify-content: center; text-align: center; }

        @media (max-width: 900px) {
          .fh-header { padding: 0 1.25rem; }
          .fh-nav { display: none; }
          .fh-actions .fh-btn-primary { display: none; }
          .fh-hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .fh-brand-name { font-size: 1.2rem; }
          .fh-logo img { width: 38px; height: 38px; }
        }
      `}</style>

      <header className="fh-header">
        {/* Logo */}
        <Link to="/" className="fh-logo">
          <img src={logo} alt="Farm Help logo" />
          <span className="fh-brand-name">Farm <span>Help</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav>
          <ul className="fh-nav">
            <li><a href="#features" onClick={(e) => handleScroll(e, "features")}>Features</a></li>
            <li><a href="#how-it-works" onClick={(e) => handleScroll(e, "how-it-works")}>How It Works</a></li>
            <li><a href="#testimonials" onClick={(e) => handleScroll(e, "testimonials")}>Testimonials</a></li>
            <li><a href="#contact" onClick={(e) => handleScroll(e, "contact")}>Contact</a></li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="fh-actions">
          <a href="/signin/user" className="fh-btn-ghost">Sign In</a>
          <a href="/signup/user" className="fh-btn-primary">
            Sign Up <ArrowRight size={14} />
          </a>
          <button
            className={`fh-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <nav className={`fh-mobile-menu${menuOpen ? " open" : ""}`}>
        <a href="#features" onClick={(e) => handleScroll(e, "features")}>Features</a>
        <a href="#how-it-works" onClick={(e) => handleScroll(e, "how-it-works")}>How It Works</a>
        <a href="#testimonials" onClick={(e) => handleScroll(e, "testimonials")}>Testimonials</a>
        <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>Contact</a>
        <div className="fh-mobile-actions">
          <a href="/signin/user" className="fh-btn-ghost">Sign In</a>
          <a href="/signup/user" className="fh-btn-primary">Sign Up</a>
        </div>
      </nav>
    </>
  );
};

export default Header;