// Реестр страниц витрины: порядок, группа в навигации, компонент.
import type { ComponentType } from "react"
import { AlertPage } from "./pages/AlertPage"
import { BadgePage } from "./pages/BadgePage"
import { ButtonPage } from "./pages/ButtonPage"
import { CardPage } from "./pages/CardPage"
import { ColorsPage } from "./pages/ColorsPage"
import { FormsPage } from "./pages/FormsPage"
import { OverviewPage } from "./pages/OverviewPage"
import { ShapePage } from "./pages/ShapePage"
import { TweakcnPage } from "./pages/TweakcnPage"
import { TypographyPage } from "./pages/TypographyPage"

export type ShowcasePage = {
  id: string
  title: string
  group: string
  Component: ComponentType
}

export const PAGES: ShowcasePage[] = [
  { id: "", title: "Обзор", group: "Основа", Component: OverviewPage },
  { id: "colors", title: "Цвета", group: "Основа", Component: ColorsPage },
  {
    id: "typography",
    title: "Типографика",
    group: "Основа",
    Component: TypographyPage,
  },
  { id: "shape", title: "Форма и тени", group: "Основа", Component: ShapePage },
  { id: "button", title: "Button", group: "Компоненты", Component: ButtonPage },
  { id: "badge", title: "Badge", group: "Компоненты", Component: BadgePage },
  {
    id: "forms",
    title: "Поля формы",
    group: "Компоненты",
    Component: FormsPage,
  },
  { id: "card", title: "Card", group: "Компоненты", Component: CardPage },
  { id: "alert", title: "Alert", group: "Компоненты", Component: AlertPage },
  {
    id: "tweakcn",
    title: "tweakcn",
    group: "Инструменты",
    Component: TweakcnPage,
  },
]
