import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-chat",
});

export const metadata: Metadata = {
  title: "balo",
  description: "balo — ambient AI messaging",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`} style={{ margin: 0 }}>
        {/* OBS rounded-corner masking wrapper — remove if not needed */}
        <div style={{ borderRadius: 40, overflow: "hidden", height: "100dvh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
