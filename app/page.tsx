import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { Balance } from "@/components/Balance";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card, Pendiente } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { Perfil } from "@/components/Perfil";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { pendientesFormacion } from "@/data/formacion";
import { formatoCorto } from "@/lib/fechas";
import { balance, experienciaTotal, tramosExperiencia } from "@/lib/resumen";

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
            <Perfil />
          </Card>
          {/* 3. Barra de balance */}
          <Card className="sm:col-span-2 lg:col-span-3">
            <Balance {...balance()} />
          </Card>
          {/* 5. Anillo de experiencia */}
          <Card>
            <AnilloExperiencia tramos={tramosExperiencia()} total={formatoCorto(experienciaTotal())} />
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
