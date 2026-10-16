import "./dashboard.scss";

// Brand logo shown on the admin login / create-account screens.
export function Logo() {
  return (
    <div className="sb-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sb-logo__img" src="/logo.png" alt="Sewa Bharti Rajasthan" width={80} height={80} />
      <div className="sb-logo__text">
        <span className="sb-logo__name">Sewa Bharti Rajasthan</span>
        <span className="sb-logo__tag">CMS</span>
      </div>
    </div>
  );
}
