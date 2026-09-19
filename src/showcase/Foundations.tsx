import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { contrast, cssVar, over, toHex, toRgb } from "./contrast"
import { Block, Section } from "./layout"
import { RAMPS, ROLE_SOURCE } from "./theme-source"
import { TweakcnExport } from "./TweakcnExport"

const RAMP_LABEL: Record<string, string> = {
  neutral: "neutral — бумага → чернила",
  brand: "brand — fern",
  green: "green — успех, рост",
  red: "red — peony, ошибка, падение",
  amber: "amber — fennel → honey → peach → охра",
  blue: "blue — информация",
}

function Palette() {
  return (
    <div className="flex flex-col gap-4">
      {RAMPS.map((ramp) => (
        <div key={ramp.name} className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground">
            {RAMP_LABEL[ramp.name]}
          </span>
          <div className="grid auto-cols-fr grid-flow-col overflow-hidden rounded-xl border border-border">
            {ramp.steps.map(({ step, pigment }) => {
              const rgb = toRgb(cssVar(`${ramp.name}-${step}`))
              const onLight =
                contrast(rgb, [0, 0, 0]) > contrast(rgb, [1, 1, 1])
              return (
                <div
                  key={step}
                  className="flex h-20 flex-col justify-between p-2 text-xs"
                  style={{
                    background: `var(--${ramp.name}-${step})`,
                    color: onLight ? "var(--neutral-900)" : "var(--neutral-0)",
                  }}
                >
                  <span className="font-medium">{step}</span>
                  <span className="opacity-90">{toHex(rgb)}</span>
                  {pigment && (
                    <span className="underline underline-offset-2">
                      {pigment}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * surface — поверхность; text — текст (≥4.5); fill — заливка с -foreground;
 * edgefill — заливка без рамки, должна сама давать край (≥1.3); status — текст (≥4.5),
 * мягкая подложка 10% и рамка /40; edge — лёгкая рамка (≥1.3); control — рамка контрола
 * и фокус (≥3); data — линии графиков (≥3).
 */
type Kind =
  | "surface"
  | "text"
  | "fill"
  | "edgefill"
  | "status"
  | "edge"
  | "control"
  | "data"
const MIN: Record<Kind, number> = {
  surface: 0,
  text: 4.5,
  fill: 4.5,
  edgefill: 1.3,
  status: 4.5,
  edge: 1.3,
  control: 3,
  data: 3,
}
const SURF = ["background", "card", "muted"] as const

const ROLE_GROUPS: { title: string; note: string; roles: [string, Kind][] }[] =
  [
    {
      title: "Поверхности",
      note: "Слои интерфейса. Отделяются рамкой border, не тенью.",
      roles: [
        ["background", "surface"],
        ["card", "surface"],
        ["popover", "surface"],
        ["muted", "surface"],
        ["accent", "surface"],
      ],
    },
    {
      title: "Текст",
      note: "Порог 4.5:1 на всех трёх поверхностях.",
      roles: [
        ["foreground", "text"],
        ["muted-foreground", "text"],
      ],
    },
    {
      title: "Действия",
      note: "primary — сплошная заливка с текстом primary-foreground. secondary — заливка, которая сама даёт край (≥1.3:1).",
      roles: [
        ["primary", "fill"],
        ["secondary", "edgefill"],
      ],
    },
    {
      title: "Статусы",
      note: "Текстом ≥4.5:1 на любой поверхности; мягкий вариант — подложка 10% и рамка /40.",
      roles: [
        ["destructive", "status"],
        ["success", "status"],
        ["warning", "status"],
        ["info", "status"],
      ],
    },
    {
      title: "Линии",
      note: "border — лёгкая рамка (≥1.3:1), input — рамка контрола (≥3:1), ring — фокус (≥3:1).",
      roles: [
        ["border", "edge"],
        ["input", "control"],
        ["ring", "control"],
      ],
    },
    {
      title: "Графики",
      note: "Линии и заливки данных, ≥3:1 к поверхности.",
      roles: [
        ["chart-1", "data"],
        ["chart-2", "data"],
        ["chart-3", "data"],
        ["chart-4", "data"],
        ["chart-5", "data"],
      ],
    },
  ]

function Ratio({ value, min }: { value: number; min: number }) {
  const ok = value >= min
  return (
    <span className={ok ? "text-foreground" : "font-medium text-destructive"}>
      {value.toFixed(1)}
      {ok ? "" : " ✕"}
    </span>
  )
}

function RoleCard({ role, kind }: { role: string; kind: Kind }) {
  const rgb = toRgb(cssVar(role))
  const fg =
    kind === "fill" || kind === "edgefill"
      ? toRgb(cssVar(`${role}-foreground`))
      : null
  const surfaces = SURF.map((s) => toRgb(cssVar(s)))
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="flex h-14 items-end p-2"
        style={{ background: `var(--${role})` }}
      >
        {fg && (
          <span
            className="text-xs"
            style={{ color: `var(--${role}-foreground)` }}
          >
            Аа {contrast(fg, rgb).toFixed(1)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-2 text-xs text-muted-foreground">
        <span className="text-sm font-medium text-foreground">{role}</span>
        <span>
          {ROLE_SOURCE[role] ?? "—"} · {toHex(rgb)}
        </span>
        {kind !== "surface" && kind !== "fill" && (
          <span>
            {SURF.map((s, i) => (
              <span key={s}>
                {i > 0 && " · "}
                {s === "background" ? "bg" : s}{" "}
                <Ratio value={contrast(rgb, surfaces[i])} min={MIN[kind]} />
              </span>
            ))}
          </span>
        )}
        {kind === "status" && (
          <span>
            мягкая: текст{" "}
            <Ratio
              value={Math.min(
                ...surfaces.map((b) => contrast(rgb, over(rgb, b, 0.1)))
              )}
              min={4.5}
            />{" "}
            · рамка /40{" "}
            <Ratio
              value={Math.min(
                ...surfaces.map((b) => contrast(over(rgb, b, 0.4), b))
              )}
              min={1.5}
            />
          </span>
        )}
      </div>
    </div>
  )
}

function Roles() {
  return (
    <div className="flex flex-col gap-8">
      {ROLE_GROUPS.map((g) => (
        <Block key={g.title} title={g.title} note={g.note}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {g.roles.map(([role, kind]) => (
              <RoleCard key={role} role={role} kind={kind} />
            ))}
          </div>
        </Block>
      ))}
    </div>
  )
}

const TYPE = [
  ["type-display", "Tektur · 36/40 · 500", "Поиск инструмента"],
  ["type-h1", "Tektur · 30/36 · 500 · h1", "Настройки терминала"],
  ["type-h2", "Tektur · 24/32 · 500 · h2", "API Т-Банка"],
  ["type-h3", "Tektur · 20/28 · 500 · h3", "Стабильность соединения"],
  ["type-h4", "Tektur · 16/24 · 500 · h4", "Стакан заявок"],
  ["text-base", "JetBrains Mono · шрифт по умолчанию", "SBER 312.45 ▲ 1 850"],
  [
    "text-sm",
    "JetBrains Mono · кнопки, поля, таблицы",
    "Сохранить · FIGI BBG004730N88 · 14:32:07",
  ],
  ["text-xs", "JetBrains Mono · бейджи, подписи", "Покупка 58% · Продажа 42%"],
  [
    "type-body",
    "Inter · 14/22 · описания, p",
    "Песочница использует отдельный токен и виртуальный счёт — реальные деньги не затрагиваются.",
  ],
  [
    "type-caption",
    "Inter · 12/16 · подсказки",
    "Токен хранится на сервере в зашифрованном виде.",
  ],
] as const

function Typography() {
  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
      {TYPE.map(([cls, meta, sample]) => (
        <div
          key={cls}
          className="grid gap-2 p-4 md:grid-cols-[240px_1fr] md:items-baseline"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium">{cls}</span>
            <span className="text-xs text-muted-foreground">{meta}</span>
          </div>
          <span className={cls}>{sample}</span>
        </div>
      ))}
    </div>
  )
}

const RADII = [
  ["rounded-md", "пункты меню"],
  ["rounded-lg", "= --radius · кнопки, поля, меню"],
  ["rounded-xl", "карточки, диалоги"],
  ["rounded-4xl", "бейджи"],
] as const

function Scales() {
  const base = cssVar("radius")
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Block
        title="Радиусы"
        note={`Один --radius (${base}); остальные shadcn считает от него множителями ×0.6 … ×2.6.`}
      >
        <div className="flex gap-4">
          {RADII.map(([c, l]) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div className={`size-14 border border-input bg-card ${c}`} />
              <span className="text-xs text-muted-foreground">{c}</span>
              <span className="max-w-24 text-center type-caption text-muted-foreground">
                {l}
              </span>
            </div>
          ))}
        </div>
      </Block>
      <Block
        title="Тени"
        note="Стандартные тени Tailwind. shadcn даёт их только слоям над страницей."
      >
        <div className="flex gap-6 bg-background p-2">
          {[
            ["shadow-md", "меню, поповеры"],
            ["shadow-lg", "диалоги, тосты"],
          ].map(([c, l]) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div
                className={`size-14 rounded-xl border border-border bg-popover ${c}`}
              />
              <span className="text-xs text-muted-foreground">{c}</span>
              <span className="type-caption text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
      </Block>
      <Block
        title="Фокус"
        note="Штатный фокус shadcn: рамка цвета --ring и ореол ring/50. Настраивается одной переменной --ring."
      >
        <div className="flex items-center gap-4 p-2">
          <Button className="border-ring ring-3 ring-ring/50">Кнопка</Button>
          <Input
            className="w-40 border-ring ring-3 ring-ring/50"
            defaultValue="Поле"
            aria-label="Поле в фокусе"
          />
        </div>
      </Block>
    </div>
  )
}

export function Foundations() {
  return (
    <>
      <Section
        id="palette"
        title="Палитра"
        lead="Шесть шкал — источник значений ролей. Пигменты исходной темы стоят в шкалах точными значениями. Компоненты палитру не используют."
      >
        <Palette />
      </Section>
      <Section
        id="roles"
        title="Роли"
        lead="Контракт shadcn + success, warning, info. Каждая роль — ступень палитры. Контраст посчитан в браузере по реальным значениям."
      >
        <Roles />
      </Section>
      <Section
        id="tweakcn"
        title="Песочница tweakcn"
        lead="Роли темы в формате tweakcn: скопируйте и вставьте в tweakcn.com → Import. Поиграйте с цветами на его примерах, а понравившиеся значения перенесите в палитру."
      >
        <TweakcnExport />
      </Section>
      <Section
        id="type"
        title="Типографика"
        lead="Tektur — заголовки. JetBrains Mono — интерфейс, контролы и числа (шрифт по умолчанию). Inter — только связный текст."
      >
        <Typography />
      </Section>
      <Section id="scales" title="Радиусы, тени, фокус">
        <Scales />
      </Section>
    </>
  )
}
