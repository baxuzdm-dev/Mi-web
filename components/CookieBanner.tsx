"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mundocreadores-cookies");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("mundocreadores-cookies", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("mundocreadores-cookies", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0d0d14] border-t border-white/10 animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/70 text-center sm:text-left">
          Usamos cookies para mejorar tu experiencia en{" "}
          <span className="text-white font-medium">Mundo Creadores</span>.{" "}
          <a href="/privacy" className="text-violet-400 hover:underline">
            Mas informacion
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={reject}>
            Rechazar
          </Button>
          <Button variant="gradient" size="sm" onClick={accept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
