// Educación y conocimientos. Se muestran como movimientos de un extracto, marcados como "Inversión".
// Las certificaciones de Coderhouse (Tableau, Data Analytics) se sacaron: ya no están vigentes.

export type Formacion = {
  titulo: string;
  institucion: string;
  desde?: string; // "AAAA"
  fecha: string; // año de cierre
};

export type Conocimiento = {
  nombre: string;
  detalle?: string; // aclaración opcional (no se usan niveles)
};

export const formacion: Formacion[] = [
  {
    titulo: "Licenciado en Administración",
    institucion: "Universidad de Buenos Aires",
    desde: "2013",
    fecha: "2023",
  },
];

export const conocimientos: Conocimiento[] = [
  { nombre: "Power BI" },
  { nombre: "Excel" },
  { nombre: "Automatizaciones con Python", detalle: "Asistidas con IA" },
  { nombre: "Power Automate" },
];

// Pendientes que se muestran solo con `npm run dev`.
export const pendientesFormacion: string[] = [];
