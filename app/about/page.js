import { COLORS } from "@/lib/theme";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "ስለ እኛ · About — አዲስ ገበያ",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <a href="/" className="text-sm font-semibold" style={{ color: COLORS.goldDark }}>← ወደ ገበያው ተመለስ · Back to market</a>

        <h1 className="text-2xl font-bold mt-4 mb-2" style={{ color: COLORS.coffeeDark }}>ስለ አዲስ ገበያ · About Addis Market</h1>

        <p className="mt-4 leading-relaxed">
          አዲስ ገበያ ለኢትዮጵያ እና በተለያዩ የዓለም ክፍሎች ለሚኖሩ ኢትዮጵያውያን የተዘጋጀ ነፃ የግዢና ሽያጭ መድረክ ነው።
          ማንኛውም ሰው መኪና፣ ቤት፣ ኤሌክትሮኒክስ፣ የቤት እቃዎች፣ አልባሳት እና ሌሎች ዕቃዎችን በቀላሉ በአማርኛ መለጠፍ እና መፈለግ ይችላል።
        </p>

        <p className="mt-4 leading-relaxed" style={{ color: COLORS.inkSoft }}>
          Addis Market is a free classifieds platform for Ethiopians — at home and across the diaspora — to buy and
          sell cars, real estate, electronics, furniture, clothing, and more, entirely in Amharic.
        </p>

        <div className="mt-6 p-4 rounded-xl flex gap-3" style={{ background: COLORS.parchment, border: `1px solid ${COLORS.parchmentDark}` }}>
          <ShieldCheck size={22} style={{ color: COLORS.forest, flexShrink: 0 }} />
          <p className="text-sm leading-relaxed">
            ማስታወቂያዎች ከመታተማቸው በፊት በራስ-ሰር ይገመገማሉ፣ እና ተጠቃሚዎች አጠራጣሪ ማስታወቂያዎችን ሪፖርት ማድረግ ይችላሉ።
            ይህም ገበያውን ለሁሉም ደህንነቱ የተጠበቀ እንዲሆን ይረዳል።
          </p>
        </div>

        <h2 className="text-lg font-bold mt-8 mb-2" style={{ color: COLORS.coffeeDark }}>ማን ይመራዋል · Who runs this</h2>
        <p className="leading-relaxed">
          አዲስ ገበያ የሚተዳደረው በግል ነው፣ ትልቅ ኩባንያ ወይም ድርጅት ሳይሆን። ጥያቄ ወይም አስተያየት ካለዎት፣
          እባክዎ በ<a href="/contact" className="underline" style={{ color: COLORS.goldDark }}>የእኛን አድራሻ ገጽ</a> በኩል ያግኙን።
        </p>
      </div>
    </div>
  );
}
