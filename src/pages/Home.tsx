import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';

const base = import.meta.env.BASE_URL;

const devices = [
  {
    to: '/desktop',
    image: `${base}wallpapers/desktop/thumbnails/022.jpg`,
    imageAlt: 'Preview of desktop wallpapers collection',
    ariaLabel: 'Browse desktop wallpapers',
    title: 'Desktop Wallpapers',
    icon: '🖥️',
    hint: '4K, Ultrawide & more',
  },
  {
    to: '/phone',
    image: `${base}wallpapers/phone/320x568/023.jpg`,
    imageAlt: 'Preview of phone wallpapers collection',
    ariaLabel: 'Browse phone wallpapers',
    title: 'Phone Wallpapers',
    icon: '📱',
    hint: 'iPhone & Android sizes',
  },
  {
    to: '/watch',
    image: `${base}wallpapers/watch/368x448/024.jpg`,
    imageAlt: 'Preview of watch wallpapers collection',
    ariaLabel: 'Browse watch wallpapers',
    title: 'Watch Wallpapers',
    icon: '⌚',
    hint: 'Apple Watch & more',
  },
] as const;

function Home() {
  return (
    <>
      <Helmet>
        <title>Home - Visual Studio Wallpapers</title>
        <meta property="og:image" content={`${base}wallpapers/desktop/thumbnails/022.jpg`} />
      </Helmet>

      <div className={styles.hero}>
        <h2 id="device-selection-heading">Choose Your Device</h2>
        <p className={styles.heroSubtitle}>Beautiful wallpapers crafted for every screen</p>

        <div
          className={styles.deviceGrid}
          role="list"
          aria-labelledby="device-selection-heading"
        >
          {devices.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className={styles.deviceCard}
              role="listitem"
              aria-label={d.ariaLabel}
            >
              <div className={styles.imageContainer}>
                <img src={d.image} alt={d.imageAlt} />
                <div className={styles.cardOverlay}>
                  <span className={styles.viewBtn}>View Collection →</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3>{d.title}</h3>
                <p className={styles.deviceIcon}>{d.icon}</p>
                <span className={styles.hint} aria-hidden="true">{d.hint}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.archiveLink}>
        <Link to="/archive" aria-label="View community archive wallpapers">
          ✨ Explore the Community Archives
        </Link>
      </div>
    </>
  );
}

export default Home;
