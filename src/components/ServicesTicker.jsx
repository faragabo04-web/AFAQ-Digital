export default function ServicesTicker({ t }) {
  const services = t.servicesTicker.items;

  const renderItems = (prefix) =>
    services.map((service) => (
      <li className="services-ticker__item" key={`${prefix}-${service}`}>
        <span dir="auto">{service}</span>
      </li>
    ));

  return (
    <section className="services-ticker" aria-label={t.servicesTicker.label}>
      <div className="services-ticker__viewport">
        <div className="services-ticker__rail">
          <ul className="services-ticker__list">{renderItems("service")}</ul>
          <ul className="services-ticker__list" aria-hidden="true">{renderItems("service-copy")}</ul>
        </div>
      </div>
    </section>
  );
}
