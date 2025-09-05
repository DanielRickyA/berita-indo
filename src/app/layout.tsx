import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavUser from "@/components/nav-user";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "BeritaIndo",
  description: "Information about Indonesia Right Now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <NavUser />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
