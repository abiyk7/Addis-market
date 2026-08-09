import { createClient } from "@/lib/supabase/server";
import ReportButton from "@/components/ReportButton";
import OwnerControls from "@/components/OwnerControls";
import ContactSeller from "@/components/ContactSeller";
import { COLORS, catById } from "@/lib/theme";
import { MapPin, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ListingPage({ params }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const { data: listing } = await supabase
    .from("listings")
    .select("*, profiles(is_verified_seller, email, display_name)")
    .eq("id", params.id)
    .single();

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.parchment }}>ማስታወቂያው አልተገኘም።</div>;
  }

  const cat = catById(listing.category_id);
  const photo = listing.photo_urls?.[0];
  const isOwner = session?.user?.id === listing.user_id;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(listing.location)}&output=embed`;

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
          {listing.status === "cancelled" && (
            <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: COLORS.rust, color: COLORS.parchment }}>
              ተሰርዟል · Cancelled
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

          <div className="mt-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${COLORS.parchmentDark}` }}>
            <iframe
              title="map"
              width="100%"
              height="180"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              src={mapSrc}
            />
          </div>

          <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: COLORS.parchment, border: `1px solid ${COLORS.parchmentDark}` }}>
            <p className="font-bold mb-1 flex items-center gap-1" style={{ color: COLORS.forest }}><ShieldCheck size={14} /> የደህንነት ምክሮች</p>
            <p>• ከመክፈልዎ በፊት እቃውን በአካል ይመልከቱ</p>
            <p>• በህዝብ ቦታ ይገናኙ</p>
            <p>• ገንዘብ ቅድሚያ ከማይታወቁ ሻጮች አይላኩ</p>
          </div>

          {isOwner ? (
            <OwnerControls listingId={listing.id} status={listing.status} />
          ) : (
            <ContactSeller listing={listing} sellerEmail={listing.profiles?.email} />
          )}

          <ReportButton listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
