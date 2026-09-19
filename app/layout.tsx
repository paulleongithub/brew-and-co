import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import { ReservationDialog } from "./components/ReservationDialog";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brew & Co — Specialty Coffee & All-Day Café in London",
    template: "%s · Brew & Co",
  },
  description:
    "Brew & Co is a cosy neighbourhood café in Walthamstow, London, serving specialty coffee, fresh pastries and light lunches. Open mic every Friday night, coffee cupping every Saturday morning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        {children}
        <ReservationDialog />
      </body>
    </html>
  );
}
