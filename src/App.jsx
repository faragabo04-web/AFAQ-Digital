import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Process from "./components/Process.jsx";
import Packages from "./components/Packages.jsx";
import About from "./components/About.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import AssistantWidget from "./components/AssistantWidget.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import Footer from "./components/Footer.jsx";
import { content } from "./data/content.js";

const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("afaq-language") === "ar" ? "ar" : "en";
};

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    localStorage.setItem("afaq-language", lang);
  }, [lang, t.dir]);

  const toggleLanguage = () => setLang((current) => (current === "en" ? "ar" : "en"));

  return (
    <>
      <Header lang={lang} t={t} onToggleLanguage={toggleLanguage} />
      <main>
        <Hero t={t} />
        <Services t={t} />
        <WhyChoose t={t} />
        <Portfolio t={t} />
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
