import { useEffect, useState } from "react";
import { navLinks } from "../data/content.js";
import Logo from "./Logo.jsx";

export default function Header({ lang, t, onToggleLanguage, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand-link" href="#home" onClick={closeMenu}>
          <Logo variant="header" />
        </a>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-panel ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={closeMenu}>
                {link[lang]}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-pressed={theme === "light"}
              aria-label={
                t.dir === "rtl"
                  ? theme === "dark"
                    ? "التبديل إلى الوضع الفاتح"
                    : "التبديل إلى الوضع الداكن"
                  : theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="4.4" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M20.6 14.4A8.6 8.6 0 0 1 9.6 3.4a8.6 8.6 0 1 0 11 11Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
            <button className="language-switch" type="button" onClick={onToggleLanguage}>
              <span className="language-icon" aria-hidden="true">
                ◌
              </span>
              <span>{t.langLabel}</span>
            </button>
            <a className="btn btn--primary btn--nav" href="#contact" onClick={closeMenu}>
              {t.navCta}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
