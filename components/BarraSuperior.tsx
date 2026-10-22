"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const menu = [
  { id: "inicio", label: "Resumen" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

function useSeccionActiva() {
  const [activa, setActiva] = useState(menu[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.find((e) => e.isIntersecting);
        if (visible) setActiva(visible.target.id);
      },
      // Cuenta como activa la sección que cruza la franja superior de la pantalla
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const { id } of menu) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
  return activa;
}

export function BarraSuperior({ nombre }: { nombre: string }) {
  const activa = useSeccionActiva();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  // Cerrar el menú del celular con Escape o tocando afuera
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    const alTocar = (e: PointerEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("pointerdown", alTocar);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("pointerdown", alTocar);
    };
  }, [abierto]);

  const enlace = (id: string) =>
    activa === id ? "bg-ink text-card" : "text-ink hover:bg-track";

  return (
    <header className="sticky top-0 z-20 -mx-4 bg-bg/90 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
      <div ref={contenedor} className="relative flex items-center justify-between gap-3">
        <a
          href="#inicio"
          className="flex items-center gap-2 rounded-full bg-card py-2 pl-3 pr-4 text-sm font-semibold tracking-tight"
        >
          <span aria-hidden className="size-2.5 rounded-full bg-accent" />
          {nombre}
        </a>

        {/* Escritorio y tablet: menú en pastilla */}
        <nav aria-label="Secciones" className="hidden sm:block">
          <ul className="flex gap-1 rounded-full bg-card p-1 text-sm font-medium">
            {menu.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activa === id ? "location" : undefined}
                  className={`block rounded-full px-4 py-1.5 transition-colors ${enlace(id)}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Celular: botón que despliega el menú */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium sm:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          Menú
          <svg aria-hidden viewBox="0 0 16 16" className="size-4">
            {abierto ? (
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M2.5 5h11M2.5 11h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <AnimatePresence>
          {abierto && (
            <m.nav
              id="menu-movil"
              aria-label="Secciones"
              className="absolute right-0 top-full mt-2 w-48 rounded-card bg-card p-2 shadow-sm ring-1 ring-ink/15 sm:hidden"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <ul className="text-base font-medium">
                {menu.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={activa === id ? "location" : undefined}
                      onClick={() => setAbierto(false)}
                      className={`block rounded-xl px-3 py-2.5 ${enlace(id)}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
