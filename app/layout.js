import "./globals.css";

export const metadata = {
  title: "አዲስ ገበያ · Addis Market",
  description: "ለኢትዮጵያ እና ለውጪ አገር ኢትዮጵያውያን የተዘጋጀ ነፃ የግዢና ሽያጭ መድረክ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="am">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3296040027829512" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3296040027829512"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&family=Noto+Sans+Ethiopic:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
