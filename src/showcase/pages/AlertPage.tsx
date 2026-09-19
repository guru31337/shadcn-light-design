import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Page, Preview, Section } from "../kit"

export function AlertPage() {
  return (
    <Page
      title="Alert"
      lead="Сообщение внутри страницы: что случилось и что делать. success, warning и info — варианты системы, повторяют штатный destructive."
    >
      <Section
        title="Варианты"
        description="Проп variant. Фон — карточка, цвет несёт заголовок, иконка и описание."
      >
        <Preview className="flex flex-col gap-3">
          <Alert>
            <Info />
            <AlertTitle>Рынок закрыт</AlertTitle>
            <AlertDescription>
              Котировки обновятся в 10:00 по Москве.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Настройки сохранены</AlertTitle>
            <AlertDescription>
              Изменения применятся при следующем подключении.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Переподключение к стриму</AlertTitle>
            <AlertDescription>
              Котировки могут отставать до восстановления связи.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Соединение не установлено</AlertTitle>
            <AlertDescription>
              Токен отклонён — проверьте права Read/Write.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertTitle>Доступна новая версия API</AlertTitle>
            <AlertDescription>
              Обновите SDK до следующей версии.
            </AlertDescription>
          </Alert>
        </Preview>
      </Section>
      <Section
        title="Только заголовок и с действием"
        description="Короткое сообщение без описания; действие — AlertAction справа."
      >
        <Preview className="flex flex-col gap-3">
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Счёт песочницы создан</AlertTitle>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Токен истекает через 3 дня</AlertTitle>
            <AlertDescription>
              Выпустите новый в личном кабинете Т-Банка.
            </AlertDescription>
            <AlertAction>
              <Button size="sm" variant="outline">
                Обновить
              </Button>
            </AlertAction>
          </Alert>
        </Preview>
      </Section>
    </Page>
  )
}
