import { useEffect } from "react"
import { Components } from "./showcase/Components"
import { Foundations } from "./showcase/Foundations"

const NAV = [
  ["#palette", "Палитра"],
  ["#roles", "Роли"],
  ["#type", "Типографика"],
  ["#scales", "Радиусы и тени"],
  ["#components", "Компоненты"],
]

export default function App() {
  // Контент рендерится после загрузки — прокручиваем к якорю из адреса вручную.
  useEffect(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView()
  }, [])

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6">
          <span className="py-3 type-h4">shadcn-light-design</span>
          <nav className="flex gap-1">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-2 py-1 text-muted-foreground focus-ring hover:bg-accent hover:text-accent-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-[1440px] flex-col px-6">
        <div className="flex flex-col gap-3 py-12">
          <h1 className="type-display">Светлая дизайн-система для shadcn</h1>
          <p className="max-w-2xl text-muted-foreground">
            Бумага, чернила и ровные колонки цифр. Палитра из шести шкал, роли
            по контракту shadcn, три шрифта с разными задачами и два радиуса.
          </p>
        </div>
        <Foundations />
        <Components />
      </main>
    </div>
  )
}
