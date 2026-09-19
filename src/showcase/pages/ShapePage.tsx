import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cssVar } from "../contrast"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const RADII = [
  ["rounded-md", "×0.8 · пункты меню"],
  ["rounded-lg", "= --radius · кнопки, поля, меню"],
  ["rounded-xl", "×1.4 · карточки, диалоги"],
  ["rounded-4xl", "×2.6 · бейджи"],
] as const

/** Квадрат с радиусом и его фактическим значением из браузера. */
function RadiusBox({ className, note }: { className: string; note: string }) {
  const [px, setPx] = useState("")
  return (
    <Specimen label={`${className} · ${px}`} note={note}>
      <div
        ref={(el) => {
          if (el && !px) setPx(getComputedStyle(el).borderTopLeftRadius)
        }}
        className={`size-20 border border-input bg-card ${className}`}
      />
    </Specimen>
  )
}

function radiusLabel() {
  const rem = Number.parseFloat(cssVar("radius"))
  return `--radius: ${rem}rem = ${rem * 16}px`
}

export function ShapePage() {
  return (
    <Page
      title="Форма и тени"
      lead="Один радиус, от которого shadcn считает остальные. Края — рамками, тени — только у слоёв над страницей."
    >
      <Section
        title="Радиус"
        description={`${radiusLabel()}. Формула shadcn (base-nova) умножает его: имена шкалы Tailwind, которыми пользуются компоненты, получают свои значения.`}
      >
        <Preview>
          <Specimens>
            {RADII.map(([c, note]) => (
              <RadiusBox key={c} className={c} note={note} />
            ))}
          </Specimens>
        </Preview>
      </Section>
      <Section
        title="Тени"
        description="Стандартные тени Tailwind. shadcn ставит их только меню, поповерам, диалогам и тостам; карточки и контролы — без теней."
      >
        <Preview>
          <Specimens>
            {[
              ["shadow-md", "меню, поповеры, тултипы"],
              ["shadow-lg", "диалоги, панели, тосты"],
            ].map(([c, note]) => (
              <Specimen key={c} label={c} note={note}>
                <div
                  className={`h-20 w-36 rounded-xl border border-border bg-popover ${c}`}
                />
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>
      <Section
        title="Фокус"
        description="Штатный фокус shadcn: рамка элемента цвета --ring и мягкий ореол ring/50. Слева — как он выглядит, справа — живые элементы: нажмите Tab."
      >
        <Preview>
          <Specimens>
            <Specimen label="фокус · кнопка">
              <Button className="border-ring ring-3 ring-ring/50">
                Сохранить
              </Button>
            </Specimen>
            <Specimen label="фокус · поле">
              <Input
                className="w-56 border-ring ring-3 ring-ring/50"
                defaultValue="SBER"
                aria-label="Пример поля в фокусе"
              />
            </Specimen>
            <Specimen label="живые">
              <div className="flex gap-2">
                <Button variant="outline">Первая</Button>
                <Input
                  className="w-40"
                  placeholder="Поле"
                  aria-label="Живое поле"
                />
              </div>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>
    </Page>
  )
}
