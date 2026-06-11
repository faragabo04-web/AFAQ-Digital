import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Process from "./components/Process.jsx";
import Packages from "./components/Packages.jsx";
import About from "./components/About.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import AssistantWidget from "./components/AssistantWidget.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import Preloader from "./components/Preloader.jsx";
import Footer from "./components/Footer.jsx";
import { content } from "./data/content.js";

const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("afaq-language") === "ar" ? "ar" : "en";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("afaq-theme") === "light" ? "light" : "dark";
};

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderLeaving, setPreloaderLeaving] = useState(false);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    localStorage.setItem("afaq-language", lang);
  }, [lang, t.dir]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("afaq-theme", theme);
  }, [theme]);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setPreloaderLeaving(true), 1350);
    const removeTimer = window.setTimeout(() => setShowPreloader(false), 1750);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  const toggleLanguage = () => setLang((current) => (current === "en" ? "ar" : "en"));
  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <>
      {showPreloader && <Preloader isLeaving={preloaderLeaving} />}
      <Header lang={lang} t={t} onToggleLanguage={toggleLanguage} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero t={t} />
        <Services t={t} />
        <WhyChoose t={t} />
        <Portfolio t={t} />
        <Testimonials t={t} />
        <Process t={t} />
        <Packages t={t} />
        <About t={t} />
        <FAQ t={t} />
        <Contact t={t} />
      </main>
      <AssistantWidget t={t} />
      <FloatingWhatsApp t={t} />
      <Footer t={t} />
    </>
  );
}
