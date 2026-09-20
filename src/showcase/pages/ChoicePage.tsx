import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const PLANS = [
  ["sandbox", "Песочница", "Виртуальный счёт, заявки не уходят на биржу."],
  ["live", "Боевой счёт", "Реальные заявки по токену с правами на торговлю."],
] as const

const NOTIFICATIONS = [
  {
    id: "n-fill",
    title: "Исполнение заявки",
    text: "Сразу после сделки.",
    on: true,
  },
  {
    id: "n-margin",
    title: "Маржин-колл",
    text: "Когда обеспечение ниже начальной маржи.",
    on: true,
  },
  { id: "n-daily", title: "Итоги дня", text: "В 19:00 по Москве.", on: false },
]

export function ChoicePage() {
  return (
    <Page
      title="Флажки и переключатели"
      lead="Checkbox — независимый выбор, RadioGroup — один вариант из нескольких, Switch — включить или выключить сразу, без кнопки «Сохранить». Рамка — роль input, отмеченное — заливка primary."
    >
      <Section
        title="Состояния"
        description="Рядом с контролом — FieldLabel в Field orientation=horizontal. Ошибка — data-invalid на Field и aria-invalid на контроле."
      >
        <Preview>
          <Specimens>
            <Specimen label="Checkbox">
              <Checkbox aria-label="Не отмечен" />
            </Specimen>
            <Specimen label="Checkbox · checked">
              <Checkbox aria-label="Отмечен" defaultChecked />
            </Specimen>
            <Specimen label="Checkbox · aria-invalid">
              <Checkbox aria-label="С ошибкой" aria-invalid />
            </Specimen>
            <Specimen label="Checkbox · disabled">
              <Checkbox aria-label="Недоступен" disabled defaultChecked />
            </Specimen>
            <Specimen label="RadioGroupItem">
              <RadioGroup defaultValue="b" aria-label="Пример">
                <RadioGroupItem value="a" aria-label="Не выбран" />
              </RadioGroup>
            </Specimen>
            <Specimen label="RadioGroupItem · checked">
              <RadioGroup defaultValue="a" aria-label="Пример">
                <RadioGroupItem value="a" aria-label="Выбран" />
              </RadioGroup>
            </Specimen>
            <Specimen label="Switch">
              <Switch aria-label="Выключен" />
            </Specimen>
            <Specimen label="Switch · checked">
              <Switch aria-label="Включён" defaultChecked />
            </Specimen>
            <Specimen label='Switch · size="sm"'>
              <Switch aria-label="Маленький" size="sm" defaultChecked />
            </Specimen>
            <Specimen label="Switch · disabled">
              <Switch aria-label="Недоступен" disabled />
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="С подписью и описанием"
        description="FieldContent объединяет подпись и описание; описание набирается Inter."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field orientation="horizontal">
              <Checkbox id="c-confirm" defaultChecked />
              <FieldContent>
                <FieldLabel htmlFor="c-confirm">
                  Подтверждать крупные заявки
                </FieldLabel>
                <FieldDescription>
                  Спрашивать перед отправкой заявки дороже 100 000 ₽.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-invalid>
              <Checkbox id="c-risk" aria-invalid />
              <FieldLabel htmlFor="c-risk">
                Я понимаю риски маржинальной торговли
              </FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="c-off" disabled />
              <FieldLabel htmlFor="c-off">Доступно после проверки</FieldLabel>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="RadioGroup в FieldSet"
        description="Группа связанных вариантов — FieldSet с FieldLegend, а не div с заголовком."
      >
        <Preview>
          <FieldSet className="max-w-md">
            <FieldLegend>Тип заявки по умолчанию</FieldLegend>
            <FieldDescription>
              Можно поменять в окне заявки перед отправкой.
            </FieldDescription>
            <RadioGroup defaultValue="limit">
              {[
                ["market", "Рыночная"],
                ["limit", "Лимитная"],
                ["stop", "Стоп-заявка"],
              ].map(([value, label]) => (
                <Field key={value} orientation="horizontal">
                  <RadioGroupItem value={value} id={`r-${value}`} />
                  <FieldLabel htmlFor={`r-${value}`} className="font-normal">
                    {label}
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>
          </FieldSet>
        </Preview>
      </Section>

      <Section
        title="Карточки выбора"
        description="FieldLabel вокруг Field превращается в карточку с рамкой; выбранная — рамка primary/30 и подложка primary/5."
      >
        <Preview>
          <RadioGroup defaultValue="sandbox" className="max-w-md">
            {PLANS.map(([value, title, text]) => (
              <FieldLabel key={value} htmlFor={`p-${value}`}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{title}</FieldTitle>
                    <FieldDescription>{text}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={value} id={`p-${value}`} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Уведомления: переключатели применяются сразу, поэтому у формы нет кнопки «Сохранить»."
      >
        <Preview>
          <FieldSet className="max-w-md">
            <FieldLegend>Уведомления в Telegram</FieldLegend>
            <FieldGroup>
              {NOTIFICATIONS.map((n) => (
                <Field key={n.id} orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor={n.id}>{n.title}</FieldLabel>
                    <FieldDescription>{n.text}</FieldDescription>
                  </FieldContent>
                  <Switch id={n.id} defaultChecked={n.on} />
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </Preview>
      </Section>
    </Page>
  )
}
