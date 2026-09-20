import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"
import { ROLE_SOURCE } from "../theme-source"

// Доходность портфеля и индекса, % с начала года — одна шкала, одна ось.
const RETURNS = [
  { month: "янв", portfolio: 1.2, index: 0.8 },
  { month: "фев", portfolio: 2.9, index: 1.1 },
  { month: "мар", portfolio: 2.1, index: -0.4 },
  { month: "апр", portfolio: 4.6, index: 1.9 },
  { month: "май", portfolio: 5.3, index: 3.2 },
  { month: "июн", portfolio: 4.1, index: 2.7 },
  { month: "июл", portfolio: 6.8, index: 3.9 },
  { month: "авг", portfolio: 7.4, index: 4.4 },
]

const returnsConfig = {
  portfolio: { label: "Портфель", color: "var(--chart-1)" },
  index: { label: "Индекс Мосбиржи", color: "var(--chart-2)" },
} satisfies ChartConfig

// Оборот по рынкам, млн ₽.
const TURNOVER = [
  { month: "май", shares: 42, bonds: 18, funds: 9 },
  { month: "июн", shares: 38, bonds: 22, funds: 11 },
  { month: "июл", shares: 51, bonds: 19, funds: 14 },
  { month: "авг", shares: 47, bonds: 25, funds: 12 },
]

const turnoverConfig = {
  shares: { label: "Акции", color: "var(--chart-1)" },
  bonds: { label: "Облигации", color: "var(--chart-2)" },
  funds: { label: "Фонды", color: "var(--chart-3)" },
} satisfies ChartConfig

/** Легенда в порядке серий, а не по алфавиту (так Recharts 3 сортирует по умолчанию). */
const inConfigOrder = (config: ChartConfig) => (item: { dataKey?: unknown }) =>
  Object.keys(config).indexOf(String(item.dataKey))

export function ChartPage() {
  return (
    <Page
      title="Chart"
      lead="Графики на Recharts через ChartContainer: цвета серий — роли chart-1…chart-5, подсказка и легенда — компоненты shadcn. Ось одна, у двух и более серий всегда есть легенда."
    >
      <Section
        title="Цвета серий"
        description="Серии получают цвета строго по порядку, цвет закреплён за сущностью. Линии ≥3:1 к поверхности — это проверяет тест контраста."
      >
        <Preview>
          <Specimens>
            {[1, 2, 3, 4, 5].map((n) => (
              <Specimen
                key={n}
                label={`chart-${n}`}
                note={ROLE_SOURCE[`chart-${n}`]}
              >
                <span
                  className="h-2 w-16 rounded-full"
                  style={{ background: `var(--chart-${n})` }}
                />
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Линии"
        description="Изменение во времени: линии 2px без точек, подсказка по наведению с перекрестьем."
      >
        <Preview>
          <Card>
            <CardHeader>
              <CardTitle>Доходность с начала года</CardTitle>
              <CardDescription>Январь — август 2026, %</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={returnsConfig} className="h-64 w-full">
                <LineChart
                  accessibilityLayer
                  data={RETURNS}
                  margin={{ left: 4, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={32}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    itemSorter={inConfigOrder(returnsConfig)}
                  />
                  <Line
                    dataKey="portfolio"
                    type="monotone"
                    stroke="var(--color-portfolio)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="index"
                    type="monotone"
                    stroke="var(--color-index)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Preview>
      </Section>

      <Section
        title="Столбцы"
        description="Сравнение величин: столбцы со скруглённым верхом и зазором между соседями."
      >
        <Preview>
          <Card>
            <CardHeader>
              <CardTitle>Оборот по рынкам</CardTitle>
              <CardDescription>Май — август 2026, млн ₽</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={turnoverConfig} className="h-64 w-full">
                <BarChart accessibilityLayer data={TURNOVER} barGap={2}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} width={32} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    itemSorter={inConfigOrder(turnoverConfig)}
                  />
                  <Bar
                    dataKey="shares"
                    fill="var(--color-shares)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="bonds"
                    fill="var(--color-bonds)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="funds"
                    fill="var(--color-funds)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Preview>
      </Section>
    </Page>
  )
}
