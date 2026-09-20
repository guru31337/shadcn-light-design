import { Fragment } from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Page, Preview, Section } from "../kit"

const TRADES = Array.from({ length: 24 }, (_, i) => ({
  time: `18:${String(40 - i).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  price: (284.15 + Math.sin(i) * 0.4).toFixed(2),
  lots: ((i * 37) % 90) + 1,
  buy: i % 3 !== 0,
}))

const TICKERS = [
  "SBER",
  "GAZP",
  "LKOH",
  "YDEX",
  "ROSN",
  "NVTK",
  "MGNT",
  "TCSG",
  "PLZL",
  "GMKN",
  "MTSS",
  "ALRS",
]

function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
      {label}
    </div>
  )
}

export function LayoutPage() {
  return (
    <Page
      title="Раскладка"
      lead="Separator, ScrollArea, Resizable и AspectRatio — служебные компоненты без собственного фона. Линии и полосы прокрутки — роль border."
    >
      <Section
        title="Separator"
        description="Горизонтальный или вертикальный (orientation). Вместо <hr> и div с border-t."
      >
        <Preview>
          <div className="flex max-w-md flex-col gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Счёт 2000123456</span>
              <span className="text-muted-foreground">
                Брокерский · открыт 12.03.2024
              </span>
            </div>
            <Separator />
            <div className="flex h-5 items-center gap-4">
              <span>Портфель</span>
              <Separator orientation="vertical" />
              <span>Операции</span>
              <Separator orientation="vertical" />
              <span>Налоги</span>
            </div>
          </div>
        </Preview>
      </Section>

      <Section
        title="ScrollArea"
        description="Своя полоса прокрутки вместо системной: одинаковая во всех браузерах. Горизонтальная — ScrollBar orientation=horizontal."
      >
        <Preview>
          <div className="flex flex-wrap gap-6">
            <ScrollArea className="h-56 w-64 rounded-lg border border-border">
              <div className="grid grid-cols-[1fr_auto_2.5rem] gap-x-4 gap-y-2 p-3 text-sm tabular-nums">
                {TRADES.map((t) => (
                  <Fragment key={t.time}>
                    <span className="text-muted-foreground">{t.time}</span>
                    <span
                      className={t.buy ? "text-success" : "text-destructive"}
                    >
                      {t.price}
                    </span>
                    <span className="text-right">{t.lots}</span>
                  </Fragment>
                ))}
              </div>
            </ScrollArea>
            <ScrollArea className="w-72 self-start rounded-lg border border-border whitespace-nowrap">
              <div className="flex gap-2 p-3">
                {TICKERS.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border px-2 py-1 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </Preview>
      </Section>

      <Section
        title="Resizable"
        description="Панели, размер которых меняется перетаскиванием разделителя. withHandle — видимая ручка."
      >
        <Preview>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-56 rounded-lg border border-border"
          >
            <ResizablePanel defaultSize="30%">
              <Pane label="Стакан" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="70%">
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize="65%">
                  <Pane label="График" />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="35%">
                  <Pane label="Лента сделок" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Preview>
      </Section>

      <Section
        title="AspectRatio"
        description="Держит пропорции содержимого при любой ширине — для превью графиков и картинок."
      >
        <Preview>
          <div className="w-80">
            <AspectRatio
              ratio={16 / 9}
              className="flex items-center justify-center rounded-lg border border-dashed border-input text-sm text-muted-foreground"
            >
              16 : 9
            </AspectRatio>
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
