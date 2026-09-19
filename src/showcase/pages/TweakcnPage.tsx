import { Check, Copy } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cssVar, toHex, toRgb } from "../contrast"
import { Code, Page, Section } from "../kit"

// Имена цветовых переменных, которые понимает импорт tweakcn (его схема ThemeStyleProps).
const COLORS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]

function buildCss(): string {
  const hex = (name: string) => toHex(toRgb(cssVar(name)))
  const lines = COLORS.map((name) => `  --${name}: ${hex(name)};`)
  // В base-nova нет destructive-foreground, а tweakcn его ждёт — текст на сплошном destructive.
  lines.splice(
    COLORS.indexOf("destructive") + 1,
    0,
    `  --destructive-foreground: ${hex("primary-foreground")};`
  )
  lines.push(
    "  --font-sans: JetBrains Mono, monospace;",
    "  --font-mono: JetBrains Mono, monospace;",
    `  --radius: ${cssVar("radius")};`
  )
  return `:root {\n${lines.join("\n")}\n}`
}

export function TweakcnPage() {
  const css = useMemo(() => buildCss(), [])
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Page
      title="Песочница tweakcn"
      lead="Роли темы в формате импорта tweakcn. Вставьте в tweakcn.com → Import, поиграйте с цветами на его примерах, а понравившиеся значения перенесите в палитру index.css."
    >
      <Section
        title="Экспорт"
        description="Не попадут: success, warning, info, шрифт заголовков Tektur и Inter для текста — в схеме tweakcn их нет."
      >
        <div>
          <Button onClick={copy}>
            {copied ? (
              <Check data-icon="inline-start" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            {copied ? "Скопировано" : "Скопировать для tweakcn"}
          </Button>
        </div>
        <Code>{css}</Code>
      </Section>
    </Page>
  )
}
