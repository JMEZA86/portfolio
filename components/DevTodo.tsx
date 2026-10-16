// Aviso de pendientes visible solo con `npm run dev`. En el build de producción no se renderiza.
export function DevTodo({ items }: { items: string[] }) {
  if (process.env.NODE_ENV !== "development" || items.length === 0) return null;
  return (
    <aside
      aria-label="Pendientes de desarrollo"
      className="rounded-card border-2 border-dashed border-ink bg-accent p-4 text-sm text-ink"
    >
      <strong>TODO (solo en desarrollo):</strong>
      <ul className="mt-1 list-disc pl-5">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}
