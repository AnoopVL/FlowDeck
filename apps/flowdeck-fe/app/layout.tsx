"use client"; // Required for usePathname()

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation"; // For route detection
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Show header only on the dashboard page */}
          {pathname === "/dashboard" && (
            <header className="flex justify-between items-center p-4 gap-4 h-16">
              <h1 className="text-xl font-bold">FlowDeck</h1>
              <main className="p-4">{children}</main>
            </header>
          )}

          {/* <main className="p-4">{children}</main> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
