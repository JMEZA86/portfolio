// Proyectos del portfolio. Todo lo que muestra el sitio sobre proyectos sale de acá.
// Regla de confidencialidad: nada de proveedores, montos, cuentas, socios ni detalles internos.

export type Area = "automatizacion" | "datos";

export type Project = {
  slug: string;
  nombre: string;
  descripcion: string; // una o dos líneas, sin datos internos
  herramientas: string[];
  estado: "terminado" | "en-curso";
  area: Area; // alimenta la barra de balance automatización / datos
  link?: string; // demo o repo; si falta, no mostrar botón
  oculto?: boolean; // true = no se publica todavía
};

export const projects: Project[] = [
  {
    slug: "axi-a-sap",
    nombre: "Distribución AXI a SAP",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Python", "SAP"],
    estado: "terminado",
    area: "automatizacion",
  },
  {
    slug: "conciliacion-bancaria-sap",
    nombre: "Conciliación bancaria con SAP",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Python", "SAP FI/CO"],
    estado: "terminado",
    area: "automatizacion",
  },
  {
    slug: "pagos-power-automate",
    nombre: "Pagos con Power Automate",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Power Automate", "Python", "Graph API", "SharePoint", "Outlook", "IA"],
    estado: "terminado",
    area: "automatizacion",
  },
  {
    slug: "liquidaciones-tarjeta",
    nombre: "Liquidaciones de tarjeta (PDF a Excel)",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Python", "Excel"],
    estado: "terminado",
    area: "automatizacion",
  },
  {
    slug: "liquidaciones-simeco-dep",
    nombre: "Liquidaciones SIMECO/DEP",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Python", "Power Query"],
    estado: "terminado",
    area: "automatizacion",
  },
  {
    slug: "tenencia-cartera",
    nombre: "Tenencia de cartera",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Power BI", "DAX"],
    estado: "terminado",
    area: "datos",
  },
  {
    slug: "reportes-cierre",
    nombre: "Reportes de cierre de ejercicio",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Excel", "DAX", "Power Query"],
    estado: "terminado",
    area: "datos",
  },
  {
    slug: "comparador-supermercados",
    nombre: "Comparador de precios de supermercados",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["IA", "Mapas"],
    estado: "en-curso",
    area: "datos",
    oculto: true, // todavía no funciona: no se publica por ahora
  },
  {
    slug: "contar-con-datos-2026",
    nombre: "Contar con Datos 2026",
    descripcion: "TODO: descripción de Jorge.",
    herramientas: ["Visualización de datos"],
    estado: "en-curso",
    area: "datos",
    oculto: true, // se publica después del anuncio de ganadores de Contar con Datos
  },
];

// Lo que efectivamente muestra el sitio.
export const proyectosPublicados = projects.filter((p) => !p.oculto);
