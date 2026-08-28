import { MapPin, ShieldCheck } from "lucide-react";
import { COLORS, catById } from "@/lib/theme";
import { getDict, DEFAULT_LANGUAGE } from "@/lib/i18n";

function timeAgo(ts, t) {
  const days = Math.floor((Date.now() - new Date(ts).getTime()) / 86400000);
  if (days <= 0) return t.today;
  if (days === 1) return t.yesterday;
  return t.daysAgo(days);
}

export default function ListingCard({ listing, lang }) {
  const t = getDict(lang || DEFAULT_LANGUAGE);
  const cat = catById(listing.category_id);
  const catLabel = lang === "am" ? cat.amh : (cat.en || cat.amh);
  const photo = listing.photo_urls?.[0];

  return (
    <a
      href={`/listing/${listing.id}`}
      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
      style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}
    >
      <div className="h-36 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.coffee}dd, ${COLORS.coffeeDark})` }}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <span style={{ fontSize: 44 }}>{cat.emoji}</span>
        )}
        {listing.profiles?.is_verified_seller && (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: COLORS.forest, color: COLORS.parchment }}>
            <ShieldCheck size={11} /> {t.verifiedSeller}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <span className="text-[11px] font-semibold" style={{ color: COLORS.goldDark }}>{catLabel}</span>
        <h3 className="font-bold text-sm leading-snug line-clamp-2">{listing.title}</h3>
        <span className="text-lg font-bold mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.rust }}>
          {listing.price} {listing.currency}
        </span>
        <div className="flex items-center gap-1 text-xs mt-1" style={{ color: COLORS.inkSoft }}>
          <MapPin size={12} /> {listing.location}
        </div>
        <div className="text-[11px] mt-1" style={{ color: COLORS.inkSoft }}>{timeAgo(listing.created_at, t)}</div>
      </div>
    </a>
  );
}
