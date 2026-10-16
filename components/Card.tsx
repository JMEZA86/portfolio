import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  oscura?: boolean;
  id?: string;
};

export function Card({ children, className = "", oscura = false, id }: Props) {
  const tono = oscura ? "bg-ink text-card" : "bg-card text-ink";
  return (
    <section id={id} className={`rounded-card p-5 sm:p-6 ${tono} ${className}`}>
      {children}
    </section>
  );
}

// Marcador provisorio mientras se construye cada sección.
export function Pendiente({ titulo, detalle }: { titulo: string; detalle: string }) {
  return (
    <>
      <h2 className="text-lg font-semibold tracking-tight">{titulo}</h2>
      <p className="mt-1 text-sm opacity-75">{detalle}</p>
    </>
  );
}
