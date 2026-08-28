"use client";

import { useRouter } from "next/navigation";

export default function LanguageToggle({ lang, label }) {
  const router = useRouter();

  const switchLang = () => {
    const next = lang === "en" ? "am" : "en";
    document.cookie = `lang=${next}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      onClick={switchLang}
      className="text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0"
      style={{ borderColor: "#00000022" }}
    >
      {label}
    </button>
  );
}
