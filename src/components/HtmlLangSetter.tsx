"use client";

import { useEffect, useState } from "react";

export default function HtmlLangSetter() {
  const [lang, setLang] = useState("zh");

  useEffect(() => {
    // Get language from URL path
    const path = window.location.pathname;
    if (path.startsWith("/en")) {
      setLang("en");
    } else if (path.startsWith("/ja")) {
      setLang("ja");
    } else {
      setLang("zh");
    }
    
    // Set lang attribute on html element
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
