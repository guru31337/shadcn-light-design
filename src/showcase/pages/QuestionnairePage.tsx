import type { FormEvent } from "react"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { toast } from "@/components/ui/toast"
import { Page, Preview, Section } from "../kit"

const ITEMS = [
  {
    name: "goal",
    required: true,
    choices: [{ value: "income" }, { value: "growth" }, { value: "hedge" }],
  },
  {
    name: "markets",
    choices: [
      { value: "shares" },
      { value: "bonds" },
      { value: "futures", disabled: true },
    ],
  },
  {
    name: "horizon",
    required: true,
    choices: [{ value: "month" }, { value: "year" }, { value: "long" }],
  },
] as const

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  toast.add({
    type: "success",
    title: "Профиль сохранён",
    description: `Цель: ${data.get("goal") ?? "—"} · рынки: ${data.getAll("markets").join(", ") || "—"}`,
  })
}

export function QuestionnairePage() {
  return (
    <Page
      title="Questionnaire"
      lead="Пошаговый опрос: по одному вопросу, с вариантами, своим ответом и прогрессом. Вариант — карточка с рамкой input, выбранный — рамка и подложка primary."
    >
      <Section
        title="Опрос"
        description="QuestionnaireItem на каждый вопрос: required — обязательный, multiple — несколько ответов. Клавиши: буквы выбирают вариант, Enter — дальше."
      >
        <Preview>
          <Questionnaire
            className="max-w-lg"
            defaultItem="goal"
            items={ITEMS}
            shortcuts="letters"
            onSubmit={handleSubmit}
          >
            {/* У shadcn текст прогресса английский («Question 1 of 3») — переводим через render */}
            <QuestionnaireProgress
              aria-label="Прогресс опроса"
              render={(props, { current, total }) => (
                <div
                  {...props}
                  aria-valuetext={`Вопрос ${current} из ${total}`}
                >
                  Вопрос {current} из {total}
                </div>
              )}
            />
            <QuestionnaireItem name="goal" required>
              <QuestionnaireTitle>Зачем вы инвестируете?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Выберите главное или напишите свой вариант.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="income">
                  <span className="font-medium">Регулярный доход</span>
                  <QuestionnaireChoiceDescription>
                    Дивиденды и купоны.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="growth">
                  <span className="font-medium">Рост капитала</span>
                  <QuestionnaireChoiceDescription>
                    Готов терпеть просадки ради доходности.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="hedge">
                  <span className="font-medium">Защита от инфляции</span>
                  <QuestionnaireChoiceDescription>
                    Облигации с плавающим купоном, золото.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireInput
                  aria-label="Свой вариант"
                  placeholder="Свой вариант…"
                />
              </QuestionnaireChoices>
              <QuestionnaireError>
                Выберите вариант или напишите свой.
              </QuestionnaireError>
            </QuestionnaireItem>
            <QuestionnaireItem name="markets" multiple>
              <QuestionnaireTitle>На каких рынках торгуете?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Можно выбрать несколько или пропустить.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="shares">Акции</QuestionnaireChoice>
                <QuestionnaireChoice value="bonds">
                  Облигации
                </QuestionnaireChoice>
                <QuestionnaireChoice value="futures" disabled>
                  Фьючерсы — после тестирования
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="horizon" required>
              <QuestionnaireTitle>На какой срок?</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="month">
                  До месяца
                </QuestionnaireChoice>
                <QuestionnaireChoice value="year">До года</QuestionnaireChoice>
                <QuestionnaireChoice value="long">
                  Больше года
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError>Выберите срок.</QuestionnaireError>
            </QuestionnaireItem>
            <QuestionnaireActions className="w-full">
              <QuestionnairePrevious>Назад</QuestionnairePrevious>
              <QuestionnaireSkip>Пропустить</QuestionnaireSkip>
              <QuestionnaireNext>Далее</QuestionnaireNext>
              <QuestionnaireSubmit>Сохранить ответы</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        </Preview>
      </Section>
    </Page>
  )
}
