import { COLORS } from "@/lib/theme";

export const metadata = {
  title: "የግላዊነት ፖሊሲ · Privacy Policy — Addis Market",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#FFFDF7" }}>
      <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: COLORS.coffeeDark }}>የግላዊነት ፖሊሲ · Privacy Policy</h1>
        <p className="text-xs mb-6" style={{ color: COLORS.inkSoft }}>Addis Market · አዲስ ገበያ — Last updated: 2026</p>

        <section className="mb-6">
          <h2 className="font-bold mb-2" style={{ color: COLORS.coffeeDark }}>አማርኛ</h2>
          <p className="text-sm leading-relaxed mb-2">
            አዲስ ገበያ የተጠቃሚዎችን ግላዊነት ያከብራል። ይህ ገጽ የምንሰበስበውን መረጃ፣ እንዴት እንደምንጠቀምበት እና ተጠቃሚዎች ስላላቸው ምርጫዎች ያብራራል።
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>የምንሰበስበው መረጃ፡</strong> ስም፣ ኢሜይል፣ ስልክ ቁጥር (በምዝገባ ጊዜ)፣ የለጠፉት ማስታወቂያ ይዘት (ርዕስ፣ ዋጋ፣ ቦታ፣ ፎቶዎች)፣ እና በመተግበሪያው ውስጥ የሚላኩ መልእክቶች።
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>አጠቃቀም፡</strong> መረጃው ማስታወቂያዎችን ለማሳየት፣ ገዢና ሻጭ እንዲገናኙ ለማስቻል፣ እና የመተግበሪያውን ደህንነት ለመጠበቅ (ማጭበርበርን ለመለየት) ብቻ ጥቅም ላይ ይውላል።
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>ኩኪዎች እና ማስታወቂያ፡</strong> ይህ ድህረ ገጽ Google AdSense ይጠቀማል፣ ይህም ኩኪዎችን በመጠቀም ለተጠቃሚዎች ተስማሚ ማስታወቂያዎችን ያሳያል። Google የራሱ የግላዊነት ፖሊሲ አለው፤ ስለ Google's አጠቃቀም የበለጠ ለማወቅ policies.google.com/technologies/ads ይጎብኙ።
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>የተጠቃሚ መብቶች፡</strong> ተጠቃሚዎች መለያቸውን፣ ማስታወቂያዎቻቸውን፣ ወይም መረጃቸውን በማንኛውም ጊዜ የማርትዕ ወይም የመሰረዝ መብት አላቸው። ጥያቄ ካለዎት፣ በድህረ ገጹ ላይ በተጠቀሰው ኢሜይል ያግኙን።
          </p>
          <p className="text-sm leading-relaxed">
            <strong>የሶስተኛ ወገን አገልግሎቶች፡</strong> ይህ ድህረ ገጽ ለማከማቻ Supabase፣ ለማስተናገድ Vercel፣ እና ለኢሜይል Resend ይጠቀማል። እነዚህ አገልግሎቶች የራሳቸው የግላዊነት ፖሊሲዎች አሏቸው።
          </p>
        </section>

        <hr className="my-6" style={{ borderColor: COLORS.parchmentDark }} />

        <section>
          <h2 className="font-bold mb-2" style={{ color: COLORS.coffeeDark }}>English</h2>
          <p className="text-sm leading-relaxed mb-2">
            Addis Market respects your privacy. This page explains what information we collect, how we use it, and the choices available to you.
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>Information we collect:</strong> name, email, phone number (at signup), listing content you post (title, price, location, photos), and messages sent within the app.
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>How we use it:</strong> to display listings, enable communication between buyers and sellers, and maintain platform safety (e.g. fraud detection).
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>Cookies & advertising:</strong> this site uses Google AdSense, which uses cookies to show relevant ads. Google has its own privacy practices — learn more at policies.google.com/technologies/ads.
          </p>
          <p className="text-sm leading-relaxed mb-2">
            <strong>Your rights:</strong> you may edit or delete your account, listings, or data at any time. Contact us via the email listed on the site with any questions.
          </p>
          <p className="text-sm leading-relaxed">
            <strong>Third-party services:</strong> this site uses Supabase for data storage, Vercel for hosting, and Resend for email delivery. These services have their own privacy policies.
          </p>
        </section>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm font-semibold" style={{ color: COLORS.goldDark }}>← ወደ መነሻ ገጽ ተመለስ · Back to home</a>
        </div>
      </div>
    </div>
  );
}
