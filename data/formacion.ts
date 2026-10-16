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
  nivel?: string; // si falta, se muestra solo el nombre
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
  { nombre: "Power BI", nivel: "Intermedio-avanzado" },
  { nombre: "Excel", nivel: "Avanzado" },
  { nombre: "Automatizaciones con Python", nivel: "Asistidas con IA" },
  { nombre: "Power Automate" }, // TODO: nivel
];

// Pendientes que se muestran solo con `npm run dev`.
export const pendientesFormacion: string[] = [];
