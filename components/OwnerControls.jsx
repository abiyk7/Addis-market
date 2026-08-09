"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";
import { Pencil, XCircle } from "lucide-react";

export default function OwnerControls({ listingId, status }) {
  const supabase = createClient();
  const [busy, setBusy] = useState(false);
  const [cancelled, setCancelled] = useState(status === "cancelled");

  const cancelListing = async () => {
    if (!confirm("ይህን ማስታወቂያ መሰረዝ ይፈልጋሉ? ይህ ድርጊት ማስታወቂያውን ከገበያ ያነሳል።")) return;
    setBusy(true);
    const { error } = await supabase.from("listings").update({ status: "cancelled" }).eq("id", listingId);
    setBusy(false);
    if (!error) setCancelled(true);
  };

  if (cancelled) {
    return (
      <div className="mt-4 p-3 rounded-xl text-sm text-center" style={{ background: COLORS.parchment, border: `1px solid ${COLORS.parchmentDark}`, color: COLORS.inkSoft }}>
        ይህ ማስታወቂያ ተሰርዟል።
      </div>
    );
  }

  return (
    <div className="mt-4 flex gap-2">
      <a
        href={`/post?edit=${listingId}`}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
        style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
      >
        <Pencil size={16} /> አርትዕ
      </a>
      <button
        onClick={cancelListing}
        disabled={busy}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
        style={{ background: COLORS.rust, color: COLORS.parchment }}
      >
        <XCircle size={16} /> {busy ? "..." : "ሰርዝ"}
      </button>
    </div>
  );
}
