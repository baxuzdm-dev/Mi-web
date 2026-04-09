"use client";

import { useState, useRef } from "react";
import { X, Upload, ShieldCheck, Loader2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useLang } from "@/contexts/LangContext";

interface Props {
  profileId: string;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function VerificationModal({ profileId, onClose, onSubmitted }: Props) {
  const { t } = useLang();
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [docData, setDocData] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setDocPreview(result);
      setDocData(result);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!docData) { setError("Please upload your ID photo first."); return; }
    setSubmitting(true);
    setError("");

    const res = await fetch(`/api/creators/${profileId}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docData }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Failed to submit");
      return;
    }

    setDone(true);
    setTimeout(() => { onSubmitted(); onClose(); }, 2500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f17] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="font-semibold text-white">{t("verify.title")}</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {done ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{t("verify.success")}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">{t("verify.sub")}</p>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300">{t("verify.warning")}</p>
            </div>

            {/* Upload area */}
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                docPreview
                  ? "border-violet-500/40 bg-violet-500/5"
                  : "border-white/15 hover:border-white/30 hover:bg-white/3"
              }`}
            >
              {docPreview ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={docPreview}
                    alt="ID preview"
                    className="max-h-40 mx-auto rounded-lg object-contain"
                  />
                  <p className="text-xs text-violet-400">Click to change</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-white/30 mx-auto" />
                  <p className="text-sm text-white/50">{t("verify.uploadId")}</p>
                  <p className="text-xs text-white/30">JPG, PNG, PDF — max 5MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFile} />
            </div>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <Button variant="ghost" className="flex-1" onClick={onClose}>{t("verify.cancel")}</Button>
              <Button
                variant="gradient"
                className="flex-1 gap-2"
                disabled={submitting || !docData}
                onClick={handleSubmit}
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {submitting ? t("verify.submitting") : t("verify.submit")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
