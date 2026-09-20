import { useState } from "react"
import {
  Copy,
  EllipsisVertical,
  ExternalLink,
  Pencil,
  Star,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

function ActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="Действия" />}
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Стратегия «Пробой»</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil />
            Изменить
            <DropdownMenuShortcut>E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Дублировать
            <DropdownMenuShortcut>Ctrl D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ExternalLink />
              Экспорт
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                  <DropdownMenuItem>JSON</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem disabled>
            <Star />В избранное
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ViewMenu() {
  const [columns, setColumns] = useState({
    volume: true,
    change: true,
    lot: false,
  })
  const [sort, setSort] = useState("change")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Вид таблицы
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Колонки</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={columns.volume}
            onCheckedChange={(v) => setColumns({ ...columns, volume: v })}
          >
            Объём
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={columns.change}
            onCheckedChange={(v) => setColumns({ ...columns, change: v })}
          >
            Изменение за день
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={columns.lot}
            onCheckedChange={(v) => setColumns({ ...columns, lot: v })}
          >
            Размер лота
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="ticker">
              По тикеру
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="change">
              По изменению
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MenuPage() {
  return (
    <Page
      title="Меню"
      lead="DropdownMenu — по кнопке, ContextMenu — по правому клику, Menubar — строка меню приложения. Пункт в фокусе — заливка accent, опасный пункт — destructive. Пункты всегда внутри группы."
    >
      <Section
        title="DropdownMenu"
        description="Пункты с иконкой и сочетанием клавиш, подменю, недоступный и опасный пункт. Флажки и радио — DropdownMenuCheckboxItem и DropdownMenuRadioItem."
      >
        <Preview>
          <Specimens>
            <Specimen label="действия · destructive">
              <ActionsMenu />
            </Specimen>
            <Specimen label="checkbox · radio">
              <ViewMenu />
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="ContextMenu"
        description="Область-триггер — любой элемент. Содержимое меню то же, что у DropdownMenu."
      >
        <Preview>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-28 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-input text-sm text-muted-foreground">
              Правый клик по строке сделки
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-48">
              <ContextMenuGroup>
                <ContextMenuItem>
                  Открыть заявку
                  <ContextMenuShortcut>Enter</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  Скопировать ID
                  <ContextMenuShortcut>Ctrl C</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  Отменить заявку
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        </Preview>
      </Section>

      <Section
        title="Menubar"
        description="Строка меню: MenubarMenu с MenubarTrigger и MenubarContent. Открытый пункт строки подсвечен muted."
      >
        <Preview>
          <Menubar className="w-fit">
            <MenubarMenu>
              <MenubarTrigger>Файл</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    Новая стратегия <MenubarShortcut>Ctrl N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Импорт… <MenubarShortcut>Ctrl O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled>Экспорт отчёта</MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Вид</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarCheckboxItem defaultChecked>
                    Стакан
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem>Лента сделок</MenubarCheckboxItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem>
                    Во весь экран <MenubarShortcut>F11</MenubarShortcut>
                  </MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Справка</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>Документация API</MenubarItem>
                  <MenubarItem>Сочетания клавиш</MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Preview>
      </Section>
    </Page>
  )
}
