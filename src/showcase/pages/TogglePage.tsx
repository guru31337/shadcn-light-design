import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  Bold,
  Italic,
  Underline,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function TogglePage() {
  return (
    <Page
      title="Toggle и ToggleGroup"
      lead="Кнопка с двумя состояниями и набор таких кнопок. Нажатое состояние — заливка accent, как выбранный пункт меню и Sidebar: правило по data-slot в index.css, сам компонент как в shadcn."
    >
      <Section
        title="Варианты"
        description="Проп variant. У default края нет, пока кнопка не нажата; outline — с рамкой input."
      >
        <Preview>
          <Specimens>
            <Specimen label="default">
              <Toggle aria-label="Жирный">
                <Bold />
              </Toggle>
            </Specimen>
            <Specimen label="default · нажат">
              <Toggle aria-label="Жирный" defaultPressed>
                <Bold />
              </Toggle>
            </Specimen>
            <Specimen label="outline">
              <Toggle variant="outline">
                <Bell data-icon="inline-start" />
                Алерты
              </Toggle>
            </Specimen>
            <Specimen label="outline · нажат">
              <Toggle variant="outline" defaultPressed>
                <Bell data-icon="inline-start" />
                Алерты
              </Toggle>
            </Specimen>
            <Specimen label="disabled">
              <Toggle variant="outline" disabled>
                Алерты
              </Toggle>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Размеры"
        description="Проп size: sm 28px, default 32px, lg 36px — как у кнопок."
      >
        <Preview>
          <Specimens>
            {(["sm", "default", "lg"] as const).map((s) => (
              <Specimen key={s} label={s}>
                <Toggle size={s} variant="outline" defaultPressed>
                  <Italic />
                </Toggle>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="ToggleGroup"
        description="Набор из 2–7 вариантов. Один выбранный — по умолчанию, несколько — проп multiple. spacing={0} склеивает кнопки в сегменты."
      >
        <Preview>
          <Specimens>
            <Specimen label="outline · spacing={0}">
              <ToggleGroup variant="outline" spacing={0} defaultValue={["day"]}>
                <ToggleGroupItem value="day">День</ToggleGroupItem>
                <ToggleGroupItem value="week">Неделя</ToggleGroupItem>
                <ToggleGroupItem value="month">Месяц</ToggleGroupItem>
              </ToggleGroup>
            </Specimen>
            <Specimen label="default · multiple">
              <ToggleGroup multiple defaultValue={["bold", "italic"]}>
                <ToggleGroupItem value="bold" aria-label="Жирный">
                  <Bold />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Курсив">
                  <Italic />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Подчёркнутый">
                  <Underline />
                </ToggleGroupItem>
              </ToggleGroup>
            </Specimen>
            <Specimen label='outline · sm · orientation="vertical"'>
              <ToggleGroup
                variant="outline"
                size="sm"
                spacing={0}
                orientation="vertical"
                defaultValue={["left"]}
              >
                <ToggleGroupItem value="left" aria-label="По левому краю">
                  <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="По центру">
                  <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="По правому краю">
                  <AlignRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Переключатель вида над графиком: интервал свечей и слои."
      >
        <Preview>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ToggleGroup variant="outline" spacing={0} defaultValue={["5m"]}>
              <ToggleGroupItem value="1m">1м</ToggleGroupItem>
              <ToggleGroupItem value="5m">5м</ToggleGroupItem>
              <ToggleGroupItem value="15m">15м</ToggleGroupItem>
              <ToggleGroupItem value="1h">1ч</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup multiple defaultValue={["volume"]}>
              <ToggleGroupItem value="volume">Объём</ToggleGroupItem>
              <ToggleGroupItem value="orders">Заявки</ToggleGroupItem>
              <ToggleGroupItem value="trades">Сделки</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
