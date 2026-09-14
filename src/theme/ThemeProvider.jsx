import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "salam-theme";
const THEMES = { dark: "salam-dark", light: "salam-light" };

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {}, setTheme: () => {} });

/** Read the visitor's stored choice, falling back to their OS preference. */
const readInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* private mode — fall through to the OS preference */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", THEMES[theme]);
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode — the choice simply doesn't persist */
    }
  }, [theme]);

  // Follow the OS only while the visitor hasn't picked a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;
    const onChange = (e) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* unreadable storage means no stored choice to respect */
      }
      setThemeState(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next) => setThemeState(next === "light" ? "light" : "dark"), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
