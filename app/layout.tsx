import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MolarSync | Insurance Tracker",
  description: "Zero-IT operational layer for dental practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}