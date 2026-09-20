// Разбор src/index.css для скриптов: палитра, роли с подставленными значениями, перевод в sRGB.
// Им пользуются генератор реестра (scripts/build-registry.ts) и тест контраста (tests/).
import { readFileSync } from "node:fs"

export const css = readFileSync(
  new URL("../src/index.css", import.meta.url),
  "utf8"
)

const RAMP = "(?:neutral|brand|green|red|amber|blue)-\\d+"

/** Палитра: neutral-50 → oklch(…). */
export const palette: Record<string, string> = Object.fromEntries(
  [...css.matchAll(new RegExp(`^\\s*--(${RAMP}):\\s*([^;]+);`, "gm"))].map(
    ([, name, value]) => [name, value.trim()]
  )
)

/** Роли: первый блок :root, без палитры. var(--ступень) и var(--роль) подставлены. */
export const roles: Record<string, string> = (() => {
  const block = css.match(/:root\s*\{([^}]*--background[^}]*)\}/)?.[1]
  if (!block) throw new Error("index.css: не найден блок :root с ролями")
  const out: Record<string, string> = {}
  for (const [, name, raw] of block.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    const value = raw.trim()
    const ref = value.match(/^var\(--([a-z0-9-]+)\)$/)?.[1]
    out[name] = ref ? (palette[ref] ?? out[ref] ?? value) : value
  }
  const unresolved = Object.keys(out).filter((k) => out[k].includes("var("))
  if (unresolved.length)
    throw new Error(`index.css: не подставлены ${unresolved.join(", ")}`)
  return out
})()

/** Правила @layer base, кроме штатных правил shadcn (*, body, html), — добавки системы.
 *  Селектор → объявления в формате реестра: { "font-family": "…" } или { "@apply type-h1": {} }. */
export const baseRules: Record<
  string,
  Record<string, string | object>
> = (() => {
  const start = css.search(/^@layer base\s*\{/m)
  if (start < 0) throw new Error("index.css: не найден блок @layer base")
  const layer = css.slice(css.indexOf("{", start) + 1, css.lastIndexOf("}"))
  const out: Record<string, Record<string, string | object>> = {}
  for (const [, rawSelector, body] of layer.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = rawSelector
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .trim()
    if (["*", "body", "html"].includes(selector)) continue
    out[selector] = Object.fromEntries(
      body
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((d) => {
          if (d.startsWith("@apply")) return [d, {}]
          const i = d.indexOf(":")
          return [d.slice(0, i).trim(), d.slice(i + 1).trim()]
        })
    )
  }
  return out
})()

// --- цвет ----------------------------------------------------------------------------------

const toGamma = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
const clamp = (c: number) => Math.min(1, Math.max(0, c))

/** oklch(L C h) → линейный sRGB без обрезки: каналы вне 0..1 — цвет вне охвата sRGB. */
function oklchToLinear(color: string): number[] {
  const m = color.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/)
  if (!m) throw new Error(`Неизвестный формат цвета: ${color}`)
  const [L, C, h] = m.slice(1).map(Number)
  const a = C * Math.cos((h * Math.PI) / 180)
  const b = C * Math.sin((h * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ]
}

const HEX = /^#([0-9a-f]{6})$/i

/** oklch(L C h) или #rrggbb → sRGB 0..1 (формулы CSS Color 4). */
export function toSrgb(color: string): number[] {
  const hex = color.match(HEX)?.[1]
  if (hex) return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return oklchToLinear(color).map((c) => clamp(toGamma(c)))
}

/** Цвет попадает в охват sRGB — иначе браузер и формула могут разойтись в контрасте. */
export function inSrgbGamut(color: string): boolean {
  if (HEX.test(color)) return true
  return oklchToLinear(color).every((c) => c > -1e-4 && c < 1 + 1e-4)
}
