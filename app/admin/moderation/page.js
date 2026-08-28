import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ModerationQueue from "@/components/ModerationQueue";
import { COLORS } from "@/lib/theme";
import { getDict, DEFAULT_LANGUAGE } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single();
  if (!profile?.is_admin) redirect("/");

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || DEFAULT_LANGUAGE;
  const t = getDict(lang);

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .in("status", ["pending", "flagged"])
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-1" style={{ color: COLORS.coffeeDark }}>{t.moderationQueueTitle}</h1>
        <p className="text-sm mb-5" style={{ color: COLORS.inkSoft }}>
          {t.moderationQueueDesc}
        </p>
        <ModerationQueue initialListings={listings || []} />
      </div>
    </div>
  );
}
