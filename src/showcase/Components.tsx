import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Info,
  Plus,
  RefreshCw,
  TriangleAlert,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Block, OnSurfaces, Section } from "./layout"

function Buttons() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button>Сохранить</Button>
        <Button variant="secondary">Проверить</Button>
        <Button variant="outline">Отмена</Button>
        <Button variant="ghost">Сбросить</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="destructive">Пересоздать счёт</Button>
        <Button variant="success">Купить</Button>
        <Button variant="link">
          Подробнее <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs" variant="outline">
          xs
        </Button>
        <Button size="sm" variant="outline">
          sm
        </Button>
        <Button variant="outline">
          <Plus data-icon="inline-start" />
          default
        </Button>
        <Button size="lg" variant="outline">
          lg
        </Button>
        <Button size="icon" variant="outline" aria-label="Обновить">
          <RefreshCw />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button disabled>Недоступно</Button>
        <Button variant="secondary" disabled>
          <Spinner data-icon="inline-start" />
          Проверка…
        </Button>
      </div>
    </>
  )
}

function Badges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>LIVE</Badge>
      <Badge variant="secondary">Акция</Badge>
      <Badge variant="outline">SBER</Badge>
      <Badge variant="success">
        <CircleCheck data-icon="inline-start" />
        Подключён
      </Badge>
      <Badge variant="warning">SANDBOX</Badge>
      <Badge variant="destructive">Разрыв связи</Badge>
      <Badge variant="info">Новое</Badge>
    </div>
  )
}

const TYPES = [
  { label: "Все типы", value: null },
  { label: "Акции", value: "share" },
  { label: "Облигации", value: "bond" },
  { label: "Фьючерсы", value: "futures" },
]

function Fields() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="token">Токен песочницы</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="token"
            type="password"
            defaultValue="t.sandbox-token-value"
          />
          <Button variant="secondary">Проверить</Button>
        </div>
        <FieldDescription>
          Хранится на сервере в зашифрованном виде.
        </FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="bot">Токен бота</FieldLabel>
        <Input id="bot" aria-invalid defaultValue="12345:abc" />
        <FieldError>
          Telegram не принял токен — проверьте, что он скопирован целиком.
        </FieldError>
      </Field>
      <Field>
        <FieldLabel>Тип инструмента</FieldLabel>
        <Select items={TYPES} defaultValue="share">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="off">Недоступное поле</FieldLabel>
        <Input id="off" disabled placeholder="Только для LIVE" />
      </Field>
    </FieldGroup>
  )
}

function SampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Счёт песочницы</CardTitle>
        <CardDescription>
          Виртуальный счёт для проверки стратегий без реальных денег.
        </CardDescription>
        <CardAction>
          <Badge variant="warning">SANDBOX</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Счёт</span>
          <span>7d1c…a90e</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Баланс</span>
          <span>1 000 000.00 RUB</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="destructive">Пересоздать счёт</Button>
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  )
}

function Alerts() {
  return (
    <>
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
      </Alert>
    </>
  )
}

export function Components() {
  return (
    <Section
      id="components"
      title="Компоненты"
      lead="Каждый компонент — на трёх поверхностях. Ни один элемент не должен сливаться с фоном: у сплошных — заливка, у остальных — рамка."
    >
      <Block title="Button">
        <OnSurfaces>
          <Buttons />
        </OnSurfaces>
      </Block>
      <Block title="Badge">
        <OnSurfaces>
          <Badges />
        </OnSurfaces>
      </Block>
      <Block title="Field · Input · Select">
        <OnSurfaces>
          <Fields />
        </OnSurfaces>
      </Block>
      <Block title="Card">
        <OnSurfaces>
          <SampleCard />
        </OnSurfaces>
      </Block>
      <Block title="Alert">
        <OnSurfaces>
          <Alerts />
        </OnSurfaces>
      </Block>
    </Section>
  )
}
