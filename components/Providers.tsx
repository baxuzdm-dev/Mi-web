"use client";

import { SessionProvider } from "next-auth/react";
import { LangProvider } from "@/contexts/LangContext";
import { AppProvider } from "@/contexts/AppContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LangProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </LangProvider>
    </SessionProvider>
  );
}
