import { Contador } from "@/components/Contador";
import { Foto } from "@/components/Foto";
import { persona } from "@/data/experiencia";
import { resumen } from "@/lib/resumen";

// Encabezado sobre el fondo: saludo y bajada a la izquierda, números grandes a la derecha.
export function Saludo() {
  const { anios, proyectos, herramientas } = resumen();
  const numeros = [
    {
      valor: anios,
      label: anios === 1 ? "año de experiencia" : "años de experiencia",
    },
    { valor: proyectos, label: "proyectos" },
    { valor: herramientas, label: "herramientas" },
  ];

  return (
    <section
      id="inicio"
      className="flex flex-col gap-5 pt-2 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Celular: foto + saludo en una fila y la bajada a todo el ancho debajo.
          Desde sm: la foto ocupa las dos filas y la bajada va al lado. */}
      <div className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-x-4 sm:gap-x-6">
        {/* Foto redonda, del tamaño de la de LinkedIn en escritorio */}
        <Foto
          className="relative size-20 shrink-0 rounded-full ring-4 ring-card sm:row-span-2 sm:size-28 lg:size-[152px]"
          sizes="(min-width: 1024px) 152px, (min-width: 640px) 112px, 80px"
          encuadre="object-cover object-[50%_15%] scale-110"
        />
        <div className="min-w-0 sm:self-end">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-ink">
              {persona.disponible}
            </span>
            {persona.ubicacion}
          </p>
          <h1 className="mt-2.5 text-[1.75rem] font-semibold leading-none tracking-[-0.035em] sm:mt-3 sm:text-[2.5rem]">
            {persona.saludo}
          </h1>
        </div>
        <p className="col-span-2 mt-3 max-w-xl self-start text-[15px] leading-snug text-muted sm:col-span-1 sm:col-start-2 sm:mt-2">
          {persona.bajada}
        </p>
      </div>

      <dl className="flex gap-6 sm:gap-8">
        {numeros.map(({ valor, label }) => (
          <div key={label} className="flex flex-col">
            <dt className="mt-1 text-xs leading-tight text-muted">{label}</dt>
            <dd className="order-first text-[2rem] font-medium leading-none tracking-[-0.04em] sm:text-[2.75rem]">
              <Contador valor={valor} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
