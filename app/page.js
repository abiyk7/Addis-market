import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/ListingCard";
import AuthStatus from "@/components/AuthStatus";
import { COLORS, CATEGORIES } from "@/lib/theme";
import { Search, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const q = searchParams?.q || "";
  const cat = searchParams?.cat || "all";
  const supabase = createClient();

  let query = supabase
    .from("listings")
    .select("*, profiles(is_verified_seller)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (cat !== "all") query = query.eq("category_id", cat);
  if (q) query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%,description.ilike.%${q}%`);

  const { data: listings, error } = await query;

  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ background: "#FFFFFF", color: COLORS.coffeeDark }} className="sticky top-0 z-30 shadow-md">
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-56 sm:w-80 pointer-events-none" style={{ zIndex: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/21203d04-8d7b-4002-89c4-9e6f8440d80b_medium.webp" alt="" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, #FFFFFF 100%)" }} />
          </div>

          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap relative" style={{ zIndex: 1 }}>
            <a href="/" className="flex items-baseline gap-2 shrink-0">
              <span className="text-2xl font-bold" style={{ color: COLORS.coffee }}>አዲስ ገበያ</span>
              <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "'Fraunces', serif", color: COLORS.inkSoft }}>Addis Market</span>
            </a>

            <form action="/" method="get" className="flex-1 min-w-[180px] relative">
              {cat !== "all" && <input type="hidden" name="cat" value={cat} />}
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" style={{ color: COLORS.coffeeDark }} />
              <input
                name="q"
                defaultValue={q}
                placeholder="ምን ይፈልጋሉ? · Search"
                className="w-full pl-9 pr-3 py-2 rounded-full text-sm outline-none border-2 border-transparent focus:border-current"
                style={{ background: COLORS.parchment, color: COLORS.ink }}
              />
            </form>

            <AuthStatus />
          </div>
        </div>
      </header>
      <div className="tibeb-divider" />

      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/women-street-sellers.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.8) 65%, #FFFFFF 100%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-6 text-center" style={{ zIndex: 1 }}>
          <h1 className="text-3xl sm:text-4xl font-bold leading-snug" style={{ color: COLORS.coffeeDark }}>
            የኢትዮጵያውያን የግዢና ሽያጭ ገበያ
          </h1>
          <p className="mt-2 text-sm sm:text-base max-w-xl mx-auto" style={{ color: COLORS.inkSoft }}>
            ለኢትዮጵያ እና ለውጪ አገር ኢትዮጵያውያን የተዘጋጀ ነፃ የግዢና ሽያጭ መድረክ
          </p>

          <a
            href="/post"
            className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-full font-bold text-base"
            style={{ background: COLORS.gold, color: COLORS.coffeeDark, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
          >
            <span style={{ fontSize: 22, lineHeight: 1 }}>+</span> ማስታወቂያ ይለጥፉ · Post an ad
          </a>

          <div className="flex justify-center gap-3 mt-5 flex-wrap text-xs font-semibold">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: COLORS.forest, color: COLORS.parchment }}>
              <ShieldCheck size={14} /> ደህንነቱ የተጠበቀ
            </span>
            <span className="px-3 py-1.5 rounded-full" style={{ background: COLORS.rust, color: COLORS.parchment }}>100% ነፃ</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <a
            href={`/?${q ? `q=${encodeURIComponent(q)}` : ""}`}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: cat === "all" ? COLORS.coffee : COLORS.card, color: cat === "all" ? COLORS.parchment : COLORS.ink, border: `1px solid ${COLORS.parchmentDark}` }}
          >
            <span className="text-lg">🛒</span> ሁሉም
          </a>
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`/?cat=${c.id}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{ background: cat === c.id ? COLORS.coffee : COLORS.card, color: cat === c.id ? COLORS.parchment : COLORS.ink, border: `1px solid ${COLORS.parchmentDark}` }}
            >
              <span className="text-lg">{c.emoji}</span> {c.amh}
            </a>
          ))}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.coffeeDark }}>የቅርብ ጊዜ ማስታወቂያዎች</h2>

        {error && <p className="text-sm" style={{ color: COLORS.rust }}>ዝርዝሮችን መጫን አልተቻለም። እባክዎ Supabase ማዋቀርዎን ያረጋግጡ።</p>}

        {!error && (!listings || listings.length === 0) && (
          <div className="text-center py-16 rounded-2xl" style={{ background: COLORS.card, border: `1px dashed ${COLORS.parchmentDark}` }}>
            <p className="font-semibold mb-2">ምንም ውጤት አልተገኘም</p>
            <a href="/post" className="px-4 py-2 rounded-full text-sm font-semibold inline-block" style={{ background: COLORS.gold, color: COLORS.coffeeDark }}>
              የመጀመሪያ ማስታወቂያዎን ይለጥፉ
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings?.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </main>

      <div className="tibeb-divider" style={{ height: 6 }} />
      <footer style={{ background: COLORS.coffeeDark, color: COLORS.parchment }} className="text-center py-8 text-xs">
        <p className="font-semibold text-sm" style={{ fontFamily: "'Fraunces', serif" }}>አዲስ ገበያ · Addis Market</p>
        <div className="flex justify-center gap-4 mt-3 flex-wrap">
          <a href="/about" className="opacity-80 hover:opacity-100">ስለ እኛ · About</a>
          <a href="/contact" className="opacity-80 hover:opacity-100">አግኙን · Contact</a>
          <a href="/privacy" className="opacity-80 hover:opacity-100">ግላዊነት · Privacy</a>
          <a href="/terms" className="opacity-80 hover:opacity-100">ውል · Terms</a>
        </div>
        <p className="opacity-70 mt-3">በኢትዮጵያውያን ለኢትዮጵያውያን የተሰራ · © 2026</p>
      </footer>
    </div>
  );
}
