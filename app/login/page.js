"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { decideListingStatus } from "@/lib/moderation";
import { COLORS, CATEGORIES } from "@/lib/theme";
import { getDict, DEFAULT_LANGUAGE } from "@/lib/i18n";

function readLangCookie() {
  if (typeof document === "undefined") return DEFAULT_LANGUAGE;
  const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : DEFAULT_LANGUAGE;
}

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
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    setLang(readLangCookie());
  }, []);

  const t = getDict(lang);

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
          setMsg(t.editNotAllowed);
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
  }, [editId, t.editNotAllowed]);

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
    if (error) return setMsg(t.genericErrorPrefix + error.message);

    if (uploadFailed) {
      setMsg(t.uploadPartialFail);
      return;
    }

    window.location.href = editId ? `/listing/${editId}` : "/";
  };

  if (session === undefined || loadingExisting) return null;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <div className="px-5 py-4 font-bold" style={{ background: COLORS.coffee, color: COLORS.parchment }}>
          {editId ? t.postTitleEdit : t.postTitleNew}
        </div>
        <div className="p-5 flex flex-col gap-3">
          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldTitle}
            <input value={form.title} onChange={set("title")} style={{ ...inputStyle, marginTop: 4 }} placeholder={t.titlePlaceholder} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldCategory}
            <select value={form.category_id} onChange={set("category_id")} style={{ ...inputStyle, marginTop: 4 }}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{lang === "am" ? c.amh : (c.en || c.amh)}</option>)}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldPrice}
              <input value={form.price} onChange={set("price")} style={{ ...inputStyle, marginTop: 4 }} placeholder={t.pricePlaceholder} />
            </label>
            <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldCurrency}
              <select value={form.currency} onChange={set("currency")} style={{ ...inputStyle, marginTop: 4 }}>
                {["ብር", "$", "SEK", "EUR", "CAD", "ብር/ወር", "በስምምነት"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldLocation}
            <input value={form.location} onChange={set("location")} style={{ ...inputStyle, marginTop: 4 }} placeholder={t.locationPlaceholder} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldDescription}
            <textarea value={form.description} onChange={set("description")} style={{ ...inputStyle, marginTop: 4, minHeight: 80 }} placeholder={t.descPlaceholder} />
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldContact}
            <input value={form.contact} onChange={set("contact")} style={{ ...inputStyle, marginTop: 4 }} placeholder={t.contactPlaceholder} />
          </label>

          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.inkSoft }}>
            <input
              type="checkbox"
              checked={form.show_phone}
              onChange={(e) => setForm((f) => ({ ...f, show_phone: e.target.checked }))}
            />
            {t.showPhoneLabel}
          </label>

          <label className="text-sm font-semibold" style={{ color: COLORS.inkSoft }}>{t.fieldPhotos}
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
            {submitting ? t.submittingBtn : editId ? t.saveChangesBtn : t.postBtn}
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
