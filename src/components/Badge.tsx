const Badge: React.FC = (): React.JSX.Element => {
  const BADGE_URL =
    'https://img.shields.io/endpoint?url=https://cloudflare-pages-badges.taneli-makihannu.workers.dev/?projectName=calculator';

  return (
    <div className="badge">
      <img src={BADGE_URL} alt="cloudflare badge" />
    </div>
  );
};

export default Badge;
