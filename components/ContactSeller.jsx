"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";
import { Phone, Send, Mail, MessageCircle } from "lucide-react";

export default function ContactSeller({ listing, sellerEmail }) {
  const supabase = createClient();
  const [session, setSession] = useState(undefined);
  const isPhone = /^\+?[0-9\s-]{6,}$/.test(listing.contact || "");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {listing.show_phone && isPhone && (
        <a
          href={`tel:${listing.contact}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
          style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
        >
          <Phone size={16} /> ደውል
        </a>
      )}

      {(!listing.show_phone || !isPhone) && !isPhone && (
        <a
          href={`https://t.me/${(listing.contact || "").replace("@", "")}`}
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
          style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
        >
          <Send size={16} /> በቴሌግራም ያግኙ
        </a>
      )}

      {sellerEmail && (
        <a
          href={`mailto:${sellerEmail}?subject=${encodeURIComponent("Re: " + listing.title)}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
          style={{ background: COLORS.parchmentDark, color: COLORS.coffeeDark }}
        >
          <Mail size={16} /> በኢሜይል ያግኙ
        </a>
      )}

      {session && (
        <a
          href={`/messages/${listing.id}/${listing.user_id}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
          style={{ background: COLORS.forest, color: COLORS.parchment }}
        >
          <MessageCircle size={16} /> በመተግበሪያው ውስጥ መልእክት ላክ
        </a>
      )}
    </div>
  );
}
