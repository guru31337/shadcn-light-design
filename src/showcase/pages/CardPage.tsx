import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Page, Preview, Section } from "../kit"

const STATS = [
  ["Пинг", "42 мс", "среднее за 5 минут"],
  ["Задержка маркет-данных", "118 мс", "выше нормы"],
  ["Активные подписки", "12", "3 стрима"],
] as const

export function CardPage() {
  return (
    <Page
      title="Card"
      lead="Контейнер секции: заголовок, описание, содержимое и подвал с действиями. Край — тонкая рамка, без тени."
    >
      <Section
        title="Полная композиция"
        description="CardHeader (CardTitle, CardDescription, CardAction), CardContent, CardFooter."
      >
        <Preview>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Счёт песочницы</CardTitle>
              <CardDescription>
                Виртуальный счёт для проверки стратегий без реальных денег.
              </CardDescription>
              <CardAction>
                <Badge variant="warning">SANDBOX</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex justify-between gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Счёт</span>
                7d1c…a90e
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">Баланс</span>1
                000 000.00 RUB
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="destructive">Пересоздать счёт</Button>
              <Button>Сохранить</Button>
            </CardFooter>
          </Card>
        </Preview>
      </Section>

      <Section
        title="Размер sm"
        description='size="sm" — плотнее отступы, для плиток и виджетов.'
      >
        <Preview>
          <div className="grid gap-4 sm:grid-cols-3">
            {STATS.map(([label, value, hint]) => (
              <Card key={label} size="sm">
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-2xl font-medium">{value}</span>
                  <span className="text-xs text-muted-foreground">{hint}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
