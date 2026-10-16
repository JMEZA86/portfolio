import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Metadata completa (Open Graph, imagen 1200x630, favicon) se arma en un paso posterior.
export const metadata: Metadata = {
  title: "Jorge Meza · Portfolio",
  description: "CV y proyectos de automatización y datos de Jorge Meza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
