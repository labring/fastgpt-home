"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  attribute?: "class";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme | ((theme: Theme) => Theme)) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  themes: Theme[];
};

const STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(defaultTheme: Theme): Theme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : defaultTheme;
}

function subscribeToSystemTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const media = window.matchMedia(MEDIA_QUERY);
  media.addEventListener("change", onStoreChange);

  return () => media.removeEventListener("change", onStoreChange);
}

function applyTheme(theme: Theme, enableSystem: boolean, disableTransitionOnChange: boolean) {
  const resolvedTheme = theme === "system" && enableSystem ? getSystemTheme() : theme === "dark" ? "dark" : "light";
  const root = document.documentElement;
  let style: HTMLStyleElement | null = null;

  if (disableTransitionOnChange) {
    style = document.createElement("style");
    style.appendChild(
      document.createTextNode("*{transition:none!important}*::before{transition:none!important}*::after{transition:none!important}")
    );
    document.head.appendChild(style);
  }

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;

  if (style) {
    window.getComputedStyle(document.body);
    window.setTimeout(() => style?.remove(), 1);
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false
}: ThemeProviderProps) {
  const systemTheme = useSyncExternalStore<ResolvedTheme>(
    subscribeToSystemTheme,
    getSystemTheme,
    () => "light"
  );
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("fastgpt-theme-change", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("fastgpt-theme-change", onStoreChange);
      };
    },
    () => getStoredTheme(defaultTheme),
    () => defaultTheme
  );
  const resolvedTheme: ResolvedTheme = theme === "system" && enableSystem
    ? systemTheme
    : theme === "dark"
      ? "dark"
      : "light";

  useEffect(() => {
    applyTheme(theme, enableSystem, disableTransitionOnChange);
  }, [disableTransitionOnChange, enableSystem, systemTheme, theme]);

  const setTheme = useCallback((nextTheme: Theme | ((theme: Theme) => Theme)) => {
    const currentTheme = getStoredTheme(defaultTheme);
    const normalizedTheme = typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

    window.localStorage.setItem(STORAGE_KEY, normalizedTheme);
    window.dispatchEvent(new Event("fastgpt-theme-change"));
  }, [defaultTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"]
    }),
    [enableSystem, resolvedTheme, setTheme, systemTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: "system" as Theme,
      setTheme: () => undefined,
      resolvedTheme: "light" as ResolvedTheme,
      systemTheme: "light" as ResolvedTheme,
      themes: ["light", "dark", "system"] as Theme[]
    };
  }

  return context;
}
