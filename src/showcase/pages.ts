// Реестр страниц витрины: порядок, группа в навигации, компонент.
import type { ComponentType } from "react"
import { AccordionPage } from "./pages/AccordionPage"
import { AlertPage } from "./pages/AlertPage"
import { AttachmentPage } from "./pages/AttachmentPage"
import { AvatarPage } from "./pages/AvatarPage"
import { BadgePage } from "./pages/BadgePage"
import { BreadcrumbPaginationPage } from "./pages/BreadcrumbPage"
import { ButtonGroupPage } from "./pages/ButtonGroupPage"
import { ButtonPage } from "./pages/ButtonPage"
import { CalendarPage } from "./pages/CalendarPage"
import { CardPage } from "./pages/CardPage"
import { CarouselPage } from "./pages/CarouselPage"
import { ChartPage } from "./pages/ChartPage"
import { ChatPage } from "./pages/ChatPage"
import { ChoicePage } from "./pages/ChoicePage"
import { ColorsPage } from "./pages/ColorsPage"
import { CommandPage } from "./pages/CommandPage"
import { DialogPage } from "./pages/DialogPage"
import { EmptyPage } from "./pages/EmptyPage"
import { FormsPage } from "./pages/FormsPage"
import { InputOTPPage } from "./pages/InputOTPPage"
import { ItemPage } from "./pages/ItemPage"
import { KbdPage } from "./pages/KbdPage"
import { LayoutPage } from "./pages/LayoutPage"
import { MenuPage } from "./pages/MenuPage"
import { NavigationMenuPage } from "./pages/NavigationMenuPage"
import { OverviewPage } from "./pages/OverviewPage"
import { PopoverPage } from "./pages/PopoverPage"
import { ProgressPage } from "./pages/ProgressPage"
import { QuestionnairePage } from "./pages/QuestionnairePage"
import { SelectPage } from "./pages/SelectPage"
import { ShapePage } from "./pages/ShapePage"
import { SheetPage } from "./pages/SheetPage"
import { SidebarPage } from "./pages/SidebarPage"
import { SliderPage } from "./pages/SliderPage"
import { TablePage } from "./pages/TablePage"
import { TabsPage } from "./pages/TabsPage"
import { ToastPage } from "./pages/ToastPage"
import { TogglePage } from "./pages/TogglePage"
import { TweakcnPage } from "./pages/TweakcnPage"
import { TypographyPage } from "./pages/TypographyPage"

export type ShowcasePage = {
  id: string
  title: string
  group: string
  Component: ComponentType
}

const page = (
  group: string,
  id: string,
  title: string,
  Component: ComponentType
): ShowcasePage => ({ group, id, title, Component })

export const PAGES: ShowcasePage[] = [
  page("Основа", "", "Обзор", OverviewPage),
  page("Основа", "colors", "Цвета", ColorsPage),
  page("Основа", "typography", "Типографика", TypographyPage),
  page("Основа", "shape", "Форма и тени", ShapePage),

  page("Действия", "button", "Button", ButtonPage),
  page("Действия", "button-group", "ButtonGroup", ButtonGroupPage),
  page("Действия", "toggle", "Toggle", TogglePage),

  page("Формы", "forms", "Поля ввода", FormsPage),
  page("Формы", "select", "Выбор из списка", SelectPage),
  page("Формы", "choice", "Флажки и переключатели", ChoicePage),
  page("Формы", "slider", "Slider", SliderPage),
  page("Формы", "input-otp", "InputOTP", InputOTPPage),
  page("Формы", "calendar", "Calendar", CalendarPage),

  page("Оверлеи", "dialog", "Dialog", DialogPage),
  page("Оверлеи", "sheet", "Sheet и Drawer", SheetPage),
  page("Оверлеи", "popover", "Popover и Tooltip", PopoverPage),
  page("Оверлеи", "menu", "Меню", MenuPage),
  page("Оверлеи", "command", "Command", CommandPage),

  page("Навигация", "tabs", "Tabs", TabsPage),
  page(
    "Навигация",
    "breadcrumb",
    "Breadcrumb и Pagination",
    BreadcrumbPaginationPage
  ),
  page("Навигация", "navigation-menu", "NavigationMenu", NavigationMenuPage),
  page("Навигация", "sidebar", "Sidebar", SidebarPage),
  page("Навигация", "accordion", "Accordion", AccordionPage),

  page("Данные", "card", "Card", CardPage),
  page("Данные", "table", "Table", TablePage),
  page("Данные", "badge", "Badge", BadgePage),
  page("Данные", "avatar", "Avatar", AvatarPage),
  page("Данные", "item", "Item", ItemPage),
  page("Данные", "kbd", "Kbd", KbdPage),
  page("Данные", "chart", "Chart", ChartPage),
  page("Данные", "carousel", "Carousel", CarouselPage),

  page("Обратная связь", "alert", "Alert", AlertPage),
  page("Обратная связь", "toast", "Toast", ToastPage),
  page("Обратная связь", "progress", "Загрузка и прогресс", ProgressPage),
  page("Обратная связь", "empty", "Empty", EmptyPage),

  page("Раскладка", "layout", "Separator и панели", LayoutPage),

  page("Чат", "chat", "Message и Bubble", ChatPage),
  page("Чат", "attachment", "Attachment", AttachmentPage),
  page("Чат", "questionnaire", "Questionnaire", QuestionnairePage),

  page("Инструменты", "tweakcn", "tweakcn", TweakcnPage),
]
