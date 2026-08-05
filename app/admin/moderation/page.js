import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ModerationQueue from "@/components/ModerationQueue";
import { COLORS } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single();
  if (!profile?.is_admin) redirect("/");

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .in("status", ["pending", "flagged"])
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-1" style={{ color: COLORS.coffeeDark }}>የግምገማ ወረፋ · Moderation queue</h1>
        <p className="text-sm mb-5" style={{ color: COLORS.inkSoft }}>
          እነዚህ ማስታወቂያዎች ቁልፍ ቃላት ወይም የተጠቃሚ ሪፖርቶች ስላስነሱ ከመታተማቸው በፊት ግምገማ ያስፈልጋቸዋል።
        </p>
        <ModerationQueue initialListings={listings || []} />
      </div>
    </div>
  );
}
