import "./globals.css";
import { Inter } from "next/font/google";
import { DataProvider } from "./dataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel Plan",
  description: "Travel Plan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DataProvider>
        <body className={inter.className}>{children}</body>
      </DataProvider>
    </html>
  );
}
