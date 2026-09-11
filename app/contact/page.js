import { COLORS } from "@/lib/theme";
import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "አግኙን · Contact — አዲስ ገበያ",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: COLORS.parchment }}>
      <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8" style={{ background: COLORS.card, border: `1px solid ${COLORS.parchmentDark}` }}>
        <a href="/" className="text-sm font-semibold" style={{ color: COLORS.goldDark }}>← ወደ ገበያው ተመለስ · Back to market</a>

        <h1 className="text-2xl font-bold mt-4 mb-2" style={{ color: COLORS.coffeeDark }}>አግኙን · Contact us</h1>

        <p className="mt-4 leading-relaxed">
          ጥያቄ፣ አስተያየት፣ ወይም ችግር ካጋጠመዎት፣ በሚከተለው ኢሜይል ያግኙን። በተቻለ ፍጥነት እንመልስልዎታለን።
        </p>
        <p className="leading-relaxed" style={{ color: COLORS.inkSoft }}>
          Questions, feedback, or a problem to report? Reach us by email below — we'll get back to you.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="mailto:ab.kassa7@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-fit"
            style={{ background: COLORS.gold, color: COLORS.coffeeDark }}
          >
            <Mail size={16} /> ab.kassa7@gmail.com
          </a>
          <a
            href="tel:+46735648449"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-fit"
            style={{ background: COLORS.parchmentDark, color: COLORS.coffeeDark }}
          >
            <Phone size={16} /> +46 73 564 84 49
          </a>
        </div>

        <h2 className="text-lg font-bold mt-8 mb-2" style={{ color: COLORS.coffeeDark }}>አጠራጣሪ ማስታወቂያ ሪፖርት ማድረግ</h2>
        <p className="leading-relaxed">
          ማንኛውንም ማስታወቂያ በቀጥታ ከማስታወቂያው ገጽ ላይ ሪፖርት ማድረግ ይችላሉ። አስቸኳይ ጉዳይ ከሆነ ግን በኢሜይል ያግኙን።
        </p>
      </div>
    </div>
  );
}
