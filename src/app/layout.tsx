import "@/styles/globals.css";
import React from "react";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "IndustryPRO",
    template: "%s | IndustryPRO",
  },
  description: "Sistema intranet para indústria de plásticos",
  applicationName: "IndustryPRO",
  keywords: ["intranet", "plastics", "manufacturing", "erp", "industry"],
  authors: [{ name: "IndustryPRO Team" }],
  creator: "IndustryPRO Team",
  publisher: "IndustryPRO Team",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IndustryPRO",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <body className="bg-gray-50">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
