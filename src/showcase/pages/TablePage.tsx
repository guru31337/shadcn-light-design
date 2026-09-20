import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Page, Preview, Section } from "../kit"

const POSITIONS = [
  { ticker: "SBER", name: "Сбербанк", lots: 40, price: 284.15, change: 1.24 },
  { ticker: "GAZP", name: "Газпром", lots: 120, price: 131.4, change: -0.87 },
  { ticker: "LKOH", name: "Лукойл", lots: 2, price: 6912.5, change: 0.35 },
  { ticker: "YDEX", name: "Яндекс", lots: 5, price: 4120.0, change: -2.1 },
]

const ORDERS = [
  { id: "4f1c", side: "Покупка", ticker: "SBER", status: "Исполнена" },
  { id: "9a02", side: "Продажа", ticker: "GAZP", status: "Отклонена" },
  { id: "c7e8", side: "Покупка", ticker: "YDEX", status: "Ждёт" },
] as const

const STATUS = {
  Исполнена: "success",
  Отклонена: "destructive",
  Ждёт: "secondary",
} as const

const rub = (v: number) =>
  v.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export function TablePage() {
  const total = POSITIONS.reduce((s, p) => s + p.lots * p.price, 0)
  return (
    <Page
      title="Table"
      lead="Таблица данных. Числа — JetBrains Mono и tabular-nums, по правому краю; рост и падение — роли success и destructive, со знаком, а не только цветом."
    >
      <Section
        title="Состав"
        description="TableHeader, TableBody, TableFooter для итогов и TableCaption — подпись под таблицей. Разделители строк — рамка border, наведение — muted/50."
      >
        <Preview>
          <Table>
            <TableCaption>
              Позиции на счёте · цены на 19.09.2026, 18:40
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Инструмент</TableHead>
                <TableHead className="text-right">Лотов</TableHead>
                <TableHead className="text-right">Цена, ₽</TableHead>
                <TableHead className="text-right">За день</TableHead>
                <TableHead className="text-right">Стоимость, ₽</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {POSITIONS.map((p) => (
                <TableRow key={p.ticker}>
                  <TableCell>
                    <span className="font-medium">{p.ticker}</span>{" "}
                    <span className="text-muted-foreground">{p.name}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {p.lots}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {rub(p.price)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right tabular-nums",
                      p.change > 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {p.change > 0 ? "+" : "−"}
                    {Math.abs(p.change).toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {rub(p.lots * p.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Итого</TableCell>
                <TableCell className="text-right tabular-nums">
                  {rub(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Preview>
      </Section>

      <Section
        title="Выбор строк"
        description='Выбранная строка — data-state="selected": заливка muted. Выбор всегда дублирует Checkbox — одной заливки мало.'
      >
        <Preview>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox aria-label="Выбрать все" />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Сторона</TableHead>
                <TableHead>Инструмент</TableHead>
                <TableHead className="text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o, i) => (
                <TableRow
                  key={o.id}
                  data-state={i === 0 ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      aria-label={`Выбрать ${o.id}`}
                      defaultChecked={i === 0}
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {o.id}
                  </TableCell>
                  <TableCell
                    className={
                      o.side === "Покупка" ? "text-success" : "text-destructive"
                    }
                  >
                    {o.side}
                  </TableCell>
                  <TableCell>{o.ticker}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={STATUS[o.status]}>{o.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Preview>
      </Section>
    </Page>
  )
}
