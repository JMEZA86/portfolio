import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
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
    <html lang="es-AR" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Habilita las animaciones CSS solo si hay JavaScript, y decide antes de pintar
            si corresponde la intro (primera vez en la sesión y sin movimiento reducido) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('intro-vista')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-activa')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
