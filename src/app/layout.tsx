"use client";

import "./globals.css";
import { Inter } from "next/font/google";

import ProvidersWrapper from "./Providers";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Travel Plan",
//   description: "Travel Plan",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProvidersWrapper>
        <body className={inter.className}>{children}</body>
      </ProvidersWrapper>
    </html>
  );
}
