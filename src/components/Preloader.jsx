import Logo from "./Logo.jsx";

export default function Preloader({ isLeaving = false }) {
  return (
    <div className={`preloader ${isLeaving ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading AFAQ Digital">
      <div className="preloader-orbit" aria-hidden="true">
        <span className="preloader-ring preloader-ring--outer" />
        <span className="preloader-ring preloader-ring--middle" />
        <span className="preloader-ring preloader-ring--inner" />
        <span className="preloader-node preloader-node--one" />
        <span className="preloader-node preloader-node--two" />
      </div>
      <div className="preloader-core">
        <Logo variant="main" />
      </div>
      <span className="preloader-line" aria-hidden="true" />
    </div>
  );
}
