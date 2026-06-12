import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { colors } from "@/styles/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restow Frandha - Software Engineer",
  description: "Portfolio of Restow Frandha, a software engineer specializing in backend development, microservices, and scalable systems.",
  keywords: ["backend engineer", "microservices", "Go", "Java", "API design"],
  authors: [{ name: "Restow Frandha" }],
  viewport: "width=device-width, initial-scale=1",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: colors.primary.navy,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: colors.primary.navy }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
