import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Page, Preview, Section } from "../kit"

const IDEAS = [
  ["SBER", "Дивиденды", "Отсечка 18 июля, доходность около 11%.", "success"],
  ["GAZP", "Налог", "Повышенный НДПИ давит на прибыль.", "destructive"],
  ["YDEX", "Отчёт", "Квартальный отчёт выходит 24 октября.", "info"],
  ["LKOH", "Байбэк", "Выкуп акций у нерезидентов одобрен.", "success"],
  ["TCSG", "Приостановка", "Торги остановлены до 1 октября.", "warning"],
] as const

export function CarouselPage() {
  return (
    <Page
      title="Carousel"
      lead="Лента карточек, которая листается кнопками, свайпом и стрелками клавиатуры. Кнопки — Button outline, у краёв ленты."
    >
      <Section
        title="Несколько карточек в ряд"
        description='CarouselItem с basis-1/3 — три карточки в ряд; opts={{ align: "start" }} — выравнивание по началу.'
      >
        <Preview className="px-16">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {IDEAS.map(([ticker, tag, text, tone]) => (
                <CarouselItem
                  key={ticker}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{ticker}</CardTitle>
                      <CardDescription>{text}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={tone}>{tag}</Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Preview>
      </Section>
    </Page>
  )
}
