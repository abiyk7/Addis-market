"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS, catById } from "@/lib/theme";
import { Check, X, ExternalLink } from "lucide-react";

export default function ModerationQueue({ initialListings }) {
  const supabase = createClient();
  const [listings, setListings] = useState(initialListings);

  const act = async (id, status) => {
    await supabase.from("listings").update({ status }).eq("id", id);
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  if (listings.length === 0) {
    return <p style={{ color: COLORS.inkSoft }}>ምንም ግምገማ የሚያስፈልገው ማስታወቂያ የለም። ✅</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {listings.map((l) => (
        <div key={l.id} className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: l.status === "flagged" ? COLORS.rust : COLORS.goldDark, color: COLORS.parchment }}>
                {l.status === "flagged" ? "ተጠቅሷል · flagged" : "በመጠባበቅ · pending"}
              </span>
              <span className="text-xs" style={{ color: COLORS.inkSoft }}>{catById(l.category_id).amh}</span>
              {l.report_count > 0 && <span className="text-xs font-semibold" style={{ color: COLORS.rust }}>{l.report_count} ሪፖርቶች</span>}
            </div>
            <p className="font-bold mt-1">{l.title}</p>
            <p className="text-sm" style={{ color: COLORS.inkSoft }}>{l.price} {l.currency} · {l.location}</p>
          </div>
          <div className="flex gap-2">
            <a href={`/listing/${l.id}`} target="_blank" rel="noreferrer" className="p-2 rounded-full" style={{ background: COLORS.parchmentDark }}>
              <ExternalLink size={16} />
            </a>
            <button onClick={() => act(l.id, "active")} className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold" style={{ background: COLORS.forest, color: COLORS.parchment }}>
              <Check size={16} /> ፍቀድ
            </button>
            <button onClick={() => act(l.id, "removed")} className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold" style={{ background: COLORS.rust, color: COLORS.parchment }}>
              <X size={16} /> አስወግድ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
