// Logos simplificados de cada herramienta, en sus colores. Son dibujos propios
// basados en la forma de cada marca (no los archivos oficiales).
import type { Logo as Clave } from "@/data/formacion";

const DIBUJOS: Record<Clave, React.ReactNode> = {
  // Excel: hoja de franjas verdes y el cuadro con la X adelante
  excel: (
    <>
      <rect x="5" y="1.5" width="10" height="13" rx="1.4" fill="#185C37" />
      <rect x="5" y="1.5" width="10" height="3.25" rx="1.4" fill="#33C481" />
      <rect x="5" y="4.75" width="10" height="3.25" fill="#21A366" />
      <rect x="5" y="8" width="10" height="3.25" fill="#107C41" />
      <path d="M10 1.5v13" stroke="#185C37" strokeOpacity=".35" strokeWidth=".6" />
      <rect x="1" y="4" width="8" height="8" rx="1.2" fill="#107C41" />
      <path d="M3.1 6l3.8 4M6.9 6l-3.8 4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  // Power BI: tres barras amarillas
  powerbi: (
    <>
      <rect x="2" y="8" width="3.2" height="6.5" rx="1" fill="#F2C811" />
      <rect x="6.4" y="5" width="3.2" height="9.5" rx="1" fill="#E8B511" />
      <rect x="10.8" y="1.5" width="3.2" height="13" rx="1" fill="#C99A06" />
    </>
  ),
  // Power Automate: flechas de flujo azules
  powerautomate: (
    <>
      <path d="M1.5 3h5.5l4 5-4 5H1.5l4-5z" fill="#0066FF" />
      <path d="M9 3h1.8l4 5-4 5H9l4-5z" fill="#66A3FF" />
    </>
  ),
  // Python: las dos piezas, azul y amarilla
  python: (
    <>
      <path d="M8 1.5c-3 0-3 1.3-3 2.4V5.5h3.2v.7H3.4C2.1 6.2 1.5 7.3 1.5 8.6s.6 2.6 1.9 2.6H5V9.4c0-1.1.9-2 2-2h3c.9 0 1.5-.7 1.5-1.5V3.9c0-1.2-1.2-2.4-3.5-2.4z" fill="#3776AB" />
      <path d="M8 14.5c3 0 3-1.3 3-2.4v-1.6H7.8v-.7h4.8c1.3 0 1.9-1.1 1.9-2.4s-.6-2.6-1.9-2.6H11v1.8c0 1.1-.9 2-2 2H6c-.9 0-1.5.7-1.5 1.5v2c0 1.2 1.2 2.4 3.5 2.4z" fill="#FFD43B" />
      <circle cx="6.6" cy="3.4" r=".8" fill="#fff" />
      <circle cx="9.4" cy="12.6" r=".8" fill="#fff" />
    </>
  ),
  // SAP: bloque azul con las letras
  sap: (
    <>
      <path d="M.5 3.5h15l-5.5 9H.5z" fill="#0A6ED1" />
      <text x="5.6" y="10.4" textAnchor="middle" fontSize="5.2" fontWeight="700" fill="#fff" fontFamily="inherit">
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
