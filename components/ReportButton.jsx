"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";
import { Flag } from "lucide-react";

const REASONS = ["አታላይ / Scam", "የተሳሳተ ዋጋ / Wrong price", "ደጋግሞ የተለጠፈ / Duplicate", "ተገቢ ያልሆነ / Inappropriate"];

export default function ReportButton({ listingId }) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return (window.location.href = "/login");
    await supabase.from("reports").insert({ listing_id: listingId, reporter_id: session.user.id, reason });
    setSent(true);
  };

  if (sent) return <p className="text-xs mt-3" style={{ color: COLORS.forest }}>ሪፖርትዎ ደርሶናል፣ እናመሰግናለን።</p>;

  return (
    <div className="mt-3">
      {!open ? (
        <button onClick={() => setOpen(true)} className="flex items-center gap-1 text-xs font-semibold" style={{ color: COLORS.rust }}>
          <Flag size={13} /> ይህን ማስታወቂያ ሪፖርት ያድርጉ
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 rounded-xl" style={{ background: COLORS.parchment, border: `1px solid ${COLORS.parchmentDark}` }}>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="text-sm p-2 rounded-lg" style={{ border: `1px solid ${COLORS.parchmentDark}` }}>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <button onClick={submit} className="text-sm font-semibold py-2 rounded-full" style={{ background: COLORS.rust, color: COLORS.parchment }}>
            ሪፖርት ላክ
          </button>
        </div>
      )}
    </div>
  );
}
