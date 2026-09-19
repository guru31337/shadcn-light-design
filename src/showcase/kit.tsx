// Строительные блоки страниц витрины: страница, секция, превью, образец с подписью, код.
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SURFACE_CLASS, useSurface } from "./surface"

export function Page({
  title,
  lead,
  children,
}: {
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <article className="flex flex-col gap-14">
      <header className="flex flex-col gap-3 border-b border-border pb-8">
        <h1>{title}</h1>
        {lead && (
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {lead}
          </p>
        )}
      </header>
      {children}
    </article>
  )
}

export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="type-h3">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

/** Рамка превью. Фон — выбранная в шапке поверхность. */
export function Preview({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { surface } = useSurface()
  return (
    <div
      className={cn(
        "rounded-xl border border-border p-8",
        SURFACE_CLASS[surface],
        className
      )}
    >
      {children}
    </div>
  )
}

/** Ряд образцов с подписями. */
export function Specimens({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-x-8 gap-y-8">{children}</div>
  )
}

export function Specimen({
  label,
  note,
  children,
}: {
  label: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex min-h-9 items-center">{children}</div>
      <div className="flex max-w-40 flex-col items-center gap-1 text-center">
        <span className="text-xs text-muted-foreground">{label}</span>
        {note && (
          <span className="type-caption text-muted-foreground">{note}</span>
        )}
      </div>
    </div>
  )
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm leading-6">
      <code>{children}</code>
    </pre>
  )
}
