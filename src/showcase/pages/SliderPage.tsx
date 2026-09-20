import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

function RiskField() {
  const [risk, setRisk] = useState(2)
  return (
    <Field className="max-w-md">
      <div className="flex items-baseline justify-between gap-4">
        <FieldLabel htmlFor="sl-risk">Риск на сделку</FieldLabel>
        <span className="text-sm tabular-nums">{risk.toFixed(1)}%</span>
      </div>
      <Slider
        id="sl-risk"
        value={risk}
        onValueChange={(v) => setRisk(v as number)}
        min={0.5}
        max={5}
        step={0.5}
      />
      <FieldDescription>
        Доля капитала, которую стратегия готова потерять по стопу.
      </FieldDescription>
    </Field>
  )
}

export function SliderPage() {
  return (
    <Page
      title="Slider"
      lead="Выбор числа или диапазона перетаскиванием. Заполненная часть — primary, ручка — рамка ring; незаполненная часть дорожки — secondary (правило по data-slot в index.css: у shadcn там muted, который сливается с поверхностью)."
    >
      <Section
        title="Варианты"
        description="Одно значение — число, диапазон — массив из двух. orientation=vertical — вертикальный, высота задаётся снаружи."
      >
        <Preview>
          <Specimens>
            <Specimen label="одно значение">
              <div className="w-56">
                <Slider defaultValue={40} aria-label="Одно значение" />
              </div>
            </Specimen>
            <Specimen label="диапазон">
              <div className="w-56">
                <Slider defaultValue={[20, 70]} aria-label="Диапазон" />
              </div>
            </Specimen>
            <Specimen label="disabled">
              <div className="w-56">
                <Slider defaultValue={40} disabled aria-label="Недоступный" />
              </div>
            </Specimen>
            <Specimen label='orientation="vertical"'>
              <div className="h-40">
                <Slider
                  defaultValue={60}
                  orientation="vertical"
                  aria-label="Вертикальный"
                />
              </div>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Значение рядом с подписью — цифрами, чтобы не угадывать его по положению ручки."
      >
        <Preview>
          <RiskField />
        </Preview>
      </Section>
    </Page>
  )
}
