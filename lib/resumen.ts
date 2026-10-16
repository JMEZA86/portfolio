// Números derivados de data/. Ningún componente escribe cifras a mano.
import { proyectosPublicados as projects, type Area } from "@/data/projects";
import { experiencia } from "@/data/experiencia";
import { herramientas } from "@/data/formacion";
import { duracion, formatoCorto } from "@/lib/fechas";

export function experienciaTotal() {
  const desde = experiencia.map((p) => p.desde).sort()[0];
  const actual = experiencia.find((p) => p.hasta === null);
  const hasta = actual ? null : experiencia.map((p) => p.hasta!).sort().at(-1)!;
  return duracion(desde, hasta);
}

export function resumen() {
  return {
    anios: experienciaTotal().anios,
    proyectos: projects.length,
    herramientas: herramientas.length,
  };
}

export function balancePorArea(): Record<Area, number> {
  return projects.reduce<Record<Area, number>>(
    (acc, p) => ({ ...acc, [p.area]: acc[p.area] + 1 }),
    { automatizacion: 0, datos: 0 },
  );
}

// Porcentajes enteros que siempre suman 100.
export function balance() {
  const { automatizacion, datos } = balancePorArea();
  const total = automatizacion + datos || 1;
  const a = (automatizacion / total) * 100;
  const pa = a - Math.floor(a) >= 0.5 ? Math.ceil(a) : Math.floor(a);
  return {
    automatizacion: { label: "Automatización", cantidad: automatizacion, porcentaje: pa },
    datos: { label: "Datos", cantidad: datos, porcentaje: 100 - pa },
  };
}

// Tramos del anillo: un tramo por puesto, en orden cronológico.
export function tramosExperiencia() {
  return [...experiencia]
    .sort((a, b) => a.desde.localeCompare(b.desde))
    .map((p) => {
      const d = duracion(p.desde, p.hasta);
      return { cargo: p.cargoCorto, meses: d.totalMeses, texto: formatoCorto(d) };
    });
}
