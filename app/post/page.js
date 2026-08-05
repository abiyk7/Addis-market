"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { decideListingStatus } from "@/lib/moderation";
import { COLORS, CATEGORIES } from "@/lib/theme";

const inputStyle = {
  background: "#FBF8EF",
  border: `1px solid ${COLORS.parchmentDark}`,
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 14,
  color: COLORS.ink,
  width: "100%",
};

export default function PostPage() {
  const supabase = createClient();
  const [session, setSession] = useState(undefined);
  const [form, setForm] = useState({ title: "", category_id: "cars", price: "", currency: "ብር", location: "", description: "", contact: "" });
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) window.location.href = "/login";
    });
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.title.trim() && form.price.trim() && form.location.trim() && form.contact.trim();

  const submit = async () => {
    if (!session) return;
    setSubmitting(true);
    setMsg("");

    const urls = [];
    for (const file of photos) {
      const path = `${session.user.id}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("listing-photos").upload(path, file);
      if (!upErr) {
        const { data } = supabase.storage.from("listing-photos").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }

    const { status } = await decideListingStatus(supabase, session.user.id, form);

    const { error } = await supabase.from("listings").insert({
      user_id: session.user.id,
      category_id: form.category_id,
      title: form.title,
      description: form.description,
      price: form.price,
      currency: form.currency,
      location: form.location,
      contact: form.contact,
      photo_urls: urls,
      status,
    });

    setSubmitting(false);
    if (error) return setMsg("ስህተት ተፈጥሯል፡ " + error.message);

    if (status === "pending") {
      setMsg("ማስታወቂያዎ ተልኳል እና ከመታተሙ በፊት በአጭር ጊዜ ውስጥ ይገመገማል።");
    } else {
      window.location.href = "/";
    }
  };

  if (session === undefined) return null;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <div className="px-5 py-4 font-bold" style={{ background: COLORS.coffee, color: COLORS.parchment }}>አዲስ ማስታወቂያ ይለጥፉ</div>
        <div className="p-5 flex flex-col gap-3">
          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ርዕስ
            <input value={form.title} onChange={set("title")} style={{ ...inputStyle, marginTop: 4 }} placeholder="ለምሳሌ: ቶዮታ ቪትዝ 2018" />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ምድብ
            <select value={form.category_id} onChange={set("category_id")} style={{ ...inputStyle, marginTop: 4 }}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.amh} · {c.en}</option>)}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ዋጋ
              <input value={form.price} onChange={set("price")} style={{ ...inputStyle, marginTop: 4 }} placeholder="15,000" />
            </label>
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ገንዘብ
              <select value={form.currency} onChange={set("currency")} style={{ ...inputStyle, marginTop: 4 }}>
                {["ብር", "$", "SEK", "EUR", "CAD", "ብር/ወር", "በስምምነት"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ቦታ (ከተማ, ሀገር)
            <input value={form.location} onChange={set("location")} style={{ ...inputStyle, marginTop: 4 }} placeholder="አዲስ አበባ, ኢትዮጵያ" />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>መግለጫ
            <textarea value={form.description} onChange={set("description")} style={{ ...inputStyle, marginTop: 4, minHeight: 80 }} placeholder="ስለ እቃው ዝርዝር መረጃ ይስጡ..." />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ስልክ ቁጥር ወይም ቴሌግራም
            <input value={form.contact} onChange={set("contact")} style={{ ...inputStyle, marginTop: 4 }} placeholder="+251911223344" />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ፎቶዎች (አማራጭ)
            <input type="file" accept="image/*" multiple onChange={(e) => setPhotos(Array.from(e.target.files || []))} style={{ marginTop: 4 }} />
          </label>

          {msg && <p className="text-sm" style={{ color: COLORS.forest }}>{msg}</p>}

          <button
            disabled={!valid || submitting}
            onClick={submit}
            className="mt-2 py-2.5 rounded-full font-semibold text-sm disabled:opacity-40"
            style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
          >
            {submitting ? "በመላክ ላይ..." : "ለጥፍ"}
          </button>
        </div>
      </div>
    </div>
  );
}
