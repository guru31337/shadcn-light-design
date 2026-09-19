// Собирает registry.json (реестр shadcn для установки прямо из GitHub) из src/index.css.
// Роли уходят в проект уже с подставленными значениями палитры — как у любой темы shadcn,
// без слоя палитры. Запуск: pnpm registry
import { readFileSync, writeFileSync } from "node:fs"

const REPO = "guru31337/shadcn-light-design"
const css = readFileSync(new URL("../src/index.css", import.meta.url), "utf8")

// Палитра: --neutral-50: oklch(...);
const palette = Object.fromEntries(
  [...css.matchAll(/^\s*--((?:neutral|brand|green|red|amber|blue)-\d+):\s*([^;]+);/gm)].map(([, k, v]) => [k, v.trim()])
)

// Роли: первый блок :root { ... }, в котором нет палитры.
const rolesBlock = css.match(/:root\s*\{([^}]*--background[^}]*)\}/)[1]
const roles = {}
for (const [, name, raw] of rolesBlock.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
  let value = raw.trim()
  const ref = value.match(/^var\(--([a-z0-9-]+)\)$/)
  if (ref) value = palette[ref[1]] ?? roles[ref[1]] ?? value
  roles[name] = value
}
const unresolved = Object.entries(roles).filter(([, v]) => v.includes("var("))
if (unresolved.length) throw new Error(`Не удалось подставить: ${unresolved.map(([k]) => k).join(", ")}`)

// Утилиты type-* — как в index.css
const utilities = Object.fromEntries(
  [...css.matchAll(/@utility (type-[a-z0-9-]+) \{([^}]+)\}/g)].map(([, name, body]) => [
    `@utility ${name}`,
    Object.fromEntries(body.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
      const i = d.indexOf(":")
      return [d.slice(0, i).trim(), d.slice(i + 1).trim()]
    })),
  ])
)

const font = (name, title, family, variable, importName, dependency) => ({
  name,
  type: "registry:font",
  title,
  font: { family, provider: "google", import: importName, variable, subsets: ["latin", "cyrillic"], dependency },
})

const gh = (item) => `${REPO}/${item}`

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "shadcn-light-design",
  homepage: `https://github.com/${REPO}`,
  items: [
    font("font-heading-tektur", "Tektur (заголовки)", "'Tektur Variable', sans-serif", "--font-heading", "Tektur", "@fontsource-variable/tektur"),
    font("font-sans-jetbrains-mono", "JetBrains Mono (интерфейс)", "'JetBrains Mono Variable', monospace", "--font-sans", "JetBrains_Mono", "@fontsource-variable/jetbrains-mono"),
    font("font-mono-jetbrains-mono", "JetBrains Mono (код)", "'JetBrains Mono Variable', monospace", "--font-mono", "JetBrains_Mono", "@fontsource-variable/jetbrains-mono"),
    font("font-text-inter", "Inter (связный текст)", "'Inter Variable', sans-serif", "--font-text", "Inter", "@fontsource-variable/inter"),
    {
      name: "theme",
      type: "registry:theme",
      title: "Светлая тема",
      description: "Роли shadcn + success/warning/info, радиус 0.125rem, шкала заголовков, Inter для описаний по data-slot.",
      registryDependencies: ["font-heading-tektur", "font-sans-jetbrains-mono", "font-mono-jetbrains-mono", "font-text-inter"].map(gh),
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
        "@layer base": {
          '[data-slot$="-description"], [data-slot$="-error"], [data-slot="tooltip-content"], p': {
            "font-family": "var(--font-text)",
          },
          h1: { "@apply type-h1": {} },
          h2: { "@apply type-h2": {} },
          h3: { "@apply type-h3": {} },
          h4: { "@apply type-h4": {} },
        },
      },
    },
    ...[
      ["button", "Button", "варианты success и рамка у мягкого destructive", ["@base-ui/react", "class-variance-authority", "cn"]],
      ["badge", "Badge", "варианты success/warning/info и рамка у мягкого destructive", ["@base-ui/react", "class-variance-authority", "cn"]],
      ["alert", "Alert", "варианты success/warning/info", ["class-variance-authority", "cn"]],
    ].map(([name, title, what, dependencies]) => ({
      name,
      type: "registry:ui",
      title,
      description: `shadcn ${title} (base-nova): ${what}.`,
      dependencies,
      files: [{ path: `src/components/ui/${name}.tsx`, type: "registry:ui" }],
    })),
    {
      name: "light-design",
      type: "registry:item",
      title: "Светлая дизайн-система целиком",
      description: "Тема, шрифты и изменённые компоненты (button, badge, alert). Остальные компоненты — штатные из shadcn.",
      registryDependencies: ["theme", "button", "badge", "alert"].map(gh),
    },
  ],
}

writeFileSync(new URL("../registry.json", import.meta.url), JSON.stringify(registry, null, 2) + "\n")
console.log(`registry.json: ${registry.items.length} элементов, ролей ${Object.keys(roles).length}`)
