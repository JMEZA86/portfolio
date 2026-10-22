// Línea de carrera. Las duraciones y el total se calculan desde estas fechas (lib/fechas.ts).
// Fechas en formato "AAAA-MM". `hasta: null` = actualidad.

export type Puesto = {
  cargo: string;
  cargoCorto: string; // para gráficos con poco espacio
  organizacion: string;
  desde: string;
  hasta: string | null;
  tareas: string[]; // se muestran en el detalle de la línea de carrera
  proyeccion?: false;
};

export type Proyeccion = {
  cargo: string;
  desde: string | null; // null = arranca el mes siguiente al actual
  hasta: string;
  proyeccion: true; // tramo de forecast: se pinta en amarillo
};

export const persona = {
  nombre: "Jorge Meza",
  saludo: "Hola, soy Jorge",
  nombreCompleto: "Jorge Ismael Meza",
  ubicacion: "Buenos Aires, Argentina",
  // TODO: el CV dice "Control de Gestión" y el brief "Control Presupuestario". Unificar.
  cargoActual: "Analista de Presupuesto y Control Presupuestario",
  perfil:
    "Licenciado en Administración con experiencia en control de gestión, planificación presupuestaria y análisis financiero. Perfil analítico, con foco en automatización y mejora continua.",
  // Bajada del inicio: qué hace en una línea (revisar en la pasada de textos)
  bajada: "Analista de presupuesto. Automatizo procesos y analizo datos con Excel, Power BI y Python.",
  disponible: "Disponible · Data Analytics",
  foto: "/jorge.png",
  linkedin: "https://www.linkedin.com/in/jorge-meza",
  email: "mezajorgeismael@gmail.com", // del CV; el teléfono no se publica
};

// Organización del anillo "en el Consejo"
export const CONSEJO = "Consejo Profesional de Ciencias Económicas de la CABA";

export const experiencia: Puesto[] = [
  {
    cargo: "Supervisor",
    cargoCorto: "Supervisor",
    organizacion: "Starbucks",
    desde: "2009-11",
    hasta: "2012-05",
    tareas: [], // TODO: 2 o 3 tareas que cuente Jorge
  },
  {
    cargo: "Cajero",
    cargoCorto: "Cajero",
    organizacion: CONSEJO,
    desde: "2012-05",
    hasta: "2020-08",
    tareas: ["Manejo de caja", "Operaciones contables básicas", "Atención al público"],
  },
  {
    cargo: "Auxiliar administrativo de Tesorería",
    cargoCorto: "Tesorería",
    organizacion: CONSEJO,
    desde: "2020-08",
    hasta: "2022-09",
    tareas: ["Gestión de pagos a proveedores", "Conciliaciones bancarias", "Control de flujos de caja"],
  },
  {
    cargo: "Analista de Presupuesto y Control Presupuestario",
    cargoCorto: "Analista de Presupuesto",
    organizacion: CONSEJO,
    desde: "2022-09",
    hasta: null,
    tareas: [
      "Planificación y control de la ejecución presupuestaria anual",
      "Análisis de desvíos y variaciones mensuales",
      "Informes de gestión para la Dirección",
      "Seguimiento de indicadores financieros y operativos",
      "Automatización de reportes con Excel, Power Query y DAX",
    ],
  },
];

export const forecast: Proyeccion = {
  cargo: "Data Analyst",
  desde: null,
  hasta: "2028-12",
  proyeccion: true,
};

// Rango del eje del Gantt
export const ejeCarrera = { desde: 2009, hasta: 2028 };

// Del CV. Por ahora no tienen sección propia; quedan disponibles para el perfil o el chat de la fase 2.
export const habilidades = [
  "Control de Gestión",
  "Planificación Presupuestaria",
  "Reporting Ejecutivo",
  "Excel Avanzado",
  "Power BI",
  "Power Query",
  "SQL",
  "SAP",
  "Automatización de Procesos",
];

export const idiomas = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Intermedio (B1)" },
];
