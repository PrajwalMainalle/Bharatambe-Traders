import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // themeMode can be 'auto', 'light', or 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme-mode") || "auto";
  });

  const [theme, setTheme] = useState("dark"); // active resolved theme: 'light' or 'dark'

  useEffect(() => {
    const calculateTheme = () => {
      if (themeMode === "auto") {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18 ? "light" : "dark";
      }
      return themeMode;
    };

    const activeTheme = calculateTheme();
    setTheme(activeTheme);

    // Apply active theme classes to document element
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", activeTheme);
  }, [themeMode]);

  // Set up automated checking for boundary crossing (6 AM & 6 PM)
  useEffect(() => {
    const interval = setInterval(() => {
      if (themeMode === "auto") {
        const hour = new Date().getHours();
        const expectedTheme = hour >= 6 && hour < 18 ? "light" : "dark";
        if (theme !== expectedTheme) {
          setTheme(expectedTheme);
          if (expectedTheme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
          }
          localStorage.setItem("theme", expectedTheme);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [themeMode, theme]);

  const selectThemeMode = (mode) => {
    if (mode === "light" || mode === "dark" || mode === "auto") {
      setThemeMode(mode);
      localStorage.setItem("theme-mode", mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, theme, selectThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
