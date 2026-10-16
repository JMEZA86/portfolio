import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático: `next build` genera la carpeta `out/`.
  output: "export",
  // Sin servidor no hay optimización de imágenes en runtime.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
