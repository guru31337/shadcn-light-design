import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="flex scroll-mt-20 flex-col gap-6 border-t border-border py-12 first:border-t-0"
    >
      <div className="flex max-w-3xl flex-col gap-2">
        <h2>{title}</h2>
        {lead && <p className="text-muted-foreground">{lead}</p>}
      </div>
      {children}
    </section>
  )
}

export function Block({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="type-h4">{title}</h3>
        {note && <p className="type-caption text-muted-foreground">{note}</p>}
      </div>
      {children}
    </div>
  )
}

const SURFACES = [
  {
    key: "background",
    label: "background · страница",
    className: "bg-background border border-dashed border-border",
  },
  {
    key: "card",
    label: "card · карточка",
    className: "bg-card border border-border",
  },
  {
    key: "muted",
    label: "muted · утопленный блок",
    className: "bg-muted border border-border",
  },
] as const

/** Один и тот же фрагмент на трёх поверхностях — проверка, что элемент не сливается ни с одной. */
export function OnSurfaces({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {SURFACES.map((s) => (
        <div key={s.key} className="flex min-w-0 flex-col gap-2">
          <span className="type-ui-sm text-muted-foreground">{s.label}</span>
          <div
            className={cn(
              "flex min-w-0 flex-col gap-4 rounded-xl p-4",
              s.className,
              className
            )}
          >
            {children}
          </div>
        </div>
      ))}
    </div>
  )
}
