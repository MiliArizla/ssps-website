import type { Metadata } from "next";
import { Vollkorn } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const vollkorn = Vollkorn({ subsets: ["latin"], variable: "--font-vollkorn" });

export const metadata: Metadata = {
  title: "SSPs-website",
  description:
    "Website to calculate the spectrum of Singular Stellar Population changing the chemical abundance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative py-20 bg-cover bg-center bg-[url('../public/banner.jpg')]">
          <div className="flex">
            <Link
              className="py-4 title-banner text-center text-5xl w-full"
              href="/"
            >
              SSP Model Spectra Calculator
            </Link>
          </div>
          <h2 className="text-right text-sm absolute bottom-0 right-0">
            Image Credit: Andromeda Galaxy, NASA/Swift/Stefan Immler (GSFC) and
            Erin Grand (UMCP)
          </h2>
        </div>
        {children}
        <footer
          className={`${vollkorn.className} container mx-auto absolute bottom inset-x-0`}
        >
          <h3 className="text-sm text-center absolute bottom-0 inset-x-0">
            Disclaimer: This website does not save any personal data
          </h3>
        </footer>
      </body>
    </html>
  );
}
