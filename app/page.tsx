import { BarraSuperior } from "@/components/BarraSuperior";
import { Card, Pendiente } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { persona } from "@/data/experiencia";
import { pendientesFormacion } from "@/data/formacion";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      {/* 1. Barra superior */}
      <BarraSuperior nombre={persona.nombre} />

      <main className="mt-2 space-y-4">
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
