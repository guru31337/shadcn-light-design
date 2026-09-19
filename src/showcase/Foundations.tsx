import { RAMPS, ROLE_SOURCE } from "./theme-source"
import { contrast, cssVar, over, toHex, toRgb } from "./contrast"
import { Block, Section } from "./layout"

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
          <span className="type-ui-sm text-muted-foreground">
            {RAMP_LABEL[ramp.name]}
          </span>
          <div className="grid auto-cols-fr grid-flow-col overflow-hidden rounded-md border border-border">
            {ramp.steps.map(({ step, pigment }) => {
              const rgb = toRgb(cssVar(`${ramp.name}-${step}`))
              const onLight =
                contrast(rgb, [0, 0, 0]) > contrast(rgb, [1, 1, 1])
              return (
                <div
                  key={step}
                  className="flex h-20 flex-col justify-between p-2"
                  style={{
                    background: `var(--${ramp.name}-${step})`,
                    color: onLight ? "var(--neutral-900)" : "var(--neutral-0)",
                  }}
                >
                  <span className="type-ui-sm font-medium">{step}</span>
                  <span className="type-ui-sm opacity-90">{toHex(rgb)}</span>
                  {pigment && (
                    <span className="type-ui-sm underline underline-offset-2">
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

type Kind = "surface" | "text" | "fill" | "control" | "edge" | "data"
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
        ["secondary", "surface"],
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
      title: "Действие и статусы",
      note: "Читаются как текст (≥4.5:1) и работают как заливка с -foreground.",
      roles: [
        ["primary", "fill"],
        ["destructive", "fill"],
        ["success", "fill"],
        ["warning", "fill"],
        ["info", "fill"],
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
const MIN: Record<Kind, number> = {
  surface: 0,
  text: 4.5,
  fill: 4.5,
  control: 3,
  edge: 1.3,
  data: 3,
}
const SURF = ["background", "card", "muted"] as const

function Ratio({ value, min }: { value: number; min: number }) {
  const ok = value >= min
  return (
    <span className={ok ? "text-foreground" : "font-medium text-destructive"}>
      {value.toFixed(1)}
      {ok ? "" : " ✕"}
    </span>
  )
}

function Roles() {
  return (
    <div className="flex flex-col gap-8">
      {ROLE_GROUPS.map((g) => (
        <Block key={g.title} title={g.title} note={g.note}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {g.roles.map(([role, kind]) => {
              const rgb = toRgb(cssVar(role))
              const fg =
                kind === "fill" ? toRgb(cssVar(`${role}-foreground`)) : null
              return (
                <div
                  key={role}
                  className="flex flex-col overflow-hidden rounded-md border border-border bg-card"
                >
                  <div
                    className="flex h-14 items-end p-2"
                    style={{ background: `var(--${role})` }}
                  >
                    {kind === "fill" && (
                      <span
                        className="type-ui-sm"
                        style={{ color: `var(--${role}-foreground)` }}
                      >
                        Аа {fg && contrast(fg, rgb).toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <span className="type-ui font-medium">{role}</span>
                    <span className="type-ui-sm text-muted-foreground">
                      {ROLE_SOURCE[role] ?? "—"} · {toHex(rgb)}
                    </span>
                    {kind !== "surface" && (
                      <span className="type-ui-sm text-muted-foreground">
                        {SURF.map((s, i) => (
                          <span key={s}>
                            {i > 0 && " · "}
                            {s === "background" ? "bg" : s}{" "}
                            <Ratio
                              value={contrast(rgb, toRgb(cssVar(s)))}
                              min={MIN[kind]}
                            />
                          </span>
                        ))}
                      </span>
                    )}
                    {kind === "fill" && (
                      <span className="type-ui-sm text-muted-foreground">
                        мягкая 10% · текст{" "}
                        <Ratio
                          value={Math.min(
                            ...SURF.map((s) =>
                              contrast(rgb, over(rgb, toRgb(cssVar(s)), 0.1))
                            )
                          )}
                          min={4.5}
                        />{" "}
                        · рамка /40{" "}
                        <Ratio
                          value={Math.min(
                            ...SURF.map((s) => {
                              const b = toRgb(cssVar(s))
                              return contrast(over(rgb, b, 0.4), b)
                            })
                          )}
                          min={1.5}
                        />
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
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
  ["type-ui-lg", "JetBrains Mono · 16/24", "SBER 312.45 ▲ 1 850"],
  [
    "type-ui",
    "JetBrains Mono · 14/20 — интерфейс по умолчанию",
    "Сохранить · FIGI BBG004730N88 · 14:32:07",
  ],
  ["type-ui-sm", "JetBrains Mono · 12/16", "Покупка 58% · Продажа 42%"],
  [
    "type-body",
    "Inter · 14/22 · p",
    "Песочница использует отдельный токен и виртуальный счёт — реальные деньги не затрагиваются.",
  ],
  [
    "type-caption",
    "Inter · 12/16",
    "Токен хранится на сервере в зашифрованном виде.",
  ],
] as const

function Typography() {
  return (
    <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-card">
      {TYPE.map(([cls, meta, sample]) => (
        <div
          key={cls}
          className="grid gap-2 p-4 md:grid-cols-[220px_1fr] md:items-baseline"
        >
          <div className="flex flex-col">
            <span className="type-ui font-medium">{cls}</span>
            <span className="type-ui-sm text-muted-foreground">{meta}</span>
          </div>
          <span className={cls}>{sample}</span>
        </div>
      ))}
    </div>
  )
}

function Scales() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Block
        title="Радиусы"
        note="Два значения + полное скругление для точек, радио и аватаров."
      >
        <div className="flex gap-4">
          {[
            ["rounded-sm", "2px · контролы"],
            ["rounded-md", "4px · контейнеры"],
            ["rounded-full", "точки, радио"],
          ].map(([c, l]) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div className={`size-16 border border-input bg-card ${c}`} />
              <span className="type-ui-sm text-muted-foreground">{c}</span>
              <span className="type-caption text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
      </Block>
      <Block
        title="Тени"
        note="Только у слоёв над страницей. Карточки и контролы — без теней, с рамкой."
      >
        <div className="flex gap-6 bg-background p-2">
          {[
            ["shadow-md", "меню, тултипы"],
            ["shadow-lg", "диалоги, тосты"],
          ].map(([c, l]) => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div
                className={`size-16 rounded-md border border-border bg-popover ${c}`}
              />
              <span className="type-ui-sm text-muted-foreground">{c}</span>
              <span className="type-caption text-muted-foreground">{l}</span>
            </div>
          ))}
        </div>
      </Block>
      <Block
        title="Фокус"
        note="Утилита focus-ring: сплошное кольцо ring 2px с отступом 2px."
      >
        <div className="flex items-center gap-4 p-2">
          <div className="flex h-8 items-center rounded-sm bg-primary px-2.5 text-primary-foreground outline-2 outline-offset-2 outline-ring">
            Кнопка
          </div>
          <div className="flex h-8 w-40 items-center rounded-sm border border-ring bg-card px-2.5 outline-2 outline-offset-2 outline-ring">
            Поле
          </div>
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
        lead="Шесть шкал — единственное место с конкретными цветами. Пигменты исходной темы стоят в шкалах точными значениями. Компоненты палитру не используют."
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
        id="type"
        title="Типографика"
        lead="Tektur — заголовки. JetBrains Mono — интерфейс, контролы и числа. Inter — только связный текст: описания, подсказки, сообщения."
      >
        <Typography />
      </Section>
      <Section id="scales" title="Радиусы, тени, фокус">
        <Scales />
      </Section>
    </>
  )
}
