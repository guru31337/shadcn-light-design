import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const FAQ = [
  [
    "fees",
    "Какая комиссия в песочнице?",
    "Такая же, как на боевом счёте по тарифу «Инвестор»: 0,05% от оборота. Её списывают с виртуального баланса, чтобы результат стратегии был честным.",
  ],
  [
    "limits",
    "Есть ли лимиты на запросы?",
    "Да: 200 запросов в минуту на сервис заявок и 600 — на маркет-данные. При превышении API отвечает кодом RESOURCE_EXHAUSTED.",
  ],
  [
    "token",
    "Что будет, если токен утёк?",
    "Отзовите его в личном кабинете — все запросы с ним сразу перестанут проходить. Затем выпустите новый.",
  ],
] as const

function OpenOrders() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex w-80 flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Активные заявки · 3</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Показать все" />
          }
        >
          <ChevronsUpDown />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border border-border px-3 py-2 text-sm">
        SBER · 10 × 284.15
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border border-border px-3 py-2 text-sm">
          GAZP · 20 × 131.40
        </div>
        <div className="rounded-lg border border-border px-3 py-2 text-sm">
          LKOH · 1 × 6 912.5
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function AccordionPage() {
  return (
    <Page
      title="Accordion и Collapsible"
      lead="Скрыть второстепенное. Accordion — список разделов, раскрывающихся по одному или по несколько; Collapsible — одна область с кнопкой."
    >
      <Section
        title="Accordion"
        description="Base UI: defaultValue — массив, несколько открытых сразу — проп multiple. Разделители между пунктами — рамка border."
      >
        <Preview>
          <Specimens>
            <Specimen label="по одному">
              <Accordion defaultValue={["fees"]} className="w-96">
                {FAQ.map(([value, q, a]) => (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Specimen>
            <Specimen label="multiple · disabled">
              <Accordion multiple defaultValue={["fees"]} className="w-96">
                {FAQ.map(([value, q, a]) => (
                  <AccordionItem
                    key={value}
                    value={value}
                    disabled={value === "token"}
                  >
                    <AccordionTrigger>{q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Collapsible"
        description="CollapsibleTrigger с render={<Button />} и CollapsibleContent. Своего оформления у Collapsible нет."
      >
        <Preview>
          <OpenOrders />
        </Preview>
      </Section>
    </Page>
  )
}
