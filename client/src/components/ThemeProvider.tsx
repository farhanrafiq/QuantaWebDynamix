import { createContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (_theme: string) => {},
});

export const ThemeProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  // Only use state for SSR compatibility
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};
