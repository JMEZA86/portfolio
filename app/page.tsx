import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { Balance } from "@/components/Balance";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card, Pendiente } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { Herramientas } from "@/components/Herramientas";
import { Perfil } from "@/components/Perfil";
import { Puestos } from "@/components/Puestos";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { herramientas, pendientesFormacion } from "@/data/formacion";
import { formatoCorto } from "@/lib/fechas";
import { balance, experienciaTotal, tramosExperiencia } from "@/lib/resumen";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <BarraSuperior nombre={persona.nombre} />

      <main className="mt-2 space-y-4">
        <DevTodo items={pendientesFormacion} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {/* Inicio: saludo + perfil */}
          <Card id="inicio" className="sm:col-span-2 lg:col-span-3">
            <Saludo />
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Perfil />
          </Card>

          {/* Experiencia: anillo + puestos, y la línea de carrera con forecast */}
          <Card id="experiencia">
            <AnilloExperiencia tramos={tramosExperiencia()} total={formatoCorto(experienciaTotal())} />
          </Card>
          <Card className="lg:col-span-2">
            <Puestos />
          </Card>
          <Card id="carrera" className="sm:col-span-2 lg:col-span-4">
            <Pendiente titulo="Carrera y forecast" detalle="Gantt 2012–2028 con tramo proyectado en amarillo." />
          </Card>

          {/* Herramientas y proyectos */}
          <Card id="herramientas" className="lg:col-span-2">
            <Herramientas items={herramientas} />
          </Card>
          <Card id="proyectos" oscura className="lg:col-span-2">
            <h2 className="text-lg font-semibold tracking-tight">Proyectos</h2>
            <p className="text-[13px] text-card/75">Automatización vs. datos</p>
            <div className="mt-3">
              <Balance {...balance()} />
            </div>
            <p className="mt-6 text-sm text-card/75">Checklist con panel expandible por proyecto (próxima sección).</p>
          </Card>

          {/* Formación y contacto */}
          <Card className="sm:col-span-2 lg:col-span-3">
            <Pendiente titulo="Formación" detalle="Movimientos tipo extracto, marcados como Inversión." />
          </Card>
          <Card id="contacto" className="sm:col-span-2 lg:col-span-1">
            <Pendiente titulo="Contacto" detalle="LinkedIn y mail." />
          </Card>
        </div>
      </main>
    </div>
  );
}
