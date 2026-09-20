import type { ReactNode } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Page, Preview, Section } from "../kit"

const MARKETS = [
  ["Акции", "Российские и иностранные бумаги на Мосбирже."],
  ["Облигации", "ОФЗ, корпоративные и муниципальные выпуски."],
  ["Фонды", "БПИФ на индексы, золото и облигации."],
  ["Фьючерсы", "Срочный рынок: индексы, валюта, товары."],
] as const

function ListItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <NavigationMenuLink render={<a href="#/navigation-menu" />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}

export function NavigationMenuPage() {
  return (
    <Page
      title="NavigationMenu"
      lead="Верхняя навигация сайта с выпадающими панелями ссылок. Для меню действий — DropdownMenu, для разделов приложения — Sidebar."
    >
      <Section
        title="Состав"
        description="NavigationMenuTrigger открывает панель NavigationMenuContent; простая ссылка — NavigationMenuLink со стилем navigationMenuTriggerStyle()."
      >
        <Preview className="min-h-72">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Рынки</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[480px] grid-cols-2 gap-2">
                    {MARKETS.map(([title, text]) => (
                      <ListItem key={title} title={title}>
                        {text}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Инструменты</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-64">
                    <ListItem title="Скринер">
                      Фильтр бумаг по метрикам.
                    </ListItem>
                    <ListItem title="Роботы">Стратегии через API.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<a href="#/navigation-menu" />}
                  className={navigationMenuTriggerStyle()}
                >
                  Документация
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Preview>
      </Section>
    </Page>
  )
}
