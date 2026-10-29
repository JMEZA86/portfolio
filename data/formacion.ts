// Educación y herramientas. La educación se muestra como movimientos de un extracto, marcados como "Inversión".
// Las certificaciones de Coderhouse (Tableau, Data Analytics) se sacaron: ya no están vigentes.

export type Formacion = {
  titulo: string;
  institucion: string;
  desde?: string; // "AAAA"
  fecha: string; // año de cierre
};

export type Nivel = "basico" | "intermedio" | "avanzado";

export type Logo = "excel" | "powerbi" | "powerautomate" | "python" | "sap";

export type Herramienta = {
  nombre: string;
  nivel: Nivel; // autoevaluación de Jorge
  detalle?: string;
  logos?: Logo[]; // íconos al lado del nombre; sin logos no se muestra nada
};

export const formacion: Formacion[] = [
  {
    titulo: "Licenciado en Administración",
    institucion: "Universidad de Buenos Aires",
    desde: "2013",
    fecha: "2023",
  },
];

// Herramientas con nivel de conocimiento. Se muestran en la sección "Herramientas".
export const herramientas: Herramienta[] = [
  { nombre: "Excel", nivel: "avanzado", logos: ["excel"] },
  // Power Query y DAX se usan dentro de Excel y de Power BI
  { nombre: "Power Query", nivel: "avanzado", logos: ["excel", "powerbi"] },
  { nombre: "Power BI", nivel: "intermedio", logos: ["powerbi"] },
  { nombre: "DAX", nivel: "intermedio", logos: ["excel", "powerbi"] },
  { nombre: "Python", nivel: "intermedio", detalle: "con IA", logos: ["python"] },
  { nombre: "Power Automate", nivel: "intermedio", logos: ["powerautomate"] },
  { nombre: "SAP FI/CO", nivel: "intermedio", logos: ["sap"] },
  { nombre: "SQL", nivel: "basico" },
];

// Pendientes que se muestran solo con `npm run dev`.
export const pendientesFormacion: string[] = [];
