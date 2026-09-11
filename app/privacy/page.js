import { COLORS } from "@/lib/theme";

export const metadata = {
  title: "የግላዊነት መመሪያ · Privacy Policy — አዲስ ገበያ",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <a href="/" className="text-sm font-semibold" style={{ color: COLORS.goldDark }}>← ወደ ገበያው ተመለስ · Back to market</a>

        <h1 className="text-2xl font-bold mt-4 mb-2" style={{ color: COLORS.coffeeDark }}>የግላዊነት መመሪያ · Privacy Policy</h1>
        <p className="text-sm mb-6" style={{ color: COLORS.inkSoft }}>Last updated: 2026</p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>1. የምንሰበስበው መረጃ · Information we collect</h2>
        <p className="leading-relaxed">
          መለያ ሲከፍቱ ኢሜይል ወይም ስልክ ቁጥርዎን እንሰበስባለን። ማስታወቂያ ሲለጥፉ፣ ርዕስ፣ ዋጋ፣ ቦታ፣ የመገናኛ መረጃ እና ፎቶዎችን ያካትታል።
        </p>
        <p className="leading-relaxed" style={{ color: COLORS.inkSoft }}>
          When you create an account, we collect your email or phone number. When you post a listing, we store the
          title, price, location, contact info, and any photos you upload.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>2. ማስታወቂያ · Advertising & cookies</h2>
        <p className="leading-relaxed">
          ይህ ድረ-ገጽ ማስታወቂያዎችን ለማሳየት Google AdSense ሊጠቀም ይችላል። Google ኩኪዎችን (cookies) በመጠቀም ተጠቃሚዎችን መሰረት
          ያደረጉ ማስታወቂያዎችን ሊያሳይ ይችላል። ስለ Google's ኩኪ አጠቃቀም ተጨማሪ መረጃ ለማግኘት{" "}
          <a href="https://policies.google.com/technologies/ads" className="underline" style={{ color: COLORS.goldDark }}>
            እዚህ
          </a>{" "}
          ይጫኑ።
        </p>
        <p className="leading-relaxed" style={{ color: COLORS.inkSoft }}>
          This site may use Google AdSense to display ads. Google may use cookies to serve ads based on your visits
          to this and other sites. Learn more about Google's ad cookie use at the link above.
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>3. የመረጃ አጠቃቀም · How we use your information</h2>
        <p className="leading-relaxed">
          መረጃዎ የሚጠቀመው ገበያውን ለማካሄድ፣ ማስታወቂያዎችን ለማሳየት፣ እና ደህንነትን ለመጠበቅ ብቻ ነው። መረጃዎን ለሶስተኛ ወገኖች አንሸጥም።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>4. የእርስዎ መብቶች · Your rights</h2>
        <p className="leading-relaxed">
          መለያዎን ወይም ማስታወቂያዎችዎን በማንኛውም ጊዜ መሰረዝ ይችላሉ። መረጃዎ እንዲሰረዝ ከፈለጉ በ
          <a href="/contact" className="underline" style={{ color: COLORS.goldDark }}>አድራሻ ገጻችን</a> በኩል ያግኙን።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>5. ያግኙን · Contact</h2>
        <p className="leading-relaxed">
          ጥያቄ ካለዎት በ <a href="mailto:ab.kassa7@gmail.com" className="underline" style={{ color: COLORS.goldDark }}>ab.kassa7@gmail.com</a> ያግኙን።
        </p>
      </div>
    </div>
  );
}
