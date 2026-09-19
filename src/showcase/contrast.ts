// Контраст WCAG, посчитанный в браузере по реальным значениям CSS-переменных.
let ctx: CanvasRenderingContext2D | null = null

/** Любой CSS-цвет (oklch, hex, …) → sRGB 0..1 через canvas. */
export function toRgb(color: string): [number, number, number] {
  ctx ??= document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })
  if (!ctx) return [0, 0, 0]
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
}

const lin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const lum = ([r, g, b]: number[]) =>
  0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

export function contrast(a: number[], b: number[]): number {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Наложение цвета с прозрачностью (как bg-destructive/10) поверх подложки. */
export function over(fg: number[], bg: number[], alpha: number): number[] {
  return fg.map((v, i) => v * alpha + bg[i] * (1 - alpha))
}

export function toHex(rgb: number[]): string {
  return (
    "#" +
    rgb
      .map((v) =>
        Math.round(v * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  )
}
