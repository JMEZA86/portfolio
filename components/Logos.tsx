// Logos simplificados y monocromos (toman el color del texto). Son formas propias,
// inspiradas en cada herramienta, para que el tablero se vea parejo en un solo tono.
import type { Logo as Clave } from "@/data/formacion";

const DIBUJOS: Record<Clave, React.ReactNode> = {
  // Planilla con una X
  excel: (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.2l5 5.6M10.5 5.2l-5 5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  // Tres barras de altura creciente
  powerbi: (
    <>
      <rect x="2" y="8" width="3" height="6.5" rx="1" fill="currentColor" />
      <rect x="6.5" y="5" width="3" height="9.5" rx="1" fill="currentColor" />
      <rect x="11" y="1.5" width="3" height="13" rx="1" fill="currentColor" />
    </>
  ),
  // Dos flechas de flujo
  powerautomate: (
    <>
      <path d="M1.5 3h5.5l4 5-4 5H1.5l4-5z" fill="currentColor" />
      <path d="M9 3h1.8l4 5-4 5H9l4-5z" fill="currentColor" opacity="0.55" />
    </>
  ),
  // Dos piezas entrelazadas con sus "ojos"
  python: (
    <>
      <path d="M8 1.5c-3 0-3 1.3-3 2.4V5.5h3.2v.7H3.4C2.1 6.2 1.5 7.3 1.5 8.6s.6 2.6 1.9 2.6H5V9.4c0-1.1.9-2 2-2h3c.9 0 1.5-.7 1.5-1.5V3.9c0-1.2-1.2-2.4-3.5-2.4z" fill="currentColor" />
      <path d="M8 14.5c3 0 3-1.3 3-2.4v-1.6H7.8v-.7h4.8c1.3 0 1.9-1.1 1.9-2.4s-.6-2.6-1.9-2.6H11v1.8c0 1.1-.9 2-2 2H6c-.9 0-1.5.7-1.5 1.5v2c0 1.2 1.2 2.4 3.5 2.4z" fill="currentColor" opacity="0.55" />
      <circle cx="6.6" cy="3.4" r=".8" fill="var(--card)" />
      <circle cx="9.4" cy="12.6" r=".8" fill="var(--card)" />
    </>
  ),
  // Bloque trapezoidal con las letras
  sap: (
    <>
      <path d="M.5 3.5h15l-5.5 9H.5z" fill="currentColor" />
      <text x="5.6" y="10.4" textAnchor="middle" fontSize="5.2" fontWeight="700" fill="var(--card)" fontFamily="inherit">
        SAP
      </text>
    </>
  ),
};

export function Logo({ nombre, className = "size-4" }: { nombre: Clave; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`shrink-0 ${className}`}>
      {DIBUJOS[nombre]}
    </svg>
  );
}
