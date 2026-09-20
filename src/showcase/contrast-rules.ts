// Контраст WCAG: пороги, пары ролей и формулы. Один источник для витрины (цвета из браузера)
// и для теста `pnpm test` (цвета из index.css). Модуль без импортов и без DOM — его читает Node.

/** Цвет в sRGB, каналы 0..1. */
export type Rgb = number[]

export type Surface = "background" | "card" | "muted"
export const SURFACES: Surface[] = ["background", "card", "muted"]

/** Пороги из AGENTS.md. */
export const MIN = {
  text: 4.5, // текст и -foreground на своей заливке, статус на мягкой подложке
  control: 3, // рамка контрола, фокус, линии графиков
  edge: 1.3, // лёгкая рамка, заливка без рамки
  softEdge: 1.5, // край мягкого варианта (цвет /40)
} as const

/** Роль или роль с прозрачностью, как в классе: ["primary", 0.8] = bg-primary/80. */
export type Paint = string | [role: string, alpha: number]

export type ContrastRule = {
  /** Что проверяем: текст, рамку или заливку. */
  fg: Paint
  /** Подложка под ним, поверх поверхности. Без неё — сама поверхность. */
  on?: Paint
  min: number
  /** Где пара встречается. */
  where: string
  /** Известное исключение: почему не решается значением в index.css. Тест помечает его TODO. */
  known?: string
}

export type RuleGroup = { title: string; rules: ContrastRule[] }

const STATUSES = ["destructive", "success", "warning", "info"]

export const RULE_GROUPS: RuleGroup[] = [
  {
    title: "Текст на поверхностях",
    rules: [
      { fg: "foreground", min: MIN.text, where: "основной текст" },
      {
        fg: "muted-foreground",
        min: MIN.text,
        where: "описания, подписи, плейсхолдеры",
      },
      { fg: "primary", min: MIN.text, where: "Button link, ссылки" },
      ...STATUSES.map((s) => ({
        fg: s,
        min: MIN.text,
        where: s === "destructive" ? "ошибка под полем" : "статус текстом",
      })),
    ],
  },
  {
    title: "Текст на своей заливке",
    rules: [
      {
        fg: "primary-foreground",
        on: "primary",
        min: MIN.text,
        where: "Button и Badge default",
      },
      {
        fg: "primary-foreground",
        on: ["primary", 0.8],
        min: MIN.text,
        where: "наведение на Button default",
      },
      {
        fg: "secondary-foreground",
        on: "secondary",
        min: MIN.text,
        where: "Button secondary",
      },
      {
        fg: "accent-foreground",
        on: "accent",
        min: MIN.text,
        where: "выбранное: пункт меню, нажатый Toggle",
      },
      {
        fg: "card-foreground",
        on: "card",
        min: MIN.text,
        where: "Card",
      },
      {
        fg: "popover-foreground",
        on: "popover",
        min: MIN.text,
        where: "меню, поповеры, диалоги",
      },
      {
        fg: "sidebar-foreground",
        on: "sidebar",
        min: MIN.text,
        where: "Sidebar",
      },
      {
        fg: "sidebar-primary-foreground",
        on: "sidebar-primary",
        min: MIN.text,
        where: "Sidebar: главный пункт",
      },
      {
        fg: "sidebar-accent-foreground",
        on: "sidebar-accent",
        min: MIN.text,
        where: "Sidebar: активный пункт",
      },
    ],
  },
  {
    title: "Мягкие варианты статусов",
    rules: STATUSES.flatMap((s) => [
      {
        fg: s,
        on: [s, 0.1] as Paint,
        min: MIN.text,
        where: "текст на подложке /10",
      },
      {
        fg: [s, 0.4] as Paint,
        min: MIN.softEdge,
        where: "рамка /40 у Button и Badge",
      },
    ]),
  },
  {
    title: "Контролы, фокус, графики",
    rules: [
      { fg: "input", min: MIN.control, where: "рамка поля, трек Switch" },
      { fg: "ring", min: MIN.control, where: "рамка фокуса" },
      ...[1, 2, 3, 4, 5].map((n) => ({
        fg: `chart-${n}`,
        min: MIN.control,
        where: "линия графика",
      })),
    ],
  },
  {
    title: "Края",
    rules: [
      { fg: "border", min: MIN.edge, where: "лёгкая рамка, разделители" },
      {
        fg: "secondary",
        min: MIN.edge,
        where: "Button secondary, дорожки Slider и Progress, Skeleton",
      },
      {
        fg: "accent",
        min: MIN.edge,
        where: "выбранное: пункт меню и Command, нажатый Toggle, пункт Sidebar",
      },
      {
        fg: ["foreground", 0.1],
        min: MIN.edge,
        where: "край Card, Popover, Dialog: ring-foreground/10",
        known:
          "прозрачность зашита в классы shadcn: 10% даже от чёрного дают не больше 1.25:1. Карточку отделяет ещё и фон card, всплывающие слои — тень",
      },
    ],
  },
  {
    title: "Прозрачность в классах компонентов",
    rules: [
      {
        fg: ["foreground", 0.6],
        on: "muted",
        min: MIN.text,
        where: "Tabs: неактивная вкладка",
      },
      {
        fg: ["foreground", 0.6],
        min: MIN.text,
        where: 'Tabs variant="line": неактивная вкладка',
      },
      ...STATUSES.map((s) => ({
        fg: [s, 0.9] as Paint,
        on: "card",
        min: MIN.text,
        where: `Alert ${s}: описание`,
      })),
      {
        fg: ["destructive", 0.8],
        min: MIN.text,
        where: "Attachment: описание ошибки",
      },
      {
        fg: ["sidebar-foreground", 0.7],
        on: "sidebar",
        min: MIN.text,
        where: "Sidebar: подпись группы",
      },
    ],
  },
]

// --- формулы -------------------------------------------------------------------------------

const lin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const lum = ([r, g, b]: Rgb) =>
  0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

export function contrast(a: Rgb, b: Rgb): number {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Наложение цвета с прозрачностью поверх подложки — как это делает браузер (в sRGB). */
export function over(fg: Rgb, bg: Rgb, alpha: number): Rgb {
  return fg.map((v, i) => v * alpha + bg[i] * (1 - alpha))
}

export function paintLabel(p: Paint): string {
  return typeof p === "string" ? p : `${p[0]}/${Math.round(p[1] * 100)}`
}

export function ruleLabel(rule: ContrastRule): string {
  return rule.on
    ? `${paintLabel(rule.fg)} на ${paintLabel(rule.on)}`
    : paintLabel(rule.fg)
}

/** Контраст пары на поверхности. color — значение роли в sRGB (из браузера или из index.css). */
export function measure(
  rule: ContrastRule,
  surface: Surface,
  color: (role: string) => Rgb
): number {
  const paint = (p: Paint, under: Rgb) =>
    typeof p === "string" ? color(p) : over(color(p[0]), under, p[1])
  const base = color(surface)
  const bg = rule.on ? paint(rule.on, base) : base
  return contrast(paint(rule.fg, bg), bg)
}
