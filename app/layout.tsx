import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; // Import the Chatbot

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothes App",
  description: "My first ecommerce app from scratch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="min-h-[80vh] mt-[64px]">{children}</div>
        <Footer />
        <Chatbot /> {/* Include the Chatbot component */}
      </body>
    </html>
  );
}
