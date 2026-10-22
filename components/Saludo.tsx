import { Contador } from "@/components/Contador";
import { Foto } from "@/components/Foto";
import { persona } from "@/data/experiencia";
import { resumen } from "@/lib/resumen";

// Inicio: lo que un reclutador necesita ver primero, en una sola tarjeta.
export function Saludo() {
  const { anios, proyectos, herramientas } = resumen();
  const numeros = [
    { valor: anios, label: anios === 1 ? "año de experiencia" : "años de experiencia" },
    { valor: proyectos, label: "proyectos" },
    { valor: herramientas, label: "herramientas" },
  ];

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <Foto className="size-14 shrink-0 sm:hidden" sizes="56px" />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold">{persona.disponible}</span>
            <span className="text-xs text-muted">{persona.ubicacion}</span>
          </div>
        </div>

        <h1 className="mt-4 text-[2rem] font-bold leading-none tracking-[-0.035em] sm:text-[2.5rem]">
          {persona.saludo}
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-snug text-muted">{persona.bajada}</p>

        <dl className="mt-5 flex gap-6 sm:gap-10">
          {numeros.map(({ valor, label }) => (
            <div key={label} className="flex flex-col">
              <dt className="mt-1 text-xs leading-tight text-muted">{label}</dt>
              <dd className="order-first text-[1.75rem] font-bold leading-none tracking-[-0.03em] sm:text-[2rem]">
                <Contador valor={valor} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium">
          <a href={`mailto:${persona.email}`} className="rounded-full bg-ink px-4 py-2 text-card hover:bg-ink/85">
            Escribime
          </a>
          <a
            href={persona.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/20 px-4 py-2 hover:bg-track"
          >
            LinkedIn <span aria-hidden>↗</span>
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>
      </div>

      <Foto className="hidden w-44 shrink-0 sm:flex lg:w-52" sizes="(min-width: 1024px) 208px, 176px" />
    </div>
  );
}
