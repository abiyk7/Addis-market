"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { COLORS, CATEGORIES } from "@/lib/theme";
import { Trash2 } from "lucide-react";

const inputStyle = {
  background: "#FBF8EF",
  border: `1px solid ${COLORS.parchmentDark}`,
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 14,
  color: COLORS.ink,
  width: "100%",
};

export default function EditListingPage() {
  const supabase = createClient();
  const { id } = useParams();
  const [session, setSession] = useState(undefined);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (!data.session) { window.location.href = "/login"; return; }

      const { data: listing, error } = await supabase.from("listings").select("*").eq("id", id).single();
      if (error || !listing) { setMsg("ማስታወቂያው አልተገኘም።"); return; }
      if (listing.user_id !== data.session.user.id) { window.location.href = "/"; return; }
      setForm(listing);
    });
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("listings")
      .update({
        title: form.title,
        category_id: form.category_id,
        price: form.price,
        currency: form.currency,
        location: form.location,
        description: form.description,
        contact: form.contact,
      })
      .eq("id", id);
    setSaving(false);
    if (error) return setMsg("ስህተት ተፈጥሯል፡ " + error.message);
    window.location.href = `/listing/${id}`;
  };

  const remove = async () => {
    if (!confirm("እርግጠኛ ነዎት ይህን ማስታወቂያ መሰረዝ ይፈልጋሉ?")) return;
    setSaving(true);
    const { error } = await supabase.from("listings").delete().eq("id", id);
    setSaving(false);
    if (error) return setMsg("ስህተት ተፈጥሯል፡ " + error.message);
    window.location.href = "/";
  };

  if (session === undefined || !form) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.parchment }}>{msg || "በመጫን ላይ..."}</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <div className="px-5 py-4 font-bold" style={{ background: COLORS.coffee, color: COLORS.parchment }}>ማስታወቂያ አርትዕ · Edit ad</div>
        <div className="p-5 flex flex-col gap-3">
          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ርዕስ
            <input value={form.title} onChange={set("title")} style={{ ...inputStyle, marginTop: 4 }} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ምድብ
            <select value={form.category_id} onChange={set("category_id")} style={{ ...inputStyle, marginTop: 4 }}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.amh} · {c.en}</option>)}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ዋጋ
              <input value={form.price} onChange={set("price")} style={{ ...inputStyle, marginTop: 4 }} />
            </label>
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ገንዘብ
              <select value={form.currency} onChange={set("currency")} style={{ ...inputStyle, marginTop: 4 }}>
                {["ብር", "$", "SEK", "EUR", "CAD", "ብር/ወር", "በስምምነት"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ቦታ
            <input value={form.location} onChange={set("location")} style={{ ...inputStyle, marginTop: 4 }} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>መግለጫ
            <textarea value={form.description} onChange={set("description")} style={{ ...inputStyle, marginTop: 4, minHeight: 80 }} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ስልክ ቁጥር ወይም ቴሌግራም
            <input value={form.contact} onChange={set("contact")} style={{ ...inputStyle, marginTop: 4 }} />
          </label>

          {msg && <p className="text-sm" style={{ color: COLORS.rust }}>{msg}</p>}

          <button disabled={saving} onClick={save} className="mt-2 py-2.5 rounded-full font-semibold text-sm disabled:opacity-40" style={{ background: COLORS.gold, color: COLORS.coffeeDark }}>
            {saving ? "በማስቀመጥ ላይ..." : "ለውጦችን አስቀምጥ · Save changes"}
          </button>

          <button disabled={saving} onClick={remove} className="flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm" style={{ background: "transparent", color: COLORS.rust, border: `1px solid ${COLORS.rust}` }}>
            <Trash2 size={15} /> ማስታወቂያ ሰርዝ · Delete ad
          </button>
        </div>
      </div>
    </div>
  );
}
