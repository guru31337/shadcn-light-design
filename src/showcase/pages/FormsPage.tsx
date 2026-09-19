import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Page, Preview, Section } from "../kit"

const TYPES = [
  { label: "Все типы", value: null },
  { label: "Акции", value: "share" },
  { label: "Облигации", value: "bond" },
  { label: "Фьючерсы", value: "futures" },
]

function TypeSelect({
  invalid,
  disabled,
}: {
  invalid?: boolean
  disabled?: boolean
}) {
  return (
    <Select items={TYPES} defaultValue="share" disabled={disabled}>
      <SelectTrigger className="w-full" aria-invalid={invalid || undefined}>
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
  )
}

export function FormsPage() {
  return (
    <Page
      title="Поля формы"
      lead="Field, Label, Input, InputGroup, Select — штатные компоненты shadcn без правок. Подпись над полем, подсказка и ошибка под ним набираются Inter."
    >
      <Section
        title="Поле ввода"
        description="Field + FieldLabel + Input + FieldDescription. Рамка поля — роль input, ≥3:1 к любой поверхности."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="f-token">Токен песочницы</FieldLabel>
              <Input id="f-token" placeholder="t.xxxxxxxx" />
              <FieldDescription>
                Хранится на сервере в зашифрованном виде.
              </FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="f-bot">Токен бота</FieldLabel>
              <Input id="f-bot" aria-invalid defaultValue="12345:abc" />
              <FieldError>
                Telegram не принял токен — проверьте, что он скопирован целиком.
              </FieldError>
            </Field>
            <Field data-disabled>
              <FieldLabel htmlFor="f-off">Недоступное поле</FieldLabel>
              <Input id="f-off" disabled placeholder="Только для LIVE" />
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="С кнопкой и иконкой"
        description="Кнопка рядом с полем — той же высоты 32px. Иконка внутри поля — через InputGroup, а не абсолютным позиционированием."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="f-check">Боевой токен</FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="f-check"
                  type="password"
                  defaultValue="t.live-token-value"
                />
                <Button variant="secondary">Проверить</Button>
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-search">Поиск инструмента</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="f-search"
                  placeholder="Тикер или название"
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="Select"
        description="Триггер выглядит как поле. Список открывается во всплывающем слое с тенью shadow-md."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel>Тип инструмента</FieldLabel>
              <TypeSelect />
            </Field>
            <Field data-invalid>
              <FieldLabel>С ошибкой</FieldLabel>
              <TypeSelect invalid />
              <FieldError>Выберите тип.</FieldError>
            </Field>
            <Field data-disabled>
              <FieldLabel>Недоступный</FieldLabel>
              <TypeSelect disabled />
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Форма настроек целиком: группы полей и действия внизу."
      >
        <Preview>
          <form
            className="flex max-w-md flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="c-token">Токен (Read/Write)</FieldLabel>
                <Input
                  id="c-token"
                  type="password"
                  defaultValue="t.live-token-value"
                />
              </Field>
              <Field>
                <FieldLabel>Окружение по умолчанию</FieldLabel>
                <TypeSelect />
                <FieldDescription>
                  Можно переключить в любой момент на странице настроек.
                </FieldDescription>
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button">
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </div>
          </form>
        </Preview>
      </Section>
    </Page>
  )
}
