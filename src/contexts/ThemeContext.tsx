import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  bgEnd: string;
  headerBg: string;
  cardBorder: string;
  cardBorderHover: string;
  primaryOverlay: string;
  primaryShadow: string;
  primaryShadowHover: string;
  archiveBorder: string;
  archiveHoverBg: string;
}

export const themes = {
  vs_purple: {
    primary: '#68217a',
    secondary: '#8b2da2',
    background: '#f0eaf3',
    bgEnd: '#ddd5e8',
    headerBg: 'wallpapers/desktop/1920x1080/009.jpg',
    cardBorder: 'rgba(104, 33, 122, 0.08)',
    cardBorderHover: 'rgba(104, 33, 122, 0.18)',
    primaryOverlay: 'rgba(104, 33, 122, 0.85)',
    primaryShadow: 'rgba(104, 33, 122, 0.3)',
    primaryShadowHover: 'rgba(104, 33, 122, 0.4)',
    archiveBorder: 'rgba(104, 33, 122, 0.2)',
    archiveHoverBg: 'rgba(104, 33, 122, 0.05)',
  },
  vs_blue: {
    primary: '#005a9e',
    secondary: '#007acc',
    background: '#e8f0f8',
    bgEnd: '#d0dff0',
    headerBg: 'wallpapers/desktop/1920x1080/011.jpg',
    cardBorder: 'rgba(0, 90, 158, 0.10)',
    cardBorderHover: 'rgba(0, 90, 158, 0.22)',
    primaryOverlay: 'rgba(0, 60, 120, 0.88)',
    primaryShadow: 'rgba(0, 90, 158, 0.35)',
    primaryShadowHover: 'rgba(0, 90, 158, 0.5)',
    archiveBorder: 'rgba(0, 90, 158, 0.25)',
    archiveHoverBg: 'rgba(0, 90, 158, 0.08)',
  },
} as const;

export type ThemeName = keyof typeof themes;

interface ThemeContextValue {
  themeName: ThemeName;
  theme: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function isThemeName(value: string): value is ThemeName {
  return value === 'vs_purple' || value === 'vs_blue';
}

function applyCustomProperties(theme: ThemeColors) {
  const root = document.documentElement;
  // Both themes are light-mode; prevent OS dark-mode from overriding text colors
  root.setAttribute('data-color-mode', 'light');
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--bg-end', theme.bgEnd);
  root.style.setProperty('--card-border', theme.cardBorder);
  root.style.setProperty('--card-border-hover', theme.cardBorderHover);
  root.style.setProperty('--primary-overlay', theme.primaryOverlay);
  root.style.setProperty('--primary-shadow', theme.primaryShadow);
  root.style.setProperty('--primary-shadow-hover', theme.primaryShadowHover);
  root.style.setProperty('--archive-border', theme.archiveBorder);
  root.style.setProperty('--archive-hover-bg', theme.archiveHoverBg);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const stored = localStorage.getItem('theme');
    return stored && isThemeName(stored) ? stored : 'vs_purple';
  });

  const theme = themes[themeName];

  useEffect(() => {
    applyCustomProperties(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeName((prev) => {
      const next: ThemeName = prev === 'vs_purple' ? 'vs_blue' : 'vs_purple';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeName, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
