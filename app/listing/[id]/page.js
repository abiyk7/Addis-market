import { createClient } from "@/lib/supabase/server";
import ReportButton from "@/components/ReportButton";
import { COLORS, catById } from "@/lib/theme";
import { MapPin, ShieldCheck, Phone, Send } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ListingPage({ params }) {
  const supabase = createClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("*, profiles(is_verified_seller)")
    .eq("id", params.id)
    .single();

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.parchment }}>ማስታወቂያው አልተገኘም።</div>;
  }

  const cat = catById(listing.category_id);
  const isPhone = /^\+?[0-9\s-]{6,}$/.test(listing.contact);
  const photo = listing.photo_urls?.[0];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <div className="h-44 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.coffee}dd, ${COLORS.coffeeDark})` }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <span style={{ fontSize: 56 }}>{cat.emoji}</span>
          )}
          {listing.profiles?.is_verified_seller && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: COLORS.forest, color: COLORS.parchment }}>
              <ShieldCheck size={13} /> የተረጋገጠ ሻጭ
            </span>
          )}
        </div>
        <div className="p-5">
          <span className="text-xs font-semibold" style={{ color: COLORS.goldDark }}>{cat.amh}</span>
          <h1 className="text-xl font-bold mt-1">{listing.title}</h1>
          <div className="text-2xl font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.rust }}>
            {listing.price} {listing.currency}
          </div>
          <div className="flex items-center gap-1 text-sm mt-2" style={{ color: COLORS.inkSoft }}>
            <MapPin size={14} /> {listing.location}
          </div>
          <p className="mt-3 text-sm leading-relaxed">{listing.description}</p>

          <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: COLORS.parchment, border: `1px solid ${COLORS.parchmentDark}` }}>
            <p className="font-bold mb-1 flex items-center gap-1" style={{ color: COLORS.forest }}><ShieldCheck size={14} /> የደህንነት ምክሮች</p>
            <p>• ከመክፈልዎ በፊት እቃውን በአካል ይመልከቱ</p>
            <p>• በህዝብ ቦታ ይገናኙ</p>
            <p>• ገንዘብ ቅድሚያ ከማይታወቁ ሻጮች አይላኩ</p>
          </div>

          <a
            href={isPhone ? `tel:${listing.contact}` : `https://t.me/${listing.contact.replace("@", "")}`}
            target="_blank" rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm"
            style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
          >
            {isPhone ? <Phone size={16} /> : <Send size={16} />} ሻጭን ያግኙ
          </a>

          <ReportButton listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
