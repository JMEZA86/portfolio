import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  oscura?: boolean;
  id?: string;
  revelar?: boolean; // entrada suave al aparecer (no usar en la primera tarjeta)
};

export function Card({ children, className = "", oscura = false, id, revelar = true }: Props) {
  const tono = oscura ? "bg-ink text-card" : "bg-card text-ink";
  return (
    <section
      id={id}
      data-card={revelar ? "" : undefined}
      className={`rounded-card p-4 sm:p-5 ${tono} ${className}`}
    >
      {children}
    </section>
  );
}

// Marcador provisorio mientras se construye cada sección.
export function Pendiente({ titulo, detalle }: { titulo: string; detalle: string }) {
  return (
    <>
      <h2 className="text-base font-semibold tracking-tight">{titulo}</h2>
      <p className="mt-1 text-sm opacity-75">{detalle}</p>
    </>
  );
}
