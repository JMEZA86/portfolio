import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card } from "@/components/Card";
import { Contacto } from "@/components/Contacto";
import { DevTodo } from "@/components/DevTodo";
import { Formacion } from "@/components/Formacion";
import { Herramientas } from "@/components/Herramientas";
import { LineaCarrera } from "@/components/LineaCarrera";
import { Proyectos } from "@/components/Proyectos";
import { Puestos } from "@/components/Puestos";
import { ResaltadoProvider } from "@/components/Resaltado";
import { RevelarTarjetas } from "@/components/RevelarTarjetas";
import { Saludo } from "@/components/Saludo";
import { persona } from "@/data/experiencia";
import { herramientas, pendientesFormacion } from "@/data/formacion";
import { proyectosPublicados } from "@/data/projects";
import { formatoCorto } from "@/lib/fechas";
import {
  balance,
  experienciaTotal,
  tramosCarrera,
  tramosExperiencia,
} from "@/lib/resumen";

// Disposición horizontal tipo tablero: en escritorio casi todo entra en una pantalla.
// El orden del HTML es el de celular; en escritorio cada tarjeta se ubica con col/row-start.
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <BarraSuperior nombre={persona.nombre} />
      <RevelarTarjetas />

      <ResaltadoProvider>
        <main className="mt-2 space-y-5">
          <DevTodo items={pendientesFormacion} />
          <Saludo />
          <LineaCarrera tramos={tramosCarrera()} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              id="experiencia"
              className="sm:col-span-2 lg:col-start-1 lg:row-start-1"
            >
              <Puestos />
            </Card>
            <Card className="lg:col-start-1 lg:row-start-2">
              <AnilloExperiencia
                tramos={tramosExperiencia()}
                total={formatoCorto(experienciaTotal())}
              />
            </Card>
            <Card id="herramientas" className="lg:col-start-3 lg:row-start-1">
              <Herramientas items={herramientas} />
            </Card>
            <Card
              id="proyectos"
              className="sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1"
            >
              <Proyectos proyectos={proyectosPublicados} balance={balance()} />
            </Card>
            <Card className="lg:col-start-2 lg:row-start-2">
              <Formacion />
            </Card>
            <Card id="contacto" className="lg:col-start-3 lg:row-start-2">
              <Contacto />
            </Card>
          </div>
        </main>
      </ResaltadoProvider>
    </div>
  );
}
