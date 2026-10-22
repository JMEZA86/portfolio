"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useState } from "react";
import { Balance } from "@/components/Balance";
import type { Project } from "@/data/projects";

type Props = {
  proyectos: Project[];
  balance: Parameters<typeof Balance>[0];
};

// Proyectos: balance automatización/datos arriba y checklist oscura con detalle desplegable.
export function Proyectos({ proyectos, balance }: Props) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const base = useId();
  const terminados = proyectos.filter((p) => p.estado === "terminado").length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Proyectos</h2>
          <p className="text-xs text-muted">Automatización vs. datos</p>
        </div>
        <p className="text-[1.75rem] font-medium leading-none tracking-[-0.04em]">{proyectos.length}</p>
      </div>
      <div className="mt-3">
        <Balance {...balance} />
      </div>

      <div className="mt-3 flex-1 rounded-xl bg-ink p-3 text-card">
        <div className="flex items-baseline justify-between px-1">
          <h3 className="text-sm font-medium">Terminados</h3>
          <span className="text-lg font-medium tabular-nums">
            {terminados}/{proyectos.length}
          </span>
        </div>
        <ul className="mt-2">
          {proyectos.map((p) => {
            const id = `${base}-${p.slug}`;
            const estaAbierto = abierto === p.slug;
            return (
              <li key={p.slug} className="border-t border-white/10 first:border-t-0">
                <button
                  type="button"
                  aria-expanded={estaAbierto}
                  aria-controls={id}
                  onClick={() => setAbierto(estaAbierto ? null : p.slug)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-1 py-2 text-left text-[13px] leading-snug hover:bg-white/5"
                >
                  {p.estado === "terminado" ? (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent">
                      <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                        <path d="M2.5 6.5l2.2 2.2L9.5 3.8" stroke="var(--ink)" strokeWidth="1.8" fill="none" />
                      </svg>
                    </span>
                  ) : (
                    <span className="size-5 shrink-0 rounded-full border-2 border-white/40" />
                  )}
                  <span className="min-w-0 flex-1">{p.nombre}</span>
                  <span className="sr-only">{p.estado === "terminado" ? "(terminado)" : "(en curso)"}</span>
                  <svg aria-hidden viewBox="0 0 16 16" className={`size-3.5 shrink-0 transition-transform ${estaAbierto ? "rotate-180" : ""}`}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {estaAbierto && (
                    <m.div
                      id={id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-8 pr-1">
                        {p.descripcion && (
                          <p className="text-xs leading-relaxed text-card/80">{p.descripcion}</p>
                        )}
                        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Herramientas">
                          {p.herramientas.map((h) => (
                            <li key={h} className="rounded-full border border-white/20 px-2 py-0.5 text-[11px]">
                              {h}
                            </li>
                          ))}
                        </ul>
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2.5 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink"
                          >
                            Ver proyecto ↗
                          </a>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
