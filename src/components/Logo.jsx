import { useState } from "react";

export default function Logo({ variant = "header", className = "" }) {
  const [failed, setFailed] = useState(false);
  const sources = {
    header: "/afaq-digital-header-logo.png",
    main: "/afaq-digital-main-logo.png",
    icon: "/afaq-digital-icon.png"
  };

  const dims = {
    header: { width: 218, height: 68 },
    main: { width: 600, height: 595 },
    icon: { width: 34, height: 34 }
  };

  if (!failed) {
    return (
      <img
        className={`logo-img logo-img--${variant} ${className}`}
        src={sources[variant]}
        alt="AFAQ Digital"
        width={dims[variant].width}
        height={dims[variant].height}
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