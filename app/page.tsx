import { Card, Pendiente } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { persona } from "@/data/experiencia";
import { pendientesFormacion } from "@/data/formacion";

const menu = [
  { href: "#resumen", label: "Resumen" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#carrera", label: "Carrera" },
  { href: "#contacto", label: "Contacto" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      {/* 1. Barra superior */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-bg/90 py-4 backdrop-blur">
        <a href="#resumen" className="rounded-full bg-card px-4 py-2 text-sm font-semibold">
          {persona.nombre}
        </a>
        <nav aria-label="Secciones" className="text-sm">
          {/* TODO: armar menú real (paso 1) */}
          <ul className="flex gap-1">
            {menu.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="rounded-full px-3 py-2 hover:bg-card">
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="space-y-4">
        <DevTodo items={pendientesFormacion} />

        {/* 2–3. Saludo + barra de balance */}
        <Card id="resumen">
          <Pendiente titulo="Saludo" detalle="“Hola, soy Jorge” + años, proyectos y certificaciones (contadores)." />
        </Card>
        <Card>
          <Pendiente titulo="Barra de balance" detalle="Automatización vs. datos, calculado desde data/projects.ts." />
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* 4. Perfil */}
          <Card>
            <Pendiente titulo="Perfil" detalle="Foto, nombre, cargo y etiqueta Disponible." />
          </Card>
          {/* 5. Anillo de experiencia */}
          <Card>
            <Pendiente titulo="Experiencia" detalle="Anillo animado con el total calculado." />
          </Card>
          {/* 6. Herramientas */}
          <Card className="sm:col-span-2">
            <Pendiente titulo="Herramientas" detalle="Barras verticales: proyectos por herramienta." />
          </Card>
          {/* 7. Proyectos */}
          <Card id="proyectos" oscura className="sm:col-span-2 lg:col-span-2">
            <Pendiente titulo="Proyectos" detalle="Checklist con panel expandible por proyecto." />
          </Card>
          {/* 8. Carrera y forecast */}
          <Card id="carrera" className="sm:col-span-2 lg:col-span-2">
            <Pendiente titulo="Carrera y forecast" detalle="Gantt 2012–2028 con tramo proyectado en amarillo." />
          </Card>
          {/* 9. Certificaciones y educación */}
          <Card className="sm:col-span-2 lg:col-span-3">
            <Pendiente titulo="Formación" detalle="Movimientos tipo extracto, marcados como Inversión." />
          </Card>
          {/* 10. Contacto */}
          <Card id="contacto">
            <Pendiente titulo="Contacto" detalle="LinkedIn y mail." />
          </Card>
        </div>
      </main>
    </div>
  );
}
