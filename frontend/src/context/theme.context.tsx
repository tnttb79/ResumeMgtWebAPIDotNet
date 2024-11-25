import React, { createContext, useState, useContext } from "react";

interface IThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemContext = createContext<IThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemContext);

type Props = { children: React.ReactNode };
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemContext.Provider>
  );
};

export default ThemeProvider;
