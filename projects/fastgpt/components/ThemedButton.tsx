"use client";
import PhMoonFill from "@/components/icons/moon";
import PhSunBold from "@/components/icons/sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemedButton() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);
  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="flex gap-4 font-medium">
      {theme === "light" && isClient ? <PhMoonFill /> : <PhSunBold />}
      <div className="md:hidden">
        {theme === "light" && isClient ? "Night Mode" : "Light Mode"}
      </div>
    </div>
  );
}

