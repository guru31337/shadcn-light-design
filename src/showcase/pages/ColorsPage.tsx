import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { contrast, cssVar, over, toHex, toRgb } from "../contrast"
import { Page, Section } from "../kit"
import { RAMPS, ROLE_SOURCE } from "../theme-source"

const RAMP_ORIGIN: Record<string, string> = {
  neutral: "бумага → чернила",
  brand: "бренд · fern",
  green: "успех, рост",
  red: "ошибка, падение · peony",
  amber: "предупреждение · fennel → honey → peach",
  blue: "информация",
}

function Palette() {
  return (
    <div className="flex flex-col gap-6">
      {RAMPS.map((ramp) => (
        <div key={ramp.name} className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium">{ramp.name}</span>
            <span className="text-xs text-muted-foreground">
              {RAMP_ORIGIN[ramp.name]}
            </span>
          </div>
          <div className="grid auto-cols-fr grid-flow-col overflow-hidden rounded-xl border border-border">
            {ramp.steps.map(({ step, pigment }) => {
              const rgb = toRgb(cssVar(`${ramp.name}-${step}`))
              const dark = contrast(rgb, [0, 0, 0]) < contrast(rgb, [1, 1, 1])
              return (
                <div
                  key={step}
                  className="flex h-20 flex-col justify-between p-2 text-xs"
                  style={{
                    background: `var(--${ramp.name}-${step})`,
                    color: dark ? "var(--neutral-0)" : "var(--neutral-900)",
                  }}
                >
                  <span className="font-medium">{step}</span>
                  <span className="flex flex-col">
                    {pigment && <span className="font-medium">{pigment}</span>}
                    <span className="opacity-80">{toHex(rgb)}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Порог по смыслу роли: текст 4.5, рамка контрола и фокус 3, лёгкая рамка и заливка-край 1.3. */
const ROLE_GROUPS: {
  title: string
  rows: [role: string, min: number | null][]
}[] = [
  {
    title: "Поверхности",
    rows: [
      ["background", null],
      ["card", null],
      ["popover", null],
      ["muted", null],
      ["accent", null],
    ],
  },
  {
    title: "Текст",
    rows: [
      ["foreground", 4.5],
      ["muted-foreground", 4.5],
    ],
  },
  {
    title: "Действия",
    rows: [
      ["primary", 4.5],
      ["secondary", 1.3],
    ],
  },
  {
    title: "Статусы",
    rows: [
      ["destructive", 4.5],
      ["success", 4.5],
      ["warning", 4.5],
      ["info", 4.5],
    ],
  },
  {
    title: "Линии",
    rows: [
      ["border", 1.3],
      ["input", 3],
      ["ring", 3],
    ],
  },
  {
    title: "Графики",
    rows: [
      ["chart-1", 3],
      ["chart-2", 3],
      ["chart-3", 3],
      ["chart-4", 3],
      ["chart-5", 3],
    ],
  },
]
const SURFACES = ["background", "card", "muted"] as const

function Ratio({ value, min }: { value: number; min: number }) {
  const ok = value >= min
  return (
    <span className={ok ? undefined : "font-medium text-destructive"}>
      {value.toFixed(2)}
      {ok ? "" : " ✕"}
    </span>
  )
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="size-5 shrink-0 rounded-md border border-border"
      style={{ background: color }}
    />
  )
}

function RolesTable() {
  const surf = SURFACES.map((s) => toRgb(cssVar(s)))
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Роль</TableHead>
            <TableHead>Ступень</TableHead>
            <TableHead>Значение</TableHead>
            <TableHead className="text-right">На странице</TableHead>
            <TableHead className="text-right">На карточке</TableHead>
            <TableHead className="text-right">На утопленном</TableHead>
            <TableHead className="text-right">Текст на заливке</TableHead>
            <TableHead className="pr-4 text-right">Порог</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROLE_GROUPS.flatMap((g) => [
            <TableRow key={g.title} className="bg-muted hover:bg-muted">
              <TableCell
                colSpan={8}
                className="pl-4 text-xs font-medium tracking-wider text-muted-foreground uppercase"
              >
                {g.title}
              </TableCell>
            </TableRow>,
            ...g.rows.map(([role, min]) => {
              const rgb = toRgb(cssVar(role))
              const fg = cssVar(`${role}-foreground`)
              return (
                <TableRow key={role}>
                  <TableCell className="pl-4">
                    <span className="flex items-center gap-2.5">
                      <Swatch color={`var(--${role})`} />
                      {role}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {ROLE_SOURCE[role] ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {toHex(rgb)}
                  </TableCell>
                  {surf.map((s, i) => (
                    <TableCell key={SURFACES[i]} className="text-right">
                      {min === null ? (
                        "—"
                      ) : (
                        <Ratio value={contrast(rgb, s)} min={min} />
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    {fg ? (
                      <Ratio value={contrast(toRgb(fg), rgb)} min={4.5} />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="pr-4 text-right text-muted-foreground">
                    {min === null ? "—" : `${min}:1`}
                  </TableCell>
                </TableRow>
              )
            }),
          ])}
        </TableBody>
      </Table>
    </div>
  )
}

function SoftTable() {
  const surf = SURFACES.map((s) => toRgb(cssVar(s)))
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Роль</TableHead>
            <TableHead className="text-right">
              Текст на подложке 10% (мин.)
            </TableHead>
            <TableHead className="pr-4 text-right">
              Рамка /40 к поверхности (мин.)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {["destructive", "success", "warning", "info"].map((role) => {
            const rgb = toRgb(cssVar(role))
            return (
              <TableRow key={role}>
                <TableCell className="pl-4">
                  <span className="flex items-center gap-2.5">
                    <Swatch color={`var(--${role})`} />
                    {role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Ratio
                    value={Math.min(
                      ...surf.map((b) => contrast(rgb, over(rgb, b, 0.1)))
                    )}
                    min={4.5}
                  />
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <Ratio
                    value={Math.min(
                      ...surf.map((b) => contrast(over(rgb, b, 0.4), b))
                    )}
                    min={1.5}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export function ColorsPage() {
  return (
    <Page
      title="Цвета"
      lead="Шесть шкал палитры — источник значений. Компоненты используют только роли: контракт shadcn плюс success, warning, info."
    >
      <Section
        title="Палитра"
        description="Единственное место с конкретными цветами. Пигменты исходной темы стоят в шкалах точными значениями."
      >
        <Palette />
      </Section>
      <Section
        title="Роли"
        description="Каждая роль ссылается на ступень палитры. Контраст посчитан в браузере по реальным значениям; ✕ — ниже порога."
      >
        <RolesTable />
      </Section>
      <Section
        title="Мягкие варианты статусов"
        description="Подложка 10% цвета и рамка 40% — так выглядят destructive, success, warning, info у кнопок и бейджей. Минимум по трём поверхностям."
      >
        <SoftTable />
      </Section>
    </Page>
  )
}
