import { ArrowRight, Plus, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "success",
  "link",
] as const
const LABELS: Record<(typeof VARIANTS)[number], string> = {
  default: "Сохранить",
  secondary: "Проверить",
  outline: "Отмена",
  ghost: "Сбросить",
  destructive: "Удалить",
  success: "Купить",
  link: "Подробнее",
}

export function ButtonPage() {
  return (
    <Page
      title="Button"
      lead="Кнопка действия. На экране одна кнопка default — главное действие; остальные — secondary, outline или ghost. success — вариант системы, у shadcn его нет."
    >
      <Section
        title="Варианты"
        description="Проп variant. Мягкие destructive и success — подложка 10% и рамка 40% цвета, поэтому видны на любой поверхности."
      >
        <Preview>
          <Specimens>
            {VARIANTS.map((v) => (
              <Specimen key={v} label={v}>
                <Button variant={v}>{LABELS[v]}</Button>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Размеры"
        description="Проп size: xs 24px, sm 28px, default 32px, lg 36px; для кнопок-иконок — icon-xs … icon-lg."
      >
        <Preview>
          <Specimens>
            {(["xs", "sm", "default", "lg"] as const).map((s) => (
              <Specimen key={s} label={s}>
                <Button size={s} variant="outline">
                  Кнопка
                </Button>
              </Specimen>
            ))}
            {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((s) => (
              <Specimen key={s} label={s}>
                <Button size={s} variant="outline" aria-label="Обновить">
                  <RefreshCw />
                </Button>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="С иконкой"
        description='Иконка lucide с data-icon="inline-start" или "inline-end"; размер задаёт сама кнопка.'
      >
        <Preview>
          <Specimens>
            <Specimen label="inline-start">
              <Button>
                <Plus data-icon="inline-start" />
                Добавить
              </Button>
            </Specimen>
            <Specimen label="inline-end">
              <Button variant="outline">
                Далее
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Specimen>
            <Specimen label="destructive + иконка">
              <Button variant="destructive">
                <Trash2 data-icon="inline-start" />
                Удалить счёт
              </Button>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Состояния"
        description="Недоступная кнопка — атрибут disabled. Загрузка — Spinner вместо иконки, текст процесса и disabled."
      >
        <Preview>
          <Specimens>
            <Specimen label="обычная">
              <Button>Сохранить</Button>
            </Specimen>
            <Specimen label="disabled">
              <Button disabled>Сохранить</Button>
            </Specimen>
            <Specimen label="загрузка">
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Сохранение…
              </Button>
            </Specimen>
            <Specimen label="secondary · загрузка">
              <Button variant="secondary" disabled>
                <Spinner data-icon="inline-start" />
                Проверка…
              </Button>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Главное действие справа, отмена — рядом, опасное действие отделено."
      >
        <Preview>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button variant="destructive">Пересоздать счёт</Button>
            <div className="flex gap-2">
              <Button variant="outline">Отмена</Button>
              <Button>Сохранить настройки</Button>
            </div>
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
