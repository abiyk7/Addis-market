"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function PostForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [session, setSession] = useState(undefined);
  const [form, setForm] = useState({
    title: "", category_id: "cars", price: "", currency: "ብር",
    location: "", description: "", contact: "", show_phone: true,
  });
  const [photos, setPhotos] = useState([]);
  const [existingPhotoUrls, setExistingPhotoUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(!!editId);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (!data.session) return (window.location.href = "/login");

      if (editId) {
        const { data: listing, error } = await supabase
          .from("listings")
          .select("*")
          .eq("id", editId)
          .single();

        if (error || !listing || listing.user_id !== data.session.user.id) {
          setMsg("ይህን ማስታወቂያ የማርትዕ ፈቃድ የለዎትም።");
          setLoadingExisting(false);
          return;
        }

        setForm({
          title: listing.title || "",
          category_id: listing.category_id || "cars",
          price: listing.price || "",
          currency: listing.currency || "ብር",
          location: listing.location || "",
          description: listing.description || "",
          contact: listing.contact || "",
          show_phone: listing.show_phone !== false,
        });
        setExistingPhotoUrls(listing.photo_urls || []);
        setLoadingExisting(false);
      }
    });
  }, [editId]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.title.trim() && form.price.trim() && form.location.trim() && form.contact.trim();

  const submit = async () => {
    if (!session) return;
    setSubmitting(true);
    setMsg("");

    const urls = [...existingPhotoUrls];
    let uploadFailed = false;
    for (const file of photos) {
      const path = `${session.user.id}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("listing-photos").upload(path, file);
      if (!upErr) {
        const { data } = supabase.storage.from("listing-photos").getPublicUrl(path);
        urls.push(data.publicUrl);
      } else {
        uploadFailed = true;
        console.error("Photo upload failed:", upErr.message);
      }
    }

    const payload = {
      category_id: form.category_id,
      title: form.title,
      description: form.description,
      price: form.price,
      currency: form.currency,
      location: form.location,
      contact: form.contact,
      show_phone: form.show_phone,
      photo_urls: urls,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("listings").update(payload).eq("id", editId));
    } else {
      const { status } = await decideListingStatus(supabase, session.user.id, form);
      ({ error } = await supabase.from("listings").insert({
        ...payload,
        user_id: session.user.id,
        status,
      }));
    }

    setSubmitting(false);
    if (error) return setMsg("ስህተት ተፈጥሯል፡ " + error.message);

    if (uploadFailed) {
      setMsg("ማስታወቂያው ተቀምጧል፣ ነገር ግን ፎቶ መስቀል አልተቻለም። እባክዎ በኋላ እንደገና ይሞክሩ።");
      return;
    }

    window.location.href = editId ? `/listing/${editId}` : "/";
  };

  if (session === undefined || loadingExisting) return null;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <div className="px-5 py-4 font-bold" style={{ background: COLORS.coffee, color: COLORS.parchment }}>
          {editId ? "ማስታወቂያ ያርትዑ" : "አዲስ ማስታወቂያ ይለጥፉ"}
        </div>
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

          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.inkSoft }}>
            <input
              type="checkbox"
              checked={form.show_phone}
              onChange={(e) => setForm((f) => ({ ...f, show_phone: e.target.checked }))}
            />
            ስልክ ቁጥሬን ለገዢዎች አሳይ (ካልተመረጠ፣ በኢሜይል ብቻ ያገኙኛል)
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>ፎቶዎች (አማራጭ)
            <input type="file" accept="image/*" multiple onChange={(e) => setPhotos(Array.from(e.target.files || []))} style={{ marginTop: 4 }} />
          </label>

          {existingPhotoUrls.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {existingPhotoUrls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
              ))}
            </div>
          )}

          {msg && <p className="text-sm" style={{ color: COLORS.forest }}>{msg}</p>}

          <button
            disabled={!valid || submitting}
            onClick={submit}
            className="mt-2 py-2.5 rounded-full font-semibold text-sm disabled:opacity-40"
            style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
          >
            {submitting ? "በመላክ ላይ..." : editId ? "ለውጦችን አስቀምጥ" : "ለጥፍ"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={null}>
      <PostForm />
    </Suspense>
  );
}
