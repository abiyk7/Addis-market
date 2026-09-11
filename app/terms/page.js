import { COLORS } from "@/lib/theme";

export const metadata = {
  title: "የአገልግሎት ውል · Terms of Service — አዲስ ገበያ",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <a href="/" className="text-sm font-semibold" style={{ color: COLORS.goldDark }}>← ወደ ገበያው ተመለስ · Back to market</a>

        <h1 className="text-2xl font-bold mt-4 mb-2" style={{ color: COLORS.coffeeDark }}>የአገልግሎት ውል · Terms of Service</h1>
        <p className="text-sm mb-6" style={{ color: COLORS.inkSoft }}>Last updated: 2026</p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>1. አገልግሎቱ · The service</h2>
        <p className="leading-relaxed">
          አዲስ ገበያ ተጠቃሚዎች ዕቃዎችን በነፃ የሚለጥፉበት እና የሚፈልጉበት መድረክ ነው። ገበያው ራሱ በግዢ ወይም ሽያጭ ውስጥ ተካፋይ አይደለም፤
          ክፍያ በቀጥታ በገዢና ሻጭ መካከል ይከናወናል።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>2. የተጠቃሚ ኃላፊነት · User responsibility</h2>
        <p className="leading-relaxed">
          እውነተኛ እና ትክክለኛ መረጃ የመለጠፍ ኃላፊነት የተጠቃሚው ነው። አታላይ፣ ህገ-ወጥ ወይም አሳሳች ማስታወቂያዎች የተከለከሉ ናቸው እና
          ያለ ማስጠንቀቂያ ሊነሱ ይችላሉ።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>3. ደህንነት · Safety</h2>
        <p className="leading-relaxed">
          ገበያው ማንኛውንም ግብይት አያረጋግጥም። ተጠቃሚዎች ራሳቸውን ለመጠበቅ በእያንዳንዱ ማስታወቂያ ላይ የቀረቡትን የደህንነት ምክሮች እንዲከተሉ እናበረታታለን።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>4. የይዘት ማስወገድ · Content removal</h2>
        <p className="leading-relaxed">
          ማንኛውንም ማስታወቂያ ደንቦችን የሚጥስ ሆኖ ካገኘን የማስወገድ መብት አለን፣ የተጠቃሚ መለያዎችንም ጨምሮ።
        </p>

        <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: COLORS.coffeeDark }}>5. ግንኙነት · Contact</h2>
        <p className="leading-relaxed">
          ጥያቄ ካለዎት በ <a href="mailto:ab.kassa7@gmail.com" className="underline" style={{ color: COLORS.goldDark }}>ab.kassa7@gmail.com</a> ያግኙን።
        </p>
      </div>
    </div>
  );
}
