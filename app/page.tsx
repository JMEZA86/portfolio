import { BarraSuperior } from "@/components/BarraSuperior";
import { Card, Pendiente } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { pendientesFormacion } from "@/data/formacion";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      {/* 1. Barra superior */}
      <BarraSuperior nombre={persona.nombre} />

      <main className="mt-2 space-y-4">
        <DevTodo items={pendientesFormacion} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {/* 2. Saludo */}
          <Card id="resumen" className="sm:col-span-2 lg:col-span-3">
            <Saludo />
          </Card>
          {/* 4. Perfil */}
          <Card className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Pendiente titulo="Perfil" detalle="Foto, nombre, cargo y etiqueta Disponible." />
          </Card>
          {/* 3. Barra de balance */}
          <Card className="sm:col-span-2 lg:col-span-3">
            <Pendiente titulo="Barra de balance" detalle="Automatización vs. datos, calculado desde data/projects.ts." />
          </Card>
          {/* 5. Anillo de experiencia */}
          <Card>
            <Pendiente titulo="Experiencia" detalle="Anillo animado con el total calculado." />
          </Card>
          {/* 6. Herramientas */}
          <Card className="lg:col-span-2">
            <Pendiente titulo="Herramientas" detalle="Barras verticales: proyectos por herramienta." />
          </Card>
          {/* 7. Proyectos */}
          <Card id="proyectos" oscura className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Pendiente titulo="Proyectos" detalle="Checklist con panel expandible por proyecto." />
          </Card>
          {/* 8. Carrera y forecast */}
          <Card id="carrera" className="sm:col-span-2 lg:col-span-3">
            <Pendiente titulo="Carrera y forecast" detalle="Gantt 2012–2028 con tramo proyectado en amarillo." />
          </Card>
          {/* 9. Formación */}
          <Card className="sm:col-span-2 lg:col-span-3">
            <Pendiente titulo="Formación" detalle="Movimientos tipo extracto, marcados como Inversión." />
          </Card>
          {/* 10. Contacto */}
          <Card id="contacto" className="sm:col-span-2 lg:col-span-1">
            <Pendiente titulo="Contacto" detalle="LinkedIn y mail." />
          </Card>
        </div>
      </main>
    </div>
  );
}
