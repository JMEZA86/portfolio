// Línea de carrera. Las duraciones y el total se calculan desde estas fechas (lib/fechas.ts).
// Fechas en formato "AAAA-MM". `hasta: null` = actualidad.

export type Puesto = {
  cargo: string;
  organizacion: string;
  desde: string;
  hasta: string | null;
  proyeccion?: false;
};

export type Proyeccion = {
  cargo: string;
  desde: string;
  hasta: string;
  proyeccion: true; // tramo de forecast: se pinta en amarillo
};

export const persona = {
  nombre: "Jorge Meza",
  saludo: "Hola, soy Jorge",
  cargoActual: "Analista de Presupuesto y Control Presupuestario",
  disponible: "Disponible · Data Analytics",
  foto: "/jorge.png",
  linkedin: "https://www.linkedin.com/in/TODO", // TODO: URL real de LinkedIn
  email: "TODO@ejemplo.com", // TODO: mail de contacto público que quieras mostrar
};

export const experiencia: Puesto[] = [
  {
    cargo: "Cajero",
    organizacion: "Consejo Profesional de Ciencias Económicas de la CABA",
    desde: "2012-05",
    hasta: "2020-08",
  },
  {
    cargo: "Auxiliar administrativo de Tesorería",
    organizacion: "Consejo Profesional de Ciencias Económicas de la CABA",
    desde: "2020-08",
    hasta: "2022-09",
  },
  {
    cargo: "Analista de Presupuesto y Control Presupuestario",
    organizacion: "Consejo Profesional de Ciencias Económicas de la CABA",
    desde: "2022-09",
    hasta: null,
  },
];

export const forecast: Proyeccion = {
  cargo: "Data Analyst",
  desde: "2027-01", // TODO: confirmar inicio del tramo proyectado
  hasta: "2028-12",
  proyeccion: true,
};

// Rango del eje del Gantt
export const ejeCarrera = { desde: 2012, hasta: 2028 };
