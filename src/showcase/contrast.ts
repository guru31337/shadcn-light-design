// Цвета из браузера: реальные значения CSS-переменных → sRGB. Формулы контраста и пары —
// в contrast-rules.ts, общие с тестом.
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
