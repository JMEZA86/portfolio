// Educación y herramientas. La educación se muestra como movimientos de un extracto, marcados como "Inversión".
// Las certificaciones de Coderhouse (Tableau, Data Analytics) se sacaron: ya no están vigentes.

export type Formacion = {
  titulo: string;
  institucion: string;
  desde?: string; // "AAAA"
  fecha: string; // año de cierre
};

export type Nivel = "basico" | "intermedio" | "avanzado";

export type Herramienta = {
  nombre: string;
  nivel: Nivel; // autoevaluación de Jorge
  detalle?: string;
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
  { nombre: "Excel", nivel: "avanzado" },
  { nombre: "Power Query", nivel: "avanzado" },
  { nombre: "Power BI", nivel: "intermedio" },
  { nombre: "DAX", nivel: "intermedio" },
  { nombre: "Python", nivel: "intermedio", detalle: "con IA" },
  { nombre: "Power Automate", nivel: "intermedio" },
  { nombre: "SAP FI/CO", nivel: "intermedio" },
  { nombre: "SQL", nivel: "basico" },
];

// Pendientes que se muestran solo con `npm run dev`.
export const pendientesFormacion: string[] = [];
