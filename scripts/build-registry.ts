// Собирает registry.json (реестр shadcn для установки прямо из GitHub) из src/index.css.
// Роли уходят в проект уже с подставленными значениями палитры — как у любой темы shadcn,
// без слоя палитры. Запуск: pnpm registry
import { writeFileSync } from "node:fs"
import { baseRules, css, roles } from "./theme.ts"

const REPO = "guru31337/shadcn-light-design"

// Утилиты type-* — как в index.css
const utilities: Record<string, Record<string, string>> = Object.fromEntries(
  [...css.matchAll(/@utility (type-[a-z0-9-]+) \{([^}]+)\}/g)].map(
    ([, name, body]) => [
      `@utility ${name}`,
      Object.fromEntries(
        body
          .split(";")
          .map((d) => d.trim())
          .filter(Boolean)
          .map((d) => {
            const i = d.indexOf(":")
            return [d.slice(0, i).trim(), d.slice(i + 1).trim()]
          })
      ),
    ]
  )
)

const font = (
  name: string,
  title: string,
  family: string,
  variable: string,
  importName: string,
  dependency: string
) => ({
  name,
  type: "registry:font",
  title,
  font: {
    family,
    provider: "google",
    import: importName,
    variable,
    subsets: ["latin", "cyrillic"],
    dependency,
  },
})

const gh = (item: string) => `${REPO}/${item}`

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "shadcn-light-design",
  homepage: `https://github.com/${REPO}`,
  items: [
    font(
      "font-heading-tektur",
      "Tektur (заголовки)",
      "'Tektur Variable', sans-serif",
      "--font-heading",
      "Tektur",
      "@fontsource-variable/tektur"
    ),
    font(
      "font-sans-jetbrains-mono",
      "JetBrains Mono (интерфейс)",
      "'JetBrains Mono Variable', monospace",
      "--font-sans",
      "JetBrains_Mono",
      "@fontsource-variable/jetbrains-mono"
    ),
    font(
      "font-mono-jetbrains-mono",
      "JetBrains Mono (код)",
      "'JetBrains Mono Variable', monospace",
      "--font-mono",
      "JetBrains_Mono",
      "@fontsource-variable/jetbrains-mono"
    ),
    font(
      "font-text-inter",
      "Inter (связный текст)",
      "'Inter Variable', sans-serif",
      "--font-text",
      "Inter",
      "@fontsource-variable/inter"
    ),
    {
      name: "theme",
      type: "registry:theme",
      title: "Светлая тема",
      description: `Роли shadcn + success/warning/info, радиус ${roles.radius}, шкала заголовков, правила по data-slot: Inter в связном тексте, видимые нажатый Toggle, дорожки, Skeleton и выбор в Command.`,
      registryDependencies: [
        "font-heading-tektur",
        "font-sans-jetbrains-mono",
        "font-mono-jetbrains-mono",
        "font-text-inter",
      ].map(gh),
      cssVars: {
        theme: {
          "color-success": "var(--success)",
          "color-warning": "var(--warning)",
          "color-info": "var(--info)",
        },
        light: roles,
      },
      css: {
        ...utilities,
        "@layer base": baseRules,
      },
    },
    ...(
      [
        [
          "button",
          "Button",
          "варианты success и рамка у мягкого destructive",
          ["@base-ui/react", "class-variance-authority", "cn"],
        ],
        [
          "badge",
          "Badge",
          "варианты success/warning/info и рамка у мягкого destructive",
          ["@base-ui/react", "class-variance-authority", "cn"],
        ],
        [
          "alert",
          "Alert",
          "варианты success/warning/info",
          ["class-variance-authority", "cn"],
        ],
      ] as [string, string, string, string[]][]
    ).map(([name, title, what, dependencies]) => ({
      name,
      type: "registry:ui",
      title,
      description: `shadcn ${title} (base-nova): ${what}.`,
      dependencies,
      files: [{ path: `src/components/ui/${name}.tsx`, type: "registry:ui" }],
    })),
    {
      name: "light-design",
      // registry:theme, а не registry:item: CLI перезаписывает существующие переменные проекта
      // (--primary, --radius, --font-sans …), только если запрошен элемент типа theme/style/font.
      type: "registry:theme",
      title: "Светлая дизайн-система целиком",
      description:
        "Тема, шрифты и изменённые компоненты (button, badge, alert). Остальные компоненты — штатные из shadcn.",
      registryDependencies: ["theme", "button", "badge", "alert"].map(gh),
    },
  ],
}

writeFileSync(
  new URL("../registry.json", import.meta.url),
  JSON.stringify(registry, null, 2) + "\n"
)
console.log(
  `registry.json: ${registry.items.length} элементов, ролей ${Object.keys(roles).length}`
)
