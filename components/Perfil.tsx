import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { persona } from "@/data/experiencia";

// Se resuelve al hacer el build: si public/jorge.png no existe, va la silueta.
// Subir la foto dispara un nuevo deploy, así que se actualiza sola.
const hayFoto = fs.existsSync(path.join(process.cwd(), "public", persona.foto));

function Silueta() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-[85%] w-auto">
      <circle cx="50" cy="38" r="18" className="fill-muted/30" />
      <path d="M12 104c0-25 17-42 38-42s38 17 38 42z" className="fill-muted/30" />
    </svg>
  );
}

export function Perfil() {
  return (
    <div className="flex items-center gap-4 lg:h-full lg:flex-col lg:items-stretch lg:gap-0">
      <div className="relative flex size-24 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-track lg:aspect-[4/5] lg:size-auto lg:w-full lg:flex-1">
        {hayFoto ? (
          <Image
            src={persona.foto}
            alt={`Foto de ${persona.nombre}`}
            fill
            priority
            sizes="(min-width: 1024px) 260px, 96px"
            className="object-contain object-bottom"
          />
        ) : (
          <Silueta />
        )}
      </div>
      <div className="min-w-0 lg:mt-5 lg:text-center">
        <h2 className="text-xl font-bold tracking-tight">{persona.nombre}</h2>
        <p className="mt-0.5 text-[13px] leading-snug text-muted">{persona.cargoActual}</p>
        <p className="mt-3 inline-block rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink">
          {persona.disponible}
        </p>
      </div>
    </div>
  );
}
