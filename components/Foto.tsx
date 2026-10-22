import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { persona } from "@/data/experiencia";

// Se resuelve al hacer el build: si public/jorge.png no existe, va la silueta.
// Subir la foto dispara un nuevo deploy, así que se actualiza sola.
// El contenedor necesita posición (relative/absolute) desde className.
const hayFoto = fs.existsSync(path.join(process.cwd(), "public", persona.foto));

export function Foto({
  className = "",
  sizes,
  encuadre = "object-contain object-bottom",
}: {
  className?: string;
  sizes: string;
  encuadre?: string;
}) {
  return (
    <div className={`flex items-end justify-center overflow-hidden bg-track ${className}`}>
      {hayFoto ? (
        <Image
          src={persona.foto}
          alt={`Foto de ${persona.nombre}`}
          fill
          priority
          sizes={sizes}
          className={encuadre}
        />
      ) : (
        <svg viewBox="0 0 100 100" aria-hidden className="h-[85%] w-auto">
          <circle cx="50" cy="38" r="18" className="fill-muted/30" />
          <path d="M12 104c0-25 17-42 38-42s38 17 38 42z" className="fill-muted/30" />
        </svg>
      )}
    </div>
  );
}
