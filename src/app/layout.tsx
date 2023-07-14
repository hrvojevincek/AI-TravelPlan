"use client";

import "./globals.css";
import { Hind } from "next/font/google";
import ProvidersWrapper from "./Providers";

const hind = Hind({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProvidersWrapper>
        <body className={hind.className}>{children}</body>
      </ProvidersWrapper>
    </html>
  );
}
