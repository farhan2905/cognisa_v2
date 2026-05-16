import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: " AI Automation & Software Development",
  description:
    "The Anti-Agency Expert. We build custom software, digital experiences, and AI automations that drive business growth.",
  keywords: [
    "AI automation",
    "software development",
    "web development",
    "AI solutions",
    "growth strategy",
    "tech consultancy",
  ],
  authors: [{ name: "iknowdata" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "iknowdata | AI Automation & Software Development",
    description: "We build custom software and AI automations that drive business growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
