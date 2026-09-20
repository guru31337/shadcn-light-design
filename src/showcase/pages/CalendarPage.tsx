import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ru } from "react-day-picker/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

// Фиксированный месяц — чтобы витрина и скриншоты не зависели от сегодняшней даты.
const MONTH = new Date(2026, 8, 1)
const day = (d: number, m = 8) => new Date(2026, m, d)
const HOLIDAYS = [day(5), day(6), day(12), day(13), day(19), day(20)]

function Single() {
  const [date, setDate] = useState<Date | undefined>(day(17))
  return (
    <Calendar
      mode="single"
      locale={ru}
      defaultMonth={MONTH}
      selected={date}
      onSelect={setDate}
      disabled={HOLIDAYS}
    />
  )
}

function Range() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: day(21),
    to: day(9, 9),
  })
  return (
    <Calendar
      mode="range"
      locale={ru}
      defaultMonth={MONTH}
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
    />
  )
}

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(day(17))
  return (
    <Field className="w-64">
      <FieldLabel htmlFor="cal-from">Сделки с</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="cal-from"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {date ? date.toLocaleDateString("ru-RU") : "Выберите дату"}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={ru}
            defaultMonth={MONTH}
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export function CalendarPage() {
  return (
    <Page
      title="Calendar"
      lead="Календарь на react-day-picker. Выбранный день — заливка primary, сегодняшний и середина диапазона — muted, недоступные дни приглушены."
    >
      <Section
        title="Режимы"
        description='Проп mode: "single" — одна дата, "range" — диапазон. Локаль — locale={ru} из react-day-picker/locale. Выходные здесь недоступны (disabled).'
      >
        <Preview>
          <Specimens>
            <Specimen label='mode="single" · в Card'>
              <Card className="p-0">
                <CardContent className="p-0">
                  <Single />
                </CardContent>
              </Card>
            </Specimen>
            <Specimen label='mode="range" · numberOfMonths={2}'>
              <Card className="p-0">
                <CardContent className="p-0">
                  <Range />
                </CardContent>
              </Card>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Выбор даты"
        description="Кнопка outline открывает календарь в Popover. Дата в кнопке — в формате локали."
      >
        <Preview>
          <DatePicker />
        </Preview>
      </Section>
    </Page>
  )
}
