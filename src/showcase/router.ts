// Минимальный роутинг по hash (#/colors): витрине не нужен react-router ради десятка страниц.
import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

export function useRoute(): string {
  return useSyncExternalStore(subscribe, () =>
    location.hash.replace(/^#\/?/, "")
  )
}
