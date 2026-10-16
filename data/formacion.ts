// Educación y certificaciones. Se muestran como movimientos de un extracto, marcados como "Inversión".

export type Formacion = {
  titulo: string;
  institucion: string;
  tipo: "educacion" | "certificacion";
  desde?: string; // "AAAA-MM" o "AAAA"
  fecha: string; // fecha de cierre / emisión
};

export const formacion: Formacion[] = [
  {
    titulo: "Licenciado en Administración",
    institucion: "Universidad de Buenos Aires",
    tipo: "educacion",
    desde: "2013",
    fecha: "2023",
  },
  {
    titulo: "Tableau",
    institucion: "Coderhouse",
    tipo: "certificacion",
    fecha: "2024-01",
  },
  {
    titulo: "Data Analytics (SQL/Power BI)",
    institucion: "Coderhouse",
    tipo: "certificacion",
    fecha: "2024-05",
  },
  // TODO: falta la tercera certificación de LinkedIn (se avisa en pantalla solo en desarrollo).
];

export const pendientesFormacion = [
  "Falta cargar la tercera certificación de LinkedIn en data/formacion.ts",
];
