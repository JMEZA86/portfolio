// Coordinación con la animación de inicio: las animaciones del tablero esperan
// a que la intro termine (si se está mostrando) para arrancar cuando se ven.
export const EVENTO_FIN_INTRO = "intro:fin";

export function introActiva() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("intro-activa")
  );
}

// Se marca cuando las puertas empiezan a abrirse: ahí arranca el armado del tablero.
let abierta = false;
export function marcarIntroAbierta() {
  abierta = true;
  window.dispatchEvent(new Event(EVENTO_FIN_INTRO));
}

export function esperarIntro(): Promise<void> {
  if (abierta || !introActiva()) return Promise.resolve();
  return new Promise((listo) =>
    window.addEventListener(EVENTO_FIN_INTRO, () => listo(), { once: true }),
  );
}
