import "./globals.css";
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE } from "@/lib/i18n";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || DEFAULT_LANGUAGE;

  if (lang === "am") {
    return {
      title: "አዲስ ገበያ · Addis Market",
      description: "ለኢትዮጵያ እና ለውጪ አገር ኢትዮጵያውያን የተዘጋጀ ነፃ የግዢና ሽያጭ መድረክ",
    };
  }

  return {
    title: "Addis Market",
    description:
      "A free buying and selling marketplace built for Ethiopians at home and abroad.",
  };
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || DEFAULT_LANGUAGE;

  return (
    <html lang={lang}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3296040027829512" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
