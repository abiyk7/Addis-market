// lib/i18n.js
// Simple bilingual dictionary system. Default language is English (required
// for AdSense, since Amharic isn't on Google's supported-languages list).
// Amharic stays fully available via a toggle.

export const LANGUAGES = ["en", "am"];
export const DEFAULT_LANGUAGE = "en";

export const dict = {
  en: {
    siteName: "Addis Market",
    siteNameNative: "አዲስ ገበያ",
    tagline: "Addis Market",
    searchPlaceholder: "What are you looking for? · Search",
    heroTitle: "The Marketplace for Ethiopians, Everywhere",
    heroSubtitle: "A free buying and selling platform built for Ethiopians at home and abroad",
    badgeSecure: "Secure & Trusted",
    badgeFree: "100% Free",
    catAll: "All",
    recentListings: "Recent Listings",
    loadError: "Could not load listings. Please check your Supabase configuration.",
    noResults: "No results found",
    postFirstListing: "Post Your First Listing",
    footerTagline: "Built by Ethiopians, for Ethiopians · © 2026",
    footerDisclaimer:
      "Addis Market is not responsible for any exchange, agreement, or transaction between buyers and sellers. Users are advised to take their own precautions and verify items in person before making any payment.",
    privacyPolicy: "Privacy Policy",
    langToggle: "አማርኛ",
    verifiedSeller: "Verified",
    today: "Today",
    yesterday: "Yesterday",
    daysAgo: (n) => `${n} days ago`,
    loginTitle: "Addis Market",
    loginSubtitle: "Enter your email or phone number to sign in",
    emailTab: "Email",
    phoneTab: "Phone",
    sendCode: "Send Code",
    verify: "Verify",
    codeSentEmail: "Code sent to your email",
    codeSentPhone: "Code sent via SMS",
    codePlaceholder: "6-digit code",
    phoneOtpNote: "To enable phone sign-in, an SMS provider (Twilio) must be configured in Supabase.",
  },
  am: {
    siteName: "አዲስ ገበያ",
    siteNameNative: "አዲስ ገበያ",
    tagline: "Addis Market",
    searchPlaceholder: "ምን ይፈልጋሉ? · Search",
    heroTitle: "የኢትዮጵያውያን የግዢና ሽያጭ ገበያ",
    heroSubtitle: "ለኢትዮጵያ እና ለውጪ አገር ኢትዮጵያውያን የተዘጋጀ ነፃ የግዢና ሽያጭ መድረክ",
    badgeSecure: "ደህንነቱ የተጠበቀ",
    badgeFree: "100% ነፃ",
    catAll: "ሁሉም",
    recentListings: "የቅርብ ጊዜ ማስታወቂያዎች",
    loadError: "ዝርዝሮችን መጫን አልተቻለም። እባክዎ Supabase ማዋቀርዎን ያረጋግጡ።",
    noResults: "ምንም ውጤት አልተገኘም",
    postFirstListing: "የመጀመሪያ ማስታወቂያዎን ይለጥፉ",
    footerTagline: "በኢትዮጵያውያን ለኢትዮጵያውያን የተሰራ · © 2026",
    footerDisclaimer:
      "አዲስ ገበያ በሻጮች እና በገዢዎች መካከል ለሚደረግ ማንኛውም ልውውጥ፣ ስምምነት፣ ወይም ግብይት ኃላፊነት አይወስድም። ተጠቃሚዎች የራሳቸውን ጥንቃቄ እንዲወስዱ እና ከመክፈላቸው በፊት እቃውን በአካል እንዲያረጋግጡ እንመክራለን።",
    privacyPolicy: "የግላዊነት ፖሊሲ",
    langToggle: "English",
    verifiedSeller: "የተረጋገጠ",
    today: "ዛሬ",
    yesterday: "ትናንት",
    daysAgo: (n) => `${n} ቀናት በፊት`,
    loginTitle: "አዲስ ገበያ",
    loginSubtitle: "ለመግባት ኢሜይል ወይም ስልክ ቁጥርዎን ያስገቡ",
    emailTab: "ኢሜይል",
    phoneTab: "ስልክ",
    sendCode: "ኮድ ላክ",
    verify: "አረጋግጥ",
    codeSentEmail: "ኮድ ወደ ኢሜይልዎ ተልኳል",
    codeSentPhone: "ኮድ በSMS ተልኳል",
    codePlaceholder: "6-digit code",
    phoneOtpNote: "የስልክ ግቤት ስራ ላይ እንዲውል Supabase ላይ SMS አቅራቢ (Twilio) ማዋቀር ያስፈልጋል።",
  },
};

export function getDict(lang) {
  return dict[LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE];
}
