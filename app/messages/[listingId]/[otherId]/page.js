"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/theme";
import { Send } from "lucide-react";

export default function ThreadPage({ params }) {
  const { listingId, otherId } = params;
  const supabase = createClient();
  const [session, setSession] = useState(undefined);
  const [listing, setListing] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (!data.session) return (window.location.href = "/login");

      const { data: l } = await supabase.from("listings").select("id, title").eq("id", listingId).single();
      setListing(l);

      await loadMessages(data.session.user.id);
    });

    const channel = supabase
      .channel(`messages-${listingId}-${otherId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const m = payload.new;
        if (m.listing_id === listingId && (m.sender_id === otherId || m.receiver_id === otherId)) {
          setMessages((prev) => [...prev, m]);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [listingId, otherId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async (myId) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("listing_id", listingId)
      .or(`and(sender_id.eq.${myId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${myId})`)
      .order("created_at", { ascending: true });
    setMessages(data || []);
  };

  const send = async () => {
    if (!text.trim() || !session) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      listing_id: listingId,
      sender_id: session.user.id,
      receiver_id: otherId,
      body: text.trim(),
    });
    setSending(false);
    if (!error) {
      setText("");
      loadMessages(session.user.id);
    }
  };

  if (session === undefined) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: COLORS.parchment }}>
      <div className="px-4 py-3 sticky top-0" style={{ background: COLORS.coffee, color: COLORS.parchment }}>
        <a href={`/listing/${listingId}`} className="text-xs opacity-80">← ወደ ማስታወቂያ ተመለስ</a>
        <p className="font-bold text-sm mt-0.5">{listing?.title || "ውይይት"}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 max-w-lg w-full mx-auto">
        {messages.length === 0 && (
          <p className="text-center text-sm mt-8" style={{ color: COLORS.inkSoft }}>ገና ምንም መልእክት የለም። የመጀመሪያውን ይላኩ።</p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === session.user.id;
          return (
            <div
              key={m.id}
              className="max-w-[75%] px-3 py-2 rounded-2xl text-sm"
              style={{
                alignSelf: mine ? "flex-end" : "flex-start",
                background: mine ? COLORS.gold : COLORS.card,
                color: mine ? COLORS.coffeeDark : COLORS.ink,
                border: mine ? "none" : `1px solid ${COLORS.parchmentDark}`,
              }}
            >
              {m.body}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 flex gap-2 max-w-lg w-full mx-auto sticky bottom-0" style={{ background: COLORS.parchment, borderTop: `1px solid ${COLORS.parchmentDark}` }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="መልእክት ይጻፉ..."
          className="flex-1 px-3 py-2.5 rounded-full text-sm"
          style={{ border: `1px solid ${COLORS.parchmentDark}`, background: COLORS.card }}
        />
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="p-2.5 rounded-full disabled:opacity-40"
          style={{ background: COLORS.forest, color: COLORS.parchment }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
