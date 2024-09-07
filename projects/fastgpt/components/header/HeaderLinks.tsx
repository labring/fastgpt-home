import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";

const HeaderLinks = () => {
  const links = siteConfig.headerLinks;

  return (
    <div className="flex items-start gap-6 md:flex-row flex-col">
      {links.map((link, index) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener norefferer nofollow"
          className={` flex md:max-w-[24px] items-center justify-center gap-4`}
        >
          {link.icon &&
            React.createElement(link.icon, { className: "text-xl" })}
          <div className="md:hidden font-medium">{link.name}</div>
        </Link>
      ))}
    </div>
  );
};
export default HeaderLinks;
