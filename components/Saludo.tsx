import { Contador } from "@/components/Contador";
import { persona } from "@/data/experiencia";
import { resumen } from "@/lib/resumen";

export function Saludo() {
  const { anios, proyectos, herramientas } = resumen();
  const numeros = [
    { valor: anios, label: anios === 1 ? "año de experiencia" : "años de experiencia" },
    { valor: proyectos, label: "proyectos" },
    { valor: herramientas, label: "herramientas" },
  ];

  return (
    <>
      <p className="text-sm font-medium text-muted">{persona.ubicacion}</p>
      <h1 className="mt-2 text-[2.5rem] font-bold leading-none tracking-[-0.04em] sm:text-6xl">
        {persona.saludo}
      </h1>
      <dl className="mt-7 grid grid-cols-3 gap-4 sm:flex sm:gap-12">
        {numeros.map(({ valor, label }) => (
          <div key={label} className="flex flex-col">
            <dt className="mt-1 text-[13px] leading-tight text-muted">{label}</dt>
            <dd className="order-first text-[2.25rem] font-bold leading-none tracking-[-0.04em] sm:text-5xl">
              <Contador valor={valor} />
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
