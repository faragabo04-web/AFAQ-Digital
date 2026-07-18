import { useCallback, useRef, useState } from "react";
import Logo from "./Logo.jsx";

export default function AboutEcosystem({ t }) {
  const [selected, setSelected] = useState(null);
  const [engagedId, setEngagedId] = useState(null);
  const [isActivating, setIsActivating] = useState(false);
  const lastServiceRef = useRef(null);

  const services = t.about.ecosystem;
  const selectedService = services.find((service) => service.id === selected) ?? null;
  if (selectedService) {
    lastServiceRef.current = selectedService;
  }
  const displayService = selectedService ?? lastServiceRef.current;
  const motionPaused = engagedId !== null || selected !== null;

  const endActivation = useCallback(() => setIsActivating(false), []);

  const sweepRef = useCallback(
    (node) => {
      if (node) {
        node.addEventListener("animationcancel", endActivation);
      }
    },
    [endActivation]
  );

  const handleCoreActivate = () => {
    if (isActivating) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIsActivating(true);
  };

  const handleNodeSelect = (id) => {
    setSelected((current) => (current === id ? null : id));
  };

  const handleModuleKeyDown = (event) => {
    if (event.key === "Escape" && selected !== null) {
      setSelected(null);
    }
  };

  return (
    <div
      className="about-ecosystem reveal"
      dir="ltr"
      role="group"
      aria-label={t.about.visualLabel}
      data-activating={isActivating || undefined}
      data-motion-paused={motionPaused || undefined}
      data-has-selection={selectedService ? "" : undefined}
      onKeyDown={handleModuleKeyDown}
    >
      <div className="eco-stage">
        <span className="eco-field" aria-hidden="true" />
        <span className="eco-layer eco-layer--grid" aria-hidden="true" />
        <span className="eco-layer eco-layer--glow" aria-hidden="true" />
        <span className="eco-mobile-arc" aria-hidden="true" />
        <div className="eco-rings" aria-hidden="true">
          <span className="eco-ring eco-ring--one" />
          <span className="eco-ring eco-ring--two" />
          <span className="eco-comet" />
          {isActivating && (
            <span className="eco-sweep" ref={sweepRef} onAnimationEnd={endActivation} />
          )}
        </div>
        <button
          type="button"
          className="eco-core"
          aria-label={t.about.activateLabel}
          onClick={handleCoreActivate}
        >
          <Logo variant="main" />
        </button>
        <ul className="eco-orbit">
          {services.map((service, index) => {
            const slogId = `eco-slogan-${service.id}`;
            return (
              <li className={`eco-node-slot eco-node-slot--${index + 1}`} key={service.id}>
                <div className="eco-node-upright">
                  <div
                    className="eco-node-engage"
                    onPointerEnter={() => setEngagedId(service.id)}
                    onPointerLeave={() =>
                      setEngagedId((current) => (current === service.id ? null : current))
                    }
                    onFocusCapture={() => setEngagedId(service.id)}
                    onBlurCapture={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setEngagedId((current) => (current === service.id ? null : current));
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="eco-node"
                      aria-pressed={selected === service.id}
                      aria-expanded={selected === service.id}
                      aria-controls="eco-detail"
                      aria-describedby={slogId}
                      onClick={() => handleNodeSelect(service.id)}
                    >
                      <span className="eco-node-lift">
                        <span className="eco-node-inner">
                          <span className="eco-node-port" aria-hidden="true" />
                          <span className="eco-node-label">{service.label}</span>
                        </span>
                      </span>
                    </button>
                    <span className="eco-node-slogan" id={slogId}>
                      {service.slogan}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div id="eco-detail" className="eco-detail" aria-hidden={selectedService ? undefined : "true"}>
        <div className={`eco-detail-inner${selectedService ? " is-active" : ""}`}>
          {displayService && (
            <>
              <p className="eco-detail-text">
                <strong className="eco-detail-title">{displayService.label}</strong>
                <span className="eco-detail-slogan">{displayService.slogan}</span>
              </p>
              <div className="eco-detail-links">
                {displayService.links.map((link) => (
                  <a key={link.anchor} className="eco-detail-link" href={`#${link.anchor}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <span className="eco-sr-only" aria-live="polite">
        {selectedService ? `${selectedService.label}. ${selectedService.slogan}` : ""}
      </span>
    </div>
  );
}
