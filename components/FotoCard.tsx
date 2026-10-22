import { Foto } from "@/components/Foto";
import { persona } from "@/data/experiencia";

// Tarjeta con la foto a sangre y el nombre encima.
export function FotoCard() {
  return (
    <section aria-label="Perfil" className="relative min-h-72 overflow-hidden rounded-card bg-track sm:min-h-0">
      <Foto
        className="absolute inset-0"
        sizes="(min-width: 1024px) 280px, 100vw"
        encuadre="object-contain object-bottom lg:object-cover lg:object-[50%_20%]"
      />
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 rounded-xl bg-ink/80 px-3 py-2.5 text-card backdrop-blur">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">{persona.nombre}</p>
          <p className="truncate text-[11px] text-card/75">{persona.cargoActual}</p>
        </div>
      </div>
    </section>
  );
}
