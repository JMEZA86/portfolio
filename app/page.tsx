import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { Balance } from "@/components/Balance";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card, Pendiente } from "@/components/Card";
import { Carrera } from "@/components/Carrera";
import { DevTodo } from "@/components/DevTodo";
import { Herramientas } from "@/components/Herramientas";
import { Puestos } from "@/components/Puestos";
import { RevelarTarjetas } from "@/components/RevelarTarjetas";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { herramientas, pendientesFormacion } from "@/data/formacion";
import { formatoCorto } from "@/lib/fechas";
import { balance, experienciaTotal, lineaDeCarrera, tramosExperiencia } from "@/lib/resumen";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
      <BarraSuperior nombre={persona.nombre} />
      <RevelarTarjetas />

      <main className="mt-1 space-y-3">
        <DevTodo items={pendientesFormacion} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Inicio: quién es, qué hace, números y contacto. Sin animación de entrada (es lo primero que se ve). */}
          <Card id="inicio" revelar={false} className="sm:col-span-2 lg:col-span-4">
            <Saludo />
          </Card>

          {/* Experiencia */}
          {/* En celular primero lo que hace (puestos); en escritorio anillo | puestos | herramientas */}
          <Card id="experiencia" className="lg:col-span-2 lg:col-start-2 lg:row-start-2">
            <Puestos />
          </Card>
          <Card className="lg:col-start-1 lg:row-start-2">
            <AnilloExperiencia tramos={tramosExperiencia()} total={formatoCorto(experienciaTotal())} />
          </Card>
          <Card id="herramientas" className="lg:col-start-4 lg:row-start-2">
            <Herramientas items={herramientas} />
          </Card>
          <Card id="carrera" className="sm:col-span-2 lg:col-span-4">
            <Carrera {...lineaDeCarrera()} />
          </Card>

          {/* Proyectos, formación y contacto */}
          <Card id="proyectos" oscura className="sm:col-span-2">
            <h2 className="text-base font-semibold tracking-tight">Proyectos</h2>
            <p className="text-xs text-card/75">Automatización vs. datos</p>
            <div className="mt-3">
              <Balance {...balance()} />
            </div>
            <p className="mt-5 text-sm text-card/75">Checklist con panel expandible por proyecto (próxima sección).</p>
          </Card>
          <Card>
            <Pendiente titulo="Formación" detalle="Movimientos tipo extracto, marcados como Inversión." />
          </Card>
          <Card id="contacto">
            <Pendiente titulo="Contacto" detalle="LinkedIn y mail." />
          </Card>
        </div>
      </main>
    </div>
  );
}
