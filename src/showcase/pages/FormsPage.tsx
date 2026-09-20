import { Copy, Search } from "lucide-react"
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
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Page, Preview, Section } from "../kit"

export function FormsPage() {
  return (
    <Page
      title="Поля ввода"
      lead="Field, Label, Input, Textarea, InputGroup — штатные компоненты shadcn без правок. Подпись над полем, подсказка и ошибка под ним; подсказка и ошибка набираются Inter."
    >
      <Section
        title="Состояния"
        description="Field + FieldLabel + Input + FieldDescription. Рамка поля — роль input, ≥3:1 к любой поверхности. Ошибка — data-invalid на Field и aria-invalid на поле; недоступное — data-disabled и disabled."
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
              <Input id="f-off" disabled defaultValue="Только для LIVE" />
              <FieldDescription>
                Серая заливка — это bg-input/50 из shadcn: так недоступное поле
                отличается от пустого.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="Textarea"
        description="Многострочное поле растёт по содержимому (field-sizing-content). Те же состояния, что у Input."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="f-note">Заметка к стратегии</FieldLabel>
              <Textarea id="f-note" placeholder="Условия входа, стоп, тейк…" />
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="f-json">Параметры (JSON)</FieldLabel>
              <Textarea id="f-json" aria-invalid defaultValue='{ "lots": 1,' />
              <FieldError>Ожидалась закрывающая скобка в строке 1.</FieldError>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="InputGroup"
        description="Иконка, текст или кнопка внутри поля — InputGroupAddon слева или справа (align), а не абсолютное позиционирование. Внутри группы — InputGroupInput и InputGroupTextarea."
      >
        <Preview>
          <FieldGroup className="max-w-md">
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
            <Field>
              <FieldLabel htmlFor="f-price">Цена</FieldLabel>
              <InputGroup>
                <InputGroupInput id="f-price" defaultValue="284.15" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>RUB</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-account">ID счёта</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="f-account"
                  readOnly
                  defaultValue="2000123456"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" aria-label="Скопировать">
                    <Copy />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-msg">Сообщение в поддержку</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="f-msg"
                  placeholder="Опишите, что произошло"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>0 / 500</InputGroupText>
                  <InputGroupButton variant="default" className="ml-auto">
                    Отправить
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Форма настроек целиком: группы полей, кнопка рядом с полем той же высоты 32px, действия внизу."
      >
        <Preview>
          <form
            className="flex max-w-md flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="c-token">Токен (Read/Write)</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="c-token"
                    type="password"
                    defaultValue="t.live-token-value"
                  />
                  <Button variant="secondary" type="button">
                    Проверить
                  </Button>
                </div>
                <FieldDescription>
                  Нужны права на торговлю и чтение портфеля.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="c-name">Название счёта</FieldLabel>
                <Input id="c-name" defaultValue="Основной" />
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
