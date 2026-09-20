import { ChartLine, List, Wallet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const PERIODS = ["День", "Неделя", "Месяц", "Год"]

export function TabsPage() {
  return (
    <Page
      title="Tabs"
      lead="Переключение между разделами одного экрана. Неактивная вкладка — текст foreground/60 из классов shadcn; чтобы он держал 4.5:1, роль foreground стоит на ступени neutral-950."
    >
      <Section
        title="Варианты"
        description="Проп variant у TabsList: default — активная вкладка на подложке muted, line — подчёркивание без подложки."
      >
        <Preview>
          <Specimens>
            <Specimen label="default">
              <Tabs defaultValue="Неделя">
                <TabsList>
                  {PERIODS.map((p) => (
                    <TabsTrigger key={p} value={p}>
                      {p}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </Specimen>
            <Specimen label='variant="line"'>
              <Tabs defaultValue="Неделя">
                <TabsList variant="line">
                  {PERIODS.map((p) => (
                    <TabsTrigger key={p} value={p}>
                      {p}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Иконки и состояния"
        description='Иконка с data-icon="inline-start". Недоступная вкладка — disabled.'
      >
        <Preview>
          <Specimens>
            <Specimen label="с иконкой">
              <Tabs defaultValue="chart">
                <TabsList>
                  <TabsTrigger value="chart">
                    <ChartLine data-icon="inline-start" />
                    График
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <List data-icon="inline-start" />
                    Заявки
                  </TabsTrigger>
                  <TabsTrigger value="portfolio">
                    <Wallet data-icon="inline-start" />
                    Портфель
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Specimen>
            <Specimen label="disabled">
              <Tabs defaultValue="sandbox">
                <TabsList>
                  <TabsTrigger value="sandbox">Песочница</TabsTrigger>
                  <TabsTrigger value="live" disabled>
                    Боевой
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Specimen>
            <Specimen label='line · orientation="vertical"'>
              <Tabs defaultValue="account" orientation="vertical">
                <TabsList variant="line">
                  <TabsTrigger value="account">Счёт</TabsTrigger>
                  <TabsTrigger value="tokens">Токены</TabsTrigger>
                  <TabsTrigger value="alerts">Уведомления</TabsTrigger>
                </TabsList>
              </Tabs>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Вкладки над содержимым: TabsContent для каждой вкладки."
      >
        <Preview>
          <Tabs defaultValue="orders" className="max-w-lg">
            <TabsList>
              <TabsTrigger value="orders">Активные заявки · 3</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>
            <TabsContent
              value="orders"
              className="rounded-xl border border-border p-4"
            >
              <p className="text-muted-foreground">
                SBER · покупка 10 лотов по 284.15 · ждёт исполнения.
              </p>
            </TabsContent>
            <TabsContent
              value="history"
              className="rounded-xl border border-border p-4"
            >
              <p className="text-muted-foreground">
                За последние 30 дней — 42 сделки.
              </p>
            </TabsContent>
          </Tabs>
        </Preview>
      </Section>
    </Page>
  )
}
