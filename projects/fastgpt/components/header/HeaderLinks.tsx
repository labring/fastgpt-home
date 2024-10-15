"use client";
import PhMoonFill from "@/components/icons/moon";
import PhSunBold from "@/components/icons/sun";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeaderLinks = () => {
  const links = siteConfig.headerLinks;
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  return (
    <div className="flex items-start gap-4 md:flex-row flex-col w-full">
      {links.map((link, index) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener norefferer nofollow"
          className={` flex items-center justify-center gap-4 hover:bg-white/10 p-1 rounded-md`}
        >
          {link.icon &&
            React.createElement(link.icon, { className: "text-2xl" })}
          <div className="md:hidden font-medium">{link.name}</div>
        </Link>
      ))}
      <div onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="flex gap-4 font-medium p-1 hover:bg-white/10 cursor-pointer rounded-md">
        {theme === "light" && isClient ? <PhMoonFill /> : <PhSunBold />}
        <div className="md:hidden">
          {theme === "light" && isClient ? "Night Mode" : "Light Mode"}
        </div>
      </div>
    </div>
  );
};
export default HeaderLinks;
