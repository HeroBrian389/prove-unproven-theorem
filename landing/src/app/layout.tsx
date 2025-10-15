import type { Metadata } from "next";
import { Geist_Mono, Inter, Old_Standard_TT } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oldStandard = Old_Standard_TT({
  variable: "--font-old-standard",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brian Kelleher | Proving the Unproven",
  description:
    "Public documentation of Brian Kelleher's four-week exploration into AI-assisted mathematics during Edge City Patagonia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          inter.variable,
          oldStandard.variable,
          geistMono.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
