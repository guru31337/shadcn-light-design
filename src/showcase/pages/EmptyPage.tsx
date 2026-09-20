import { Bot, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Page, Preview, Section } from "../kit"

export function EmptyPage() {
  return (
    <Page
      title="Empty"
      lead="Пустое состояние: что здесь будет и как это получить. Вместо пустой таблицы или белого экрана."
    >
      <Section
        title="Первый запуск"
        description='EmptyMedia variant="icon" — иконка на подложке muted; EmptyContent — действия. Рамка — className="border", пунктир уже задан в компоненте.'
      >
        <Preview>
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bot />
              </EmptyMedia>
              <EmptyTitle>Роботов пока нет</EmptyTitle>
              <EmptyDescription>
                Робот торгует по стратегии через API. Начните с шаблона или
                загрузите свою стратегию.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button>Создать робота</Button>
                <Button variant="outline">Загрузить</Button>
              </div>
            </EmptyContent>
          </Empty>
        </Preview>
      </Section>

      <Section
        title="Ничего не найдено"
        description="Без рамки — внутри карточки или таблицы, где край уже есть."
      >
        <Preview>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyTitle>Инструмент не найден</EmptyTitle>
              <EmptyDescription>
                По запросу «SBERP2» ничего нет. Проверьте тикер или сбросьте
                фильтры.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">Сбросить фильтры</Button>
            </EmptyContent>
          </Empty>
        </Preview>
      </Section>
    </Page>
  )
}
