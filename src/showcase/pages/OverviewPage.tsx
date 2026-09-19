import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Code, Page, Section } from "../kit"

const PRINCIPLES = [
  [
    "Устройство shadcn",
    "Тема повторяет то, что генерирует shadcn init. Индивидуальность — в значениях, а не в структуре.",
  ],
  [
    "Дизайн в index.css",
    "Компоненты shadcn остаются как в реестре. Правки — только новые варианты ролей и рамки.",
  ],
  [
    "Цвет — это смысл",
    "Роли shadcn + success, warning, info. Сырые цвета в коде не используются.",
  ],
  [
    "Видимые края",
    "Любой элемент заметен на любой поверхности: сплошная заливка или рамка. Тени — только у слоёв над страницей.",
  ],
] as const

const FONTS = [
  ["Tektur", "font-heading", "Заголовки", "var(--font-heading)"],
  [
    "JetBrains Mono",
    "font-sans",
    "Интерфейс, контролы, числа",
    "var(--font-sans)",
  ],
  [
    "Inter",
    "font-text",
    "Связный текст: описания, подсказки",
    "var(--font-text)",
  ],
] as const

export function OverviewPage() {
  return (
    <Page
      title="Светлая дизайн-система для shadcn"
      lead="Бумага, чернила и ровные колонки цифр. Тёплая нейтральная шкала, шалфейный бренд, три шрифта с разными задачами и один радиус, от которого считаются остальные."
    >
      <Section
        title="Установка"
        description="В любой проект на shadcn (Tailwind v4, стиль base-nova). Ставит тему, шрифты и три изменённых компонента; остальные компоненты — штатные из shadcn."
      >
        <Code>
          pnpm dlx shadcn@latest add guru31337/shadcn-light-design/light-design
        </Code>
      </Section>

      <Section title="Принципы">
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(([title, text]) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Шрифты">
        <div className="grid gap-4 md:grid-cols-3">
          {FONTS.map(([name, token, role, family]) => (
            <Card key={name}>
              <CardHeader>
                <span
                  className="text-5xl leading-none"
                  style={{ fontFamily: family }}
                >
                  Аа
                </span>
                <CardTitle className="mt-4">{name}</CardTitle>
                <CardDescription>{role}</CardDescription>
                <span className="text-xs text-muted-foreground">{token}</span>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </Page>
  )
}
