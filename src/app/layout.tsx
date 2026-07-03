import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap"
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Howrah Bridge Special | Kolkata Street Food & Fusion Fast Food",
  description: "Experience the unique street-food heritage of Kolkata combined with modern fusion fast food at Howrah Bridge Special. Kathi Rolls, Gourmet Burgers, and Indo-Chinese stir-fries.",
  keywords: "Kolkata street food, Kathi rolls, Howrah Bridge Special, fusion burgers, Tangra chinese, fast food Kolkata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}
    >
      <body>
        <CartProvider>
          <Header />
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flexGrow: 1 }}>{children}</div>
          </div>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
