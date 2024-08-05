import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lines to List",
  description: "Simple tool to convert lines of string to a list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background font-sans antialiased pt-8 md:pt-16 flex flex-col items-center md:justify-between ${inter.className}`}>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Lines to List
        </h1>
        {children}
        <Footer />
      </body>
    </html>
  );
}
