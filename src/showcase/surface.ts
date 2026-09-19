// На какой поверхности показываются превью компонентов — переключается в шапке витрины.
import { createContext, useContext } from "react"

export type Surface = "background" | "card" | "muted"

export const SURFACES: { id: Surface; label: string }[] = [
  { id: "background", label: "Страница" },
  { id: "card", label: "Карточка" },
  { id: "muted", label: "Утопленный" },
]

export const SURFACE_CLASS: Record<Surface, string> = {
  background: "bg-background",
  card: "bg-card",
  muted: "bg-muted",
}

export const SurfaceContext = createContext<{
  surface: Surface
  setSurface: (surface: Surface) => void
}>({ surface: "card", setSurface: () => {} })

export function useSurface() {
  return useContext(SurfaceContext)
}
