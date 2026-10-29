"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { persona } from "@/data/experiencia";

// Contacto fijo que acompaña el scroll. Íconos simplificados propios con los colores de cada servicio.
// - Pantallas anchas (xl): barra vertical siempre abierta, en el margen derecho, fuera del contenido.
// - Pantallas chicas: un botón redondo que despliega los íconos hacia arriba, para tapar lo mínimo.
function IconoLinkedin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <circle cx="7" cy="7.2" r="1.7" fill="#fff" />
      <rect x="5.4" y="9.8" width="3.2" height="8.6" rx=".6" fill="#fff" />
      <path
        d="M10.8 9.8h3v1.3c.5-.9 1.6-1.5 2.9-1.5 2.2 0 3.1 1.4 3.1 3.8v5h-3.2v-4.5c0-1.1-.3-1.9-1.4-1.9-1 0-1.4.8-1.4 1.9v4.5h-3z"
        fill="#fff"
      />
    </svg>
  );
}

function IconoMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <rect x="1.5" y="4.5" width="21" height="15" rx="2.5" fill="var(--accent)" />
      <path d="M3 6.5l9 6.5 9-6.5" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconoWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" fill="#25D366" />
      <path
        d="M8.6 7.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6a7 7 0 003.3 2.9c.3.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.4.4 0 .3 0 1.3-.8 1.9-.7.6-1.6.8-2.7.5a10 10 0 01-5.9-5.2c-.6-1.3-.6-2.7.3-3.6z"
        fill="#fff"
      />
    </svg>
  );
}

function IconoChat({ abierto }: { abierto: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      {abierto ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path
          d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 014 13.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function ContactoFlotante() {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const whatsapp = `https://wa.me/${persona.whatsapp}?text=${encodeURIComponent(persona.mensajeWhatsapp)}`;
  const items = [
    { href: persona.linkedin, label: "LinkedIn", icono: <IconoLinkedin />, externo: true },
    { href: `mailto:${persona.email}`, label: `Mail: ${persona.email}`, icono: <IconoMail />, externo: false },
    { href: whatsapp, label: "WhatsApp", icono: <IconoWhatsapp />, externo: true },
  ];

  // Cerrar el desplegable con Escape o tocando afuera
  useEffect(() => {
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    const toque = (e: PointerEvent) => !caja.current?.contains(e.target as Node) && setAbierto(false);
    document.addEventListener("keydown", tecla);
    document.addEventListener("pointerdown", toque);
    return () => {
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("pointerdown", toque);
    };
  }, [abierto]);

  const enlace = (it: (typeof items)[number]) => (
    <a
      key={it.label}
      href={it.href}
      {...(it.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={it.externo ? `${it.label} (se abre en otra pestaña)` : it.label}
      title={it.label}
      className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
    >
      {it.icono}
    </a>
  );

  return (
    <div id="contacto">
      {/* Pantallas anchas: barra vertical en el margen, fuera del contenido (max-w-6xl = 72rem) */}
      <nav
        aria-label="Contacto"
        className="fixed top-1/2 right-[max(0.75rem,calc((100vw-72rem)/2-4.5rem))] z-30 hidden -translate-y-1/2 flex-col gap-1.5 rounded-full bg-ink p-1.5 shadow-lg shadow-ink/20 xl:flex"
      >
        {items.map(enlace)}
      </nav>

      {/* Pantallas chicas: botón que despliega */}
      <div
        ref={caja}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-2 xl:hidden"
      >
        <AnimatePresence>
          {abierto && (
            <m.nav
              id="contacto-opciones"
              aria-label="Contacto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1.5 rounded-full bg-ink p-1.5 shadow-lg shadow-ink/20"
            >
              {items.map(enlace)}
            </m.nav>
          )}
        </AnimatePresence>
        <button
          type="button"
          aria-expanded={abierto}
          aria-controls="contacto-opciones"
          aria-label={abierto ? "Cerrar contacto" : "Abrir contacto"}
          onClick={() => setAbierto((v) => !v)}
          className="grid size-12 place-items-center rounded-full bg-ink text-card shadow-lg shadow-ink/25"
        >
          <IconoChat abierto={abierto} />
        </button>
      </div>
    </div>
  );
}
