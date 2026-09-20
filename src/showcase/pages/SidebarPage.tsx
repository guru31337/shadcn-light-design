import {
  Bell,
  Bot,
  ChartCandlestick,
  KeyRound,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Page, Section } from "../kit"

const MAIN = [
  { title: "Обзор", icon: LayoutDashboard, active: true },
  { title: "Портфель", icon: Wallet },
  { title: "Рынок", icon: ChartCandlestick },
  { title: "Уведомления", icon: Bell, badge: "4" },
]

const BOTS = ["Пробой уровня", "Возврат к средней", "Парный арбитраж"]

export function SidebarPage() {
  return (
    <Page
      title="Sidebar"
      lead="Боковая навигация приложения. Фон sidebar = card, активный пункт — sidebar-accent, подпись группы — sidebar-foreground/70. Здесь — collapsible=none внутри рамки; в приложении панель фиксирована у края и сворачивается."
    >
      <Section
        title="Состав"
        description="SidebarHeader, SidebarContent с группами (SidebarGroupLabel, SidebarMenu), SidebarFooter. Счётчик — SidebarMenuBadge, вложенный уровень — SidebarMenuSub."
      >
        <div className="overflow-hidden rounded-xl border border-border">
          <SidebarProvider className="min-h-0">
            <Sidebar
              collapsible="none"
              className="h-[36rem] border-r border-sidebar-border"
            >
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <ChartCandlestick />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-medium">Терминал</span>
                        <span className="text-xs text-muted-foreground">
                          счёт 2000123456
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <SidebarGroup className="py-0">
                  <SidebarGroupContent className="relative">
                    <Label htmlFor="sb-search" className="sr-only">
                      Поиск
                    </Label>
                    <SidebarInput
                      id="sb-search"
                      placeholder="Поиск"
                      className="pl-8"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Торговля</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {MAIN.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton isActive={item.active}>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {item.badge && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                  <SidebarGroupLabel>Роботы</SidebarGroupLabel>
                  <SidebarGroupAction aria-label="Новый робот">
                    <Plus />
                  </SidebarGroupAction>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Bot />
                          <span>Стратегии</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          {BOTS.map((b, i) => (
                            <SidebarMenuSubItem key={b}>
                              <SidebarMenuSubButton isActive={i === 1}>
                                <span>{b}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <KeyRound />
                      <span>Токены</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings />
                      <span>Настройки</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            {/* В приложении здесь SidebarInset — это <main>; в витрине он был бы вторым <main> на странице */}
            <div className="flex flex-1 flex-col gap-4 bg-background p-6">
              <div className="flex items-center gap-2">
                <h2 className="type-h3">Обзор</h2>
                <Badge variant="warning">SANDBOX</Badge>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Содержимое страницы — SidebarInset: фон background, как у
                страницы; сама панель — на фоне card.
              </p>
            </div>
          </SidebarProvider>
        </div>
      </Section>
    </Page>
  )
}
