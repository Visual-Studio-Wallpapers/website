import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Layout.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/desktop', label: 'Desktop' },
  { to: '/phone', label: 'Phone' },
  { to: '/watch', label: 'Watch' },
] as const;

function Layout() {
  const { themeName, theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isVsPurple = themeName === 'vs_purple';
  const switchLabel = isVsPurple ? 'Switch to VS Code Blue' : 'Switch to VS Purple';
  const toggleIcon = isVsPurple
    ? `${import.meta.env.BASE_URL}icons/visualstudiocode.png`
    : `${import.meta.env.BASE_URL}icons/visualstudio.png`;
  const toggleIconAlt = isVsPurple ? 'VS Code icon' : 'Visual Studio icon';

  return (
    <>
      <Helmet>
        <title>Visual Studio Wallpapers</title>
      </Helmet>

      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={switchLabel}
        >
          <img src={toggleIcon} alt={toggleIconAlt} />
          <span className={styles.toggleText}>{switchLabel}</span>
        </button>
      </nav>

      <header
        className={styles.header}
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}${theme.headerBg}')`,
        }}
      >
        <div className={styles.headerContent}>
          <h1>Visual Studio Wallpapers</h1>
          <p>Beautiful wallpapers for your Desktop, Phone, and Watch</p>
        </div>
      </header>

      <main id="main-content" className={styles.container}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerContent}>
          &copy; {new Date().getFullYear()} Visual Studio Wallpapers Community by{' '}
          <a
            href="https://bsky.app/profile/james.montemagno.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            aria-label="Visit James Montemagno's Bluesky profile (opens in new window)"
          >
            James
          </a>
          ,{' '}
          <a
            href="https://bsky.app/profile/scott.hanselman.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            aria-label="Visit Scott Hanselman's Bluesky profile (opens in new window)"
          >
            Scott
          </a>
          , and{' '}
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            aria-label="Learn more about GitHub Copilot (opens in new window)"
          >
            GitHub Copilot
          </a>
          . All rights reserved. Official wallpapers &copy; Microsoft{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}

export default Layout;
