// Números derivados de data/. Ningún componente escribe cifras a mano.
import { proyectosPublicados as projects, type Area } from "@/data/projects";
import { CONSEJO, experiencia, forecast, type Puesto } from "@/data/experiencia";
import { herramientas } from "@/data/formacion";
import { duracion, formatoCorto, formatoMes, mesActual, mesSiguiente } from "@/lib/fechas";

const enConsejo = (p: Puesto) => p.organizacion === CONSEJO;

// Tiempo en el Consejo: de la primera fecha de ingreso a hoy (o al último egreso).
export function experienciaTotal() {
  const puestos = experiencia.filter(enConsejo);
  const desde = puestos.map((p) => p.desde).sort()[0];
  const actual = puestos.find((p) => p.hasta === null);
  const hasta = actual ? null : puestos.map((p) => p.hasta!).sort().at(-1)!;
  return duracion(desde, hasta);
}

// Experiencia laboral total: meses trabajados, sin contar dos veces los meses de cambio de puesto.
export function experienciaLaboral() {
  const meses = new Set<number>();
  const indice = (f: string) => Number(f.slice(0, 4)) * 12 + Number(f.slice(5, 7)) - 1;
  for (const p of experiencia)
    for (let m = indice(p.desde); m <= indice(p.hasta ?? mesActual()); m++) meses.add(m);
  return { anios: Math.floor(meses.size / 12), meses: meses.size % 12, totalMeses: meses.size };
}

export function resumen() {
  return {
    anios: experienciaLaboral().anios,
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
  return experiencia
    .filter(enConsejo)
    .sort((a, b) => a.desde.localeCompare(b.desde))
    .map((p) => {
      const d = duracion(p.desde, p.hasta);
      return { clave: p.desde, cargo: p.cargoCorto, meses: d.totalMeses, texto: formatoCorto(d) };
    });
}

export type TramoCarrera = {
  clave: string; // fecha de inicio del puesto, o "proyeccion"
  cargo: string;
  texto: string; // duración, o "proyección"
  periodo: string; // para lectores de pantalla
  meses: number;
  tipo: "otro" | "consejo" | "proyeccion";
};

// Tramos de la barra de carrera: cada puesto con ancho proporcional a su duración,
// y al final la proyección (desde el mes siguiente al actual hasta forecast.hasta).
export function tramosCarrera(): TramoCarrera[] {
  const tramos: TramoCarrera[] = [...experiencia]
    .sort((a, b) => a.desde.localeCompare(b.desde))
    .map((p) => {
      const d = duracion(p.desde, p.hasta);
      return {
        clave: p.desde,
        cargo: p.organizacion === CONSEJO ? p.cargoCorto : `${p.cargoCorto} · ${p.organizacion}`,
        texto: formatoCorto(d),
        periodo: `${formatoMes(p.desde)} a ${p.hasta ? formatoMes(p.hasta) : "la actualidad"}`,
        meses: d.totalMeses,
        tipo: p.organizacion === CONSEJO ? "consejo" : "otro",
      };
    });
  const inicio = forecast.desde ?? mesSiguiente();
  tramos.push({
    clave: "proyeccion",
    cargo: forecast.cargo,
    texto: "proyección",
    periodo: `proyección de ${formatoMes(inicio)} a ${formatoMes(forecast.hasta)}`,
    meses: duracion(inicio, forecast.hasta).totalMeses,
    tipo: "proyeccion",
  });
  return tramos;
}
