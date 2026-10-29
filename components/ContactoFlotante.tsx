import { persona } from "@/data/experiencia";

// Cuadro de contacto fijo abajo a la derecha: acompaña el scroll en toda la página.
// Íconos simplificados propios con los colores de cada servicio.
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

export function ContactoFlotante() {
  const whatsapp = `https://wa.me/${persona.whatsapp}?text=${encodeURIComponent(persona.mensajeWhatsapp)}`;
  const items = [
    { href: persona.linkedin, label: "LinkedIn", icono: <IconoLinkedin />, externo: true },
    { href: `mailto:${persona.email}`, label: `Mail: ${persona.email}`, icono: <IconoMail />, externo: false },
    { href: whatsapp, label: "WhatsApp", icono: <IconoWhatsapp />, externo: true },
  ];

  return (
    <nav
      id="contacto"
      aria-label="Contacto"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex items-center gap-1 rounded-full bg-ink p-1.5 pl-3.5 text-card shadow-lg shadow-ink/20 sm:right-6"
    >
      <span className="mr-1 hidden text-xs font-medium sm:inline">Contactame</span>
      {items.map((it) => (
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
      ))}
    </nav>
  );
}
