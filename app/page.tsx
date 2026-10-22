import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card } from "@/components/Card";
import { DevTodo } from "@/components/DevTodo";
import { FotoCard } from "@/components/FotoCard";
import { Herramientas } from "@/components/Herramientas";
import { LineaCarrera } from "@/components/LineaCarrera";
import { MasInfo } from "@/components/MasInfo";
import { Proyectos } from "@/components/Proyectos";
import { Puestos } from "@/components/Puestos";
import { RevelarTarjetas } from "@/components/RevelarTarjetas";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { herramientas, pendientesFormacion } from "@/data/formacion";
import { proyectosPublicados } from "@/data/projects";
import { formatoCorto } from "@/lib/fechas";
import { balance, experienciaTotal, tramosCarrera, tramosExperiencia } from "@/lib/resumen";

// Disposición horizontal tipo tablero: en escritorio casi todo entra en una pantalla.
// El orden del HTML es el de celular; en escritorio cada tarjeta se ubica con col/row-start.
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <BarraSuperior nombre={persona.nombre} />
      <RevelarTarjetas />

      <main className="mt-2 space-y-5">
        <DevTodo items={pendientesFormacion} />
        <Saludo />
        <LineaCarrera tramos={tramosCarrera()} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FotoCard />
          <Card id="experiencia" className="lg:col-span-2 lg:col-start-2 lg:row-start-2">
            <Puestos />
          </Card>
          <Card id="herramientas" className="lg:col-start-2 lg:row-start-1">
            <Herramientas items={herramientas} />
          </Card>
          <Card className="lg:col-start-3 lg:row-start-1">
            <AnilloExperiencia tramos={tramosExperiencia()} total={formatoCorto(experienciaTotal())} />
          </Card>
          <Card id="proyectos" className="lg:col-start-4 lg:row-span-2 lg:row-start-1">
            <Proyectos proyectos={proyectosPublicados} balance={balance()} />
          </Card>
          <Card id="contacto" className="lg:col-start-1 lg:row-start-2">
            <MasInfo />
          </Card>
        </div>
      </main>
    </div>
  );
}
