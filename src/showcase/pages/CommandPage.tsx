import { useEffect, useState } from "react"
import {
  ChartCandlestick,
  FileText,
  KeyRound,
  Search,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Page, Preview, Section } from "../kit"

function Palette() {
  return (
    <Command>
      <CommandInput placeholder="Команда или тикер…" />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        <CommandGroup heading="Инструменты">
          <CommandItem>
            <ChartCandlestick />
            SBER · Сбербанк
          </CommandItem>
          <CommandItem>
            <ChartCandlestick />
            GAZP · Газпром
          </CommandItem>
          <CommandItem disabled>
            <ChartCandlestick />
            TCSG · торги приостановлены
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Действия">
          <CommandItem>
            <FileText />
            Отчёт за месяц
            <CommandShortcut>Ctrl R</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <KeyRound />
            Выпустить токен
          </CommandItem>
          <CommandItem>
            <Settings />
            Настройки
            <CommandShortcut>Ctrl ,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function PaletteDialog() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Search data-icon="inline-start" />
        Поиск
        <KbdGroup className="ml-2">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Командная строка"
        description="Найдите инструмент или команду"
      >
        <Palette />
      </CommandDialog>
    </>
  )
}

export function CommandPage() {
  return (
    <Page
      title="Command"
      lead="Командная строка: поиск по командам и объектам с клавиатуры. Встраивается в страницу или открывается в диалоге по Ctrl K. Выбранный пункт — заливка accent, как в меню (у shadcn — muted; правило по data-slot в index.css)."
    >
      <Section
        title="Встроенный"
        description="Command в Card: CommandInput, CommandList, группы с заголовком, CommandShortcut справа. Стрелки меняют выбранный пункт."
      >
        <Preview>
          <Card className="max-w-md p-0">
            <CardContent className="p-0">
              <Palette />
            </CardContent>
          </Card>
        </Preview>
      </Section>

      <Section
        title="В диалоге"
        description="CommandDialog — Dialog с Command внутри; заголовок для чтения с экрана передаётся пропом title."
      >
        <Preview>
          <PaletteDialog />
        </Preview>
      </Section>
    </Page>
  )
}
