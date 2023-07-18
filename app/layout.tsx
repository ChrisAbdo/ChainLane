import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const title =
  "ChainLane - The best place to find and connect to your favorite blockchains";
const description =
  "ChainLane is a blockchain discovery and connection tool. Find your favorite blockchains and connect to them with a single click.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@abdo_eth",
  },
  metadataBase: new URL("https://chainlane.vercel.app/"),
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
