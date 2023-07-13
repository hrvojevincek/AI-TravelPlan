"use client";

import "./globals.css";
import { Inter, Hind } from "next/font/google";
import localFont from "next/font/local";
import ProvidersWrapper from "./Providers";

const inter = Inter({ subsets: ["latin"] });

const futura = localFont({
  src: [
    {
      path: "../../public/fonts/futura/unicode.futurab.ttf",
    },
    {
      path: "../../public/fonts/futura/futura-bold.ttf",
      weight: "700",
    },
  ],
});

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
