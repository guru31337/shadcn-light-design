import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
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

const TICKERS = ["SBER", "GAZP", "LKOH", "YDEX", "TCSG", "ROSN", "NVTK", "MGNT"]

const TICKER_GROUPS = [
  { value: "Акции", items: ["SBER", "GAZP", "LKOH", "YDEX"] },
  { value: "Фонды", items: ["TMOS", "TGLD", "TBRU"] },
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

function WatchlistCombobox() {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple items={TICKERS} defaultValue={["SBER", "YDEX"]}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                id="s-watch"
                placeholder={values.length ? "" : "Добавить тикер"}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Тикер не найден.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function SelectPage() {
  return (
    <Page
      title="Выбор из списка"
      lead="Select — выбор из короткого списка, Combobox — с поиском по длинному, NativeSelect — системный список браузера. Триггер выглядит как поле, список — всплывающий слой с тенью shadow-md."
    >
      <Section
        title="Select"
        description="Base UI: список задаётся пропом items, пустое значение — пункт { value: null }. Пункты всегда внутри SelectGroup."
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
        title="Select с группами"
        description="SelectLabel — подпись группы, SelectSeparator — разделитель между группами."
      >
        <Preview>
          <Field className="max-w-md">
            <FieldLabel>Биржа</FieldLabel>
            <Select
              items={[
                { label: "Мосбиржа · основной режим", value: "moex" },
                { label: "Мосбиржа · вечерняя сессия", value: "moex-evening" },
                { label: "СПБ Биржа", value: "spb" },
              ]}
              defaultValue="moex"
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Мосбиржа</SelectLabel>
                  <SelectItem value="moex">
                    Мосбиржа · основной режим
                  </SelectItem>
                  <SelectItem value="moex-evening">
                    Мосбиржа · вечерняя сессия
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Другие</SelectLabel>
                  <SelectItem value="spb">СПБ Биржа</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </Preview>
      </Section>

      <Section
        title="Combobox"
        description="Поле с поиском по списку. Один выбор — ComboboxInput; несколько — ComboboxChips с ComboboxChip внутри."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="s-ticker">Инструмент</FieldLabel>
              <Combobox items={TICKER_GROUPS}>
                <ComboboxInput id="s-ticker" placeholder="Тикер" showClear />
                <ComboboxContent>
                  <ComboboxEmpty>Тикер не найден.</ComboboxEmpty>
                  <ComboboxList>
                    {(group: (typeof TICKER_GROUPS)[number]) => (
                      <ComboboxGroup key={group.value} items={group.items}>
                        <ComboboxLabel>{group.value}</ComboboxLabel>
                        <ComboboxCollection>
                          {(item: string) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <Field>
              <FieldLabel htmlFor="s-watch">Список наблюдения</FieldLabel>
              <WatchlistCombobox />
              <FieldDescription>
                До 20 инструментов; порядок — как добавлены.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>

      <Section
        title="NativeSelect"
        description="Системный список: на телефоне открывается нативным колесом. Проп size: sm или default."
      >
        <Preview>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="s-tz">Часовой пояс</FieldLabel>
              <NativeSelect id="s-tz" defaultValue="msk">
                <NativeSelectOptGroup label="Россия">
                  <NativeSelectOption value="kld">
                    Калининград, UTC+2
                  </NativeSelectOption>
                  <NativeSelectOption value="msk">
                    Москва, UTC+3
                  </NativeSelectOption>
                  <NativeSelectOption value="ekb">
                    Екатеринбург, UTC+5
                  </NativeSelectOption>
                </NativeSelectOptGroup>
              </NativeSelect>
            </Field>
            <Field data-disabled>
              <FieldLabel htmlFor="s-tz-off">Недоступный · sm</FieldLabel>
              <NativeSelect id="s-tz-off" size="sm" disabled>
                <NativeSelectOption>Москва, UTC+3</NativeSelectOption>
              </NativeSelect>
            </Field>
          </FieldGroup>
        </Preview>
      </Section>
    </Page>
  )
}
