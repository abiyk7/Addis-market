import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { COLORS } from "@/lib/theme";
import { deleteListing, toggleVerifiedSeller, toggleListingStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: COLORS.parchment }}>
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">የተከለከለ · Access denied</h1>
          <p className="text-sm mb-4" style={{ color: COLORS.inkSoft }}>ይህ ገጽ ለአስተዳዳሪዎች ብቻ ነው።</p>
          <a href="/" className="underline text-sm">ወደ መነሻ ገጽ ተመለስ · Back home</a>
        </div>
      </div>
    );
  }

  const admin = createAdminClient();

  const { data: listings } = await admin
    .from("listings")
    .select("*, profiles(id, is_verified_seller, is_admin)")
    .order("created_at", { ascending: false });

  const { data: profiles } = await admin
    .from("profiles")
    .select("id, is_verified_seller, is_admin");

  const { data: usersRes } = await admin.auth.admin.listUsers();
  const users = (usersRes?.users || []).map((u) => {
    const p = profiles?.find((pr) => pr.id === u.id);
    return {
      id: u.id,
      email: u.email,
      is_verified_seller: p?.is_verified_seller || false,
      is_admin: p?.is_admin || false,
    };
  });

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: COLORS.parchment }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.coffeeDark }}>የአስተዳዳሪ ገጽ · Admin</h1>

        <h2 className="text-lg font-bold mb-3">ማስታወቂያዎች · Listings ({listings?.length || 0})</h2>
        <div className="space-y-2 mb-10">
          {listings?.map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{l.title}</p>
                <p className="text-xs" style={{ color: COLORS.inkSoft }}>{l.status} · {l.location}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <form action={toggleListingStatus}>
                  <input type="hidden" name="id" value={l.id} />
                  <input type="hidden" name="current" value={l.status} />
                  <button className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: COLORS.forest, color: COLORS.parchment }}>
                    {l.status === "active" ? "አቁም · Deactivate" : "አንቃ · Activate"}
                  </button>
                </form>
                <form action={deleteListing}>
                  <input type="hidden" name="id" value={l.id} />
                  <button className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: COLORS.rust, color: COLORS.parchment }}>
                    ሰርዝ · Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-3">ተጠቃሚዎች · Users ({users.length})</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
              <p className="text-sm truncate">{u.email || u.id}</p>
              <form action={toggleVerifiedSeller}>
                <input type="hidden" name="id" value={u.id} />
                <input type="hidden" name="current" value={u.is_verified_seller ? "true" : "false"} />
                <button className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: u.is_verified_seller ? COLORS.forest : COLORS.gold, color: u.is_verified_seller ? COLORS.parchment : COLORS.coffeeDark }}>
                  {u.is_verified_seller ? "የተረጋገጠ ✓" : "አረጋግጥ · Verify"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
