// Читает src/index.css как текст: шкалы палитры и привязку ролей берём из
// исходника темы, а не дублируем в витрине — витрина не может разойтись с темой.
import css from "../index.css?raw"

export type Ramp = {
  name: string
  steps: { step: string; value: string; pigment?: string }[]
}

export const RAMPS: Ramp[] = (() => {
  const ramps = new Map<string, Ramp>()
  const re =
    /--(neutral|brand|green|red|amber|blue)-(\d+):\s*([^;]+);(?:[ \t]*\/\*[ \t]*(\w+)[ \t]*\*\/)?/g
  for (const [, name, step, value, pigment] of css.matchAll(re)) {
    if (!ramps.has(name)) ramps.set(name, { name, steps: [] })
    ramps.get(name)!.steps.push({ step, value: value.trim(), pigment })
  }
  return [...ramps.values()]
})()

/** Роль → ступень палитры, например primary → brand-700. */
export const ROLE_SOURCE: Record<string, string> = (() => {
  const out: Record<string, string> = {}
  const re =
    /^\s*--([a-z0-9-]+):\s*var\(--((?:neutral|brand|green|red|amber|blue)-\d+)\)/gm
  for (const [, role, step] of css.matchAll(re)) out[role] = step
  return out
})()
