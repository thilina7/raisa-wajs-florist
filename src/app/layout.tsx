import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Raisa Wajs Florist — Fresh Flowers Delivered",
    template: "%s | Raisa Wajs Florist",
  },
  description:
    "Beautiful fresh flower bouquets and arrangements delivered to your door. Handcrafted by Raisa Wajs Florist for birthdays, romance, sympathy, and every occasion.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Raisa Wajs Florist",
    title: "Raisa Wajs Florist — Fresh Flowers Delivered",
    description:
      "Beautiful fresh flower bouquets and arrangements delivered to your door. Handcrafted for every occasion.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#1a1a1a]">
        <ToastProvider>
          <header>
            <AnnouncementBar />
            <Navbar />
          </header>

          <main className="flex-1">{children}</main>

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
