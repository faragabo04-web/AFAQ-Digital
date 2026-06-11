import { useState } from "react";

export default function Logo({ variant = "header", className = "" }) {
  const [failed, setFailed] = useState(false);
  const sources = {
    // TODO: Replace fallback with public/afaq-digital-header-logo.png
    header: "/afaq-digital-header-logo.png",
    // TODO: Replace fallback with public/afaq-digital-main-logo.png
    main: "/afaq-digital-main-logo.png",
    // TODO: Replace fallback with public/afaq-digital-icon.png
    icon: "/afaq-digital-icon.png"
  };

  if (!failed) {
    return (
      <img
        className={`logo-img logo-img--${variant} ${className}`}
        src={sources[variant]}
        alt="AFAQ Digital"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className={`logo-fallback logo-fallback--${variant} ${className}`} aria-label="AFAQ Digital">
      <span className="logo-mark">
        <span>AF</span>
      </span>
      {variant !== "icon" && (
        <span className="logo-word">
          <strong>AFAQ</strong>
          <small>Digital</small>
        </span>
      )}
    </span>
  );
}
