// Тест контраста: каждая пара из src/showcase/contrast-rules.ts на каждой поверхности,
// значения ролей — из src/index.css. Запуск: pnpm test
import assert from "node:assert/strict"
import { describe, test } from "node:test"
import { inSrgbGamut, palette, roles, toSrgb } from "../scripts/theme.ts"
import {
  RULE_GROUPS,
  SURFACES,
  measure,
  ruleLabel,
} from "../src/showcase/contrast-rules.ts"

const color = (role: string) => {
  if (!roles[role]) throw new Error(`Роли --${role} нет в index.css`)
  return toSrgb(roles[role])
}

test("палитра в охвате sRGB", () => {
  const outside = Object.keys(palette).filter((k) => !inSrgbGamut(palette[k]))
  assert.deepEqual(outside, [])
})

for (const group of RULE_GROUPS) {
  describe(group.title, () => {
    for (const rule of group.rules) {
      test(
        `${ruleLabel(rule)} ≥ ${rule.min}:1 — ${rule.where}`,
        { todo: rule.known },
        () => {
          const ratios = SURFACES.map((s) => measure(rule, s, color))
          const failed = SURFACES.filter((_, i) => ratios[i] < rule.min)
          assert.ok(
            failed.length === 0,
            SURFACES.map((s, i) => `${s} ${ratios[i].toFixed(2)}`).join(", ")
          )
        }
      )
    }
  })
}
