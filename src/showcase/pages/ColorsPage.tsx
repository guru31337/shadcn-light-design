import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { cssVar, toHex, toRgb } from "../contrast"
import {
  type ContrastRule,
  type Paint,
  RULE_GROUPS,
  SURFACES,
  type Surface,
  contrast,
  measure,
  ruleLabel,
} from "../contrast-rules"
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

/** Роли по смыслу — для таблицы «роль → ступень». */
const ROLE_GROUPS: { title: string; roles: string[] }[] = [
  {
    title: "Поверхности",
    roles: ["background", "card", "popover", "muted", "accent", "sidebar"],
  },
  {
    title: "Текст",
    roles: ["foreground", "muted-foreground", "primary-foreground"],
  },
  { title: "Действия", roles: ["primary", "secondary"] },
  { title: "Статусы", roles: ["destructive", "success", "warning", "info"] },
  { title: "Линии", roles: ["border", "input", "ring"] },
  {
    title: "Графики",
    roles: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
]

const SURFACE_LABEL: Record<Surface, string> = {
  background: "Страница",
  card: "Карточка",
  muted: "Утопленный",
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="size-5 shrink-0 rounded-md border border-border"
      style={{ background: color }}
    />
  )
}

function GroupRow({ title, span }: { title: string; span: number }) {
  return (
    <TableRow className="bg-muted hover:bg-muted">
      <TableCell
        colSpan={span}
        className="pl-4 text-xs font-medium tracking-wider text-muted-foreground uppercase"
      >
        {title}
      </TableCell>
    </TableRow>
  )
}

function RolesTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Роль</TableHead>
            <TableHead>Ступень палитры</TableHead>
            <TableHead className="pr-4">Значение</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROLE_GROUPS.flatMap((g) => [
            <GroupRow key={g.title} title={g.title} span={3} />,
            ...g.roles.map((role) => (
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
                <TableCell className="pr-4 text-muted-foreground">
                  {toHex(toRgb(cssVar(role)))}
                </TableCell>
              </TableRow>
            )),
          ])}
        </TableBody>
      </Table>
    </div>
  )
}

function Ratio({ value, rule }: { value: number; rule: ContrastRule }) {
  if (value >= rule.min) return <>{value.toFixed(2)}</>
  return (
    <span
      className={cn(
        "font-medium",
        rule.known ? "text-warning" : "text-destructive"
      )}
    >
      {value.toFixed(2)} {rule.known ? "!" : "✕"}
    </span>
  )
}

/** Образец пары: цвет поверх подложки, как в компоненте. */
function PairSwatch({ rule }: { rule: ContrastRule }) {
  const css = (p: Paint) =>
    typeof p === "string"
      ? `var(--${p})`
      : `color-mix(in oklab, var(--${p[0]}) ${p[1] * 100}%, transparent)`
  return (
    <span
      className="flex h-5 w-8 shrink-0 items-center justify-center rounded-md border border-border text-xs font-medium"
      style={{
        background: rule.on ? css(rule.on) : undefined,
        color: css(rule.fg),
      }}
    >
      {rule.min >= 4.5 ? (
        "Aa"
      ) : (
        <span
          className="h-2.5 w-5 rounded-sm"
          style={{ background: css(rule.fg) }}
        />
      )}
    </span>
  )
}

function ContrastTable() {
  const color = (role: string) => toRgb(cssVar(role))
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Пара</TableHead>
            <TableHead>Где</TableHead>
            {SURFACES.map((s) => (
              <TableHead key={s} className="text-right">
                {SURFACE_LABEL[s]}
              </TableHead>
            ))}
            <TableHead className="pr-4 text-right">Порог</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RULE_GROUPS.flatMap((g) => [
            <GroupRow key={g.title} title={g.title} span={6} />,
            ...g.rules.map((rule) => (
              <TableRow key={`${g.title}-${ruleLabel(rule)}-${rule.where}`}>
                <TableCell className="pl-4">
                  <span className="flex items-center gap-2.5">
                    <PairSwatch rule={rule} />
                    {ruleLabel(rule)}
                  </span>
                </TableCell>
                <TableCell className="max-w-72 whitespace-normal text-muted-foreground">
                  {rule.where}
                  {rule.known && (
                    <span className="mt-1 block type-caption">
                      Известное: {rule.known}
                    </span>
                  )}
                </TableCell>
                {SURFACES.map((s) => (
                  <TableCell key={s} className="text-right">
                    <Ratio value={measure(rule, s, color)} rule={rule} />
                  </TableCell>
                ))}
                <TableCell className="pr-4 text-right text-muted-foreground">
                  {rule.min}:1
                </TableCell>
              </TableRow>
            )),
          ])}
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
        description="Каждая роль ссылается на ступень палитры. Значение — из браузера."
      >
        <RolesTable />
      </Section>
      <Section
        title="Контраст"
        description="Пары и пороги — те же, что проверяет pnpm test по index.css; здесь посчитаны в браузере на каждой поверхности. ✕ — ниже порога, ! — известное исключение, которое не решается значением."
      >
        <ContrastTable />
      </Section>
    </Page>
  )
}
