"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, SPANISH_LOCALES, getTranslator } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function useLang() {
  return useContext(LangContext);
}

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("mundocreadores-lang") as Lang | null;
    if (saved === "en" || saved === "es") return saved;
    const browserLang = navigator.language ?? "";
    if (SPANISH_LOCALES.has(browserLang) || browserLang.startsWith("es")) return "es";
  } catch {
    // SSR guard
  }
  return "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem("mundocreadores-lang", l); } catch { /* ignore */ }
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: getTranslator(lang) }}>
      {children}
    </LangContext.Provider>
  );
}
