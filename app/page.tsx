import { AnilloExperiencia } from "@/components/AnilloExperiencia";
import { BarraSuperior } from "@/components/BarraSuperior";
import { Card } from "@/components/Card";
import { ContactoFlotante } from "@/components/ContactoFlotante";
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
import { balance, experienciaTotal, tramosCarrera, tramosExperiencia } from "@/lib/resumen";

// Disposición horizontal tipo tablero. El orden del HTML es el de celular.
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <BarraSuperior nombre={persona.nombre} />
      <RevelarTarjetas />

      <ResaltadoProvider>
        <main className="mt-2 space-y-5">
          <DevTodo items={pendientesFormacion} />
          <Saludo />
          <LineaCarrera tramos={tramosCarrera()} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Fila 1: experiencia laboral + trayectoria */}
            <Card id="experiencia" className="sm:col-span-2 lg:col-span-3">
              <Puestos />
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1">
              <AnilloExperiencia tramos={tramosExperiencia()} total={formatoCorto(experienciaTotal())} />
            </Card>

            {/* Fila 2: herramientas + formación */}
            <Card id="herramientas" className="sm:col-span-2">
              <Herramientas items={herramientas} />
            </Card>
            <Card className="sm:col-span-2">
              <Formacion />
            </Card>

            {/* Fila 3: proyectos a lo ancho (lugar para la futura galería) */}
            <Card id="proyectos" className="sm:col-span-2 lg:col-span-4">
              <Proyectos proyectos={proyectosPublicados} balance={balance()} />
            </Card>
          </div>
        </main>
      </ResaltadoProvider>

      <ContactoFlotante />
    </div>
  );
}
