import { Page, Section } from "../kit"

const HEADINGS = [
  [
    "type-display",
    "Tektur · 36/40 · 500",
    "Один на экран, крупный вход в раздел",
    "Поиск инструмента",
  ],
  [
    "type-h1",
    "Tektur · 30/36 · 500",
    "Заголовок страницы",
    "Настройки терминала",
  ],
  ["type-h2", "Tektur · 24/32 · 500", "Раздел страницы", "API Т-Банка"],
  [
    "type-h3",
    "Tektur · 20/28 · 500",
    "Подраздел, заголовок панели",
    "Стабильность соединения",
  ],
  [
    "type-h4",
    "Tektur · 16/24 · 500",
    "Заголовок карточки и виджета",
    "Стакан заявок",
  ],
] as const

const INTERFACE = [
  [
    "text-base",
    "JetBrains Mono · 16/24",
    "Крупные значения, поле поиска",
    "SBER  312.45  ▲ 1 850",
  ],
  [
    "text-sm",
    "JetBrains Mono · 14/20",
    "Кнопки, поля, пункты меню, таблицы",
    "Сохранить · FIGI BBG004730N88 · 14:32:07",
  ],
  [
    "text-xs",
    "JetBrains Mono · 12/16",
    "Бейджи, подписи, шапки колонок",
    "Покупка 58% · Продажа 42%",
  ],
] as const

const PROSE = [
  [
    "type-body · p",
    "Inter · 14/22",
    "Описания, сообщения, абзацы",
    "Песочница использует отдельный токен и виртуальный счёт — реальные деньги не затрагиваются.",
  ],
  [
    "type-caption",
    "Inter · 12/16",
    "Подсказки под полями, примечания",
    "Токен хранится на сервере в зашифрованном виде.",
  ],
] as const

function Scale({
  rows,
  sampleClass,
}: {
  rows: readonly (readonly [string, string, string, string])[]
  sampleClass?: (token: string) => string
}) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {rows.map(([token, meta, use, sample]) => (
        <div
          key={token}
          className="grid gap-4 p-5 md:grid-cols-[14rem_1fr] md:items-baseline"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{token}</span>
            <span className="text-xs text-muted-foreground">{meta}</span>
            <span className="type-caption text-muted-foreground">{use}</span>
          </div>
          <span
            className={sampleClass ? sampleClass(token) : token.split(" ")[0]}
          >
            {sample}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TypographyPage() {
  return (
    <Page
      title="Типографика"
      lead="Три шрифта с разными задачами. Tektur — заголовки, JetBrains Mono — весь интерфейс и числа (шрифт по умолчанию), Inter — только связный текст."
    >
      <Section
        title="Заголовки"
        description="Утилиты type-display и type-h1…h4 ставятся классом. Сами h1–h4 не стилизуются, как и в shadcn: заголовки внутри компонентов (PopoverTitle, шапка Accordion) shadcn оформляет сам."
      >
        <Scale rows={HEADINGS} />
      </Section>
      <Section
        title="Текст интерфейса"
        description="Обычные размеры Tailwind шрифтом по умолчанию. Отдельных стилей не нужно: компоненты shadcn уже задают размеры сами."
      >
        <Scale rows={INTERFACE} />
      </Section>
      <Section
        title="Связный текст"
        description="Inter назначается автоматически: абзацам p и частям shadcn с data-slot «…-description», «…-error» и тултипам."
      >
        <Scale rows={PROSE} />
      </Section>
    </Page>
  )
}
