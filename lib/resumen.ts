// Números derivados de data/. Ningún componente escribe cifras a mano.
import { proyectosPublicados as projects, type Area } from "@/data/projects";
import { CONSEJO, ejeCarrera, experiencia, forecast, type Puesto } from "@/data/experiencia";
import { herramientas } from "@/data/formacion";
import type { Fila } from "@/components/Carrera";
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
      return { cargo: p.cargoCorto, meses: d.totalMeses, texto: formatoCorto(d) };
    });
}

// Filas del Gantt: todos los puestos en orden y al final el tramo proyectado.
// Fechas "AAAA-MM" a año decimal; `hasta` cubre el mes completo.
export function lineaDeCarrera() {
  const anio = (f: string) => Number(f.slice(0, 4)) + (Number(f.slice(5, 7)) - 1) / 12;
  const finDeMes = (f: string) => anio(f) + 1 / 12;
  const hoy = mesActual();
  const filas: Fila[] = [...experiencia]
    .sort((a, b) => a.desde.localeCompare(b.desde))
    .map((p) => ({
      cargo: p.organizacion === CONSEJO ? p.cargoCorto : `${p.cargoCorto} · ${p.organizacion}`,
      detalle: formatoCorto(duracion(p.desde, p.hasta)),
      periodo: `${formatoMes(p.desde)} a ${p.hasta ? formatoMes(p.hasta) : "la actualidad"}`,
      desde: anio(p.desde),
      hasta: finDeMes(p.hasta ?? hoy),
    }));
  const inicioForecast = forecast.desde ?? mesSiguiente();
  filas.push({
    cargo: forecast.cargo,
    detalle: "Proyección",
    periodo: `proyección de ${formatoMes(inicioForecast)} a ${formatoMes(forecast.hasta)}`,
    desde: anio(inicioForecast),
    hasta: finDeMes(forecast.hasta),
    proyeccion: true,
  });
  return {
    filas,
    eje: { desde: ejeCarrera.desde, hasta: ejeCarrera.hasta + 1 },
    hoy: { valor: finDeMes(hoy), texto: formatoMes(hoy) },
  };
}
