import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { COLORS } from "@/lib/theme";
import { getDict, DEFAULT_LANGUAGE } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MessagesInbox() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || DEFAULT_LANGUAGE;
  const t = getDict(lang);

  const uid = session.user.id;

  const { data: messages } = await supabase
    .from("messages")
    .select("*, listings(title, id)")
    .or(`sender_id.eq.${uid},receiver_id.eq.${uid}`)
    .order("created_at", { ascending: false });

  // group into conversations by listing_id + other participant
  const conversations = new Map();
  for (const m of messages || []) {
    const otherId = m.sender_id === uid ? m.receiver_id : m.sender_id;
    const key = `${m.listing_id}-${otherId}`;
    if (!conversations.has(key)) {
      conversations.set(key, {
        listingId: m.listing_id,
        listingTitle: m.listings?.title || t.listingFallback,
        otherId,
        lastMessage: m.body,
        lastAt: m.created_at,
      });
    }
  }

  const list = Array.from(conversations.values());

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4" style={{ color: COLORS.coffeeDark }}>{t.messagesTitle}</h1>

        {list.length === 0 && (
          <p className="text-sm text-center py-10" style={{ color: COLORS.inkSoft }}>{t.noConversations}</p>
        )}

        <div className="flex flex-col gap-2">
          {list.map((c) => (
            <a
              key={`${c.listingId}-${c.otherId}`}
              href={`/messages/${c.listingId}/${c.otherId}`}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}
            >
              <div className="p-2 rounded-full" style={{ background: COLORS.parchmentDark }}>
                <MessageCircle size={18} style={{ color: COLORS.coffeeDark }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{c.listingTitle}</p>
                <p className="text-xs truncate" style={{ color: COLORS.inkSoft }}>{c.lastMessage}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
