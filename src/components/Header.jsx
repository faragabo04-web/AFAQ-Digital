import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content.js";
import Logo from "./Logo.jsx";

export default function Header({ lang, t, onToggleLanguage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const servicesToggleRef = useRef(null);
  const closeTimerRef = useRef(null);
  const navPanelId = "primary-navigation";
  const servicesDropdownId = "services-navigation-dropdown";
  const mobileServicesId = "mobile-services-navigation";
  const serviceLinks = t.servicesNav.items;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!servicesRef.current?.contains(event.target)) {
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (servicesOpen || mobileServicesOpen) {
        setServicesOpen(false);
        setMobileServicesOpen(false);
        servicesToggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen, mobileServicesOpen]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  const cancelClose = () => window.clearTimeout(closeTimerRef.current);
  const isMobileNav = () => window.matchMedia("(max-width: 1060px)").matches;
  const openServices = () => {
    if (isMobileNav()) return;
    cancelClose();
    setServicesOpen(true);
  };
  const delayCloseServices = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 150);
  };
  const toggleServices = () => {
    cancelClose();
    if (isMobileNav()) {
      setServicesOpen(false);
      setMobileServicesOpen((value) => !value);
      return;
    }
    setMobileServicesOpen(false);
    setServicesOpen((value) => !value);
  };
  const closeServices = () => {
    cancelClose();
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };
  const closeMenu = () => {
    setOpen(false);
    closeServices();
  };
  const handleNavLinkClick = (event, id) => {
    if (id === "services" && isMobileNav()) {
      event.preventDefault();
      setServicesOpen(false);
      setMobileServicesOpen((value) => !value);
      return;
    }
    closeMenu();
  };
  const handleServiceItemClick = () => {
    closeMenu();
  };

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
          aria-controls={navPanelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id={navPanelId} className={`nav-panel ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {navLinks.map((link) =>
              link.id === "services" ? (
                <div
                  className={`nav-services ${servicesOpen || mobileServicesOpen ? "is-open" : ""}`}
                  key={link.id}
                  ref={servicesRef}
                  onMouseEnter={openServices}
                  onMouseLeave={delayCloseServices}
                >
                  <div className="nav-services__trigger">
                    <a href="#services" onFocus={openServices} onClick={(event) => handleNavLinkClick(event, link.id)}>
                      {link[lang]}
                    </a>
                    <button
                      className="nav-services__toggle"
                      type="button"
                      aria-label={t.servicesNav.toggleLabel}
                      aria-expanded={servicesOpen || mobileServicesOpen}
                      aria-controls={`${servicesDropdownId} ${mobileServicesId}`}
                      ref={servicesToggleRef}
                      onClick={toggleServices}
                    >
                      <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
                        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="services-dropdown" id={servicesDropdownId} onMouseEnter={cancelClose} onMouseLeave={delayCloseServices}>
                    {serviceLinks.map((item) => (
                      <a href={item.href} key={item.href} onClick={handleServiceItemClick}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="mobile-services-submenu" id={mobileServicesId}>
                    {serviceLinks.map((item) => (
                      <a href={item.href} key={item.href} onClick={handleServiceItemClick}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={link.id} href={`#${link.id}`} onClick={(event) => handleNavLinkClick(event, link.id)}>
                  {link[lang]}
                </a>
              )
            )}
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
