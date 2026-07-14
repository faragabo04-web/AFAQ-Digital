import { useEffect, useState } from "react";
import { navLinks } from "../data/content.js";
import Logo from "./Logo.jsx";

export default function Header({ lang, t, onToggleLanguage }) {
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
            <div className="lang-switch" role="group" aria-label={t.dir === "rtl" ? "اختيار اللغة" : "Language"}>
              <button
                type="button"
                className={lang === "en" ? "is-active" : ""}
                aria-pressed={lang === "en"}
                onClick={() => lang !== "en" && onToggleLanguage()}
              >
                EN
              </button>
              <button
                type="button"
                lang="ar"
                className={lang === "ar" ? "is-active" : ""}
                aria-pressed={lang === "ar"}
                onClick={() => lang !== "ar" && onToggleLanguage()}
              >
                عربي
              </button>
            </div>
            <a className="btn btn--primary btn--nav" href="#contact" onClick={closeMenu}>
              {t.navCta}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
