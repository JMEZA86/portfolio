"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { introActiva, marcarIntroAbierta } from "@/lib/intro";

type Fase = "mostrando" | "abriendo" | "fin";

const MOSTRAR_MS = 1500; // tiempo con la foto y el nombre a la vista
const ABRIR_MS = 750; // duración de la apertura en dos mitades

// Animación de inicio: foto, nombre y bajada sobre fondo oscuro; después se abre
// por la mitad como dos puertas y aparece el portfolio.
// Solo se muestra si el script del <head> marcó "intro-activa" (hay JS, no hay
// movimiento reducido y es la primera vez en la sesión). Se saltea con clic o tecla.
export function Intro({
  foto,
  nombre,
  bajada,
}: {
  foto: ReactNode;
  nombre: string;
  bajada: string;
}) {
  const [fase, setFase] = useState<Fase>("mostrando");
  const timers = useRef<number[]>([]);

  const terminar = useCallback(() => {
    document.documentElement.classList.remove("intro-activa");
    try {
      sessionStorage.setItem("intro-vista", "1");
    } catch {}
    setFase("fin");
  }, []);

  const abrir = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setFase("abriendo");
    marcarIntroAbierta();
    timers.current = [window.setTimeout(terminar, ABRIR_MS)];
  }, [terminar]);

  useEffect(() => {
    if (!introActiva()) {
      // No corresponde mostrarla: quitar el nodo sin esperar
      const t = window.setTimeout(() => setFase("fin"), 0);
      return () => clearTimeout(t);
    }
    timers.current = [window.setTimeout(abrir, MOSTRAR_MS)];
    const saltear = () => abrir();
    window.addEventListener("keydown", saltear, { once: true });
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", saltear);
    };
  }, [abrir]);

  if (fase === "fin") return null;

  return (
    <div aria-hidden className="intro" data-fase={fase} onClick={abrir}>
      <div className="intro-puerta intro-izq" />
      <div className="intro-puerta intro-der" />
      <div className="intro-contenido">
        <div className="intro-foto">{foto}</div>
        <p className="intro-nombre">{nombre}</p>
        <p className="intro-bajada">{bajada}</p>
        <span className="intro-linea" />
      </div>
      <span className="intro-saltear">Tocá para entrar</span>
    </div>
  );
}
