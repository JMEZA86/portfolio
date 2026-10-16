// Cálculo de duraciones a partir de fechas "AAAA-MM".
// Cuenta meses de forma inclusiva (mayo a agosto = 4 meses), igual que LinkedIn.
// Ojo: el sitio es estático, así que "actualidad" se fija al momento del build.

export type Duracion = { anios: number; meses: number; totalMeses: number };

function aIndiceMes(fecha: string): number {
  const [a, m] = fecha.split("-").map(Number);
  return a * 12 + (m - 1);
}

export function mesActual(hoy = new Date()): string {
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`;
}

export function duracion(desde: string, hasta: string | null): Duracion {
  const total = aIndiceMes(hasta ?? mesActual()) - aIndiceMes(desde) + 1;
  return { anios: Math.floor(total / 12), meses: total % 12, totalMeses: total };
}

export function formatoCorto({ anios, meses }: Duracion): string {
  return meses ? `${anios}a ${meses}m` : `${anios}a`;
}

export function formatoLargo({ anios, meses }: Duracion): string {
  const a = `${anios} ${anios === 1 ? "año" : "años"}`;
  if (!meses) return a;
  return `${a} ${meses} ${meses === 1 ? "mes" : "meses"}`;
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function formatoMes(fecha: string): string {
  const [a, m] = fecha.split("-").map(Number);
  return `${MESES[m - 1]} ${a}`;
}
