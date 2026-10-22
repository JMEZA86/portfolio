import { persona } from "@/data/experiencia";

export function Contacto() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="text-base font-semibold tracking-tight">Contacto</h2>
      <p className="mt-1 text-[13px] text-muted">¿Hablamos? Respondo por mail o LinkedIn.</p>
      <div className="mt-auto flex flex-col gap-1.5 pt-4 text-[13px] font-medium">
        <a href={`mailto:${persona.email}`} className="flex min-h-9 items-center justify-between rounded-lg bg-ink px-3 text-card hover:bg-ink/85">
          Escribime <span aria-hidden>↗</span>
        </a>
        <a
          href={persona.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-9 items-center justify-between rounded-lg bg-track px-3 hover:bg-track/70"
        >
          LinkedIn <span aria-hidden>↗</span>
          <span className="sr-only">(se abre en otra pestaña)</span>
        </a>
      </div>
    </div>
  );
}
