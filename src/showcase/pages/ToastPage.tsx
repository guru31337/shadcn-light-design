import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

function showUndo() {
  const id = toast.add({
    title: "Заявка отменена",
    description: "SBER · покупка 10 лотов по 284.15",
    actionProps: {
      children: "Вернуть",
      onClick() {
        toast.close(id)
        toast.add({ description: "Заявка снова в стакане." })
      },
    },
  })
}

function showPromise() {
  toast.promise(
    new Promise<{ lots: number }>((resolve) => {
      window.setTimeout(() => resolve({ lots: 10 }), 2000)
    }),
    {
      loading: "Отправляем заявку…",
      success: (data) => `Исполнено: ${data.lots} лотов.`,
      error: "Биржа отклонила заявку.",
    }
  )
}

const TYPES = [
  ["success", "Настройки сохранены", "Применятся при следующем подключении."],
  ["info", "Доступна новая версия API", "Обновите SDK до следующей версии."],
  ["warning", "Переподключение к стриму", "Котировки могут отставать."],
  ["error", "Токен отклонён", "Проверьте права Read/Write."],
] as const

export function ToastPage() {
  return (
    <Page
      title="Toast"
      lead="Короткое сообщение о результате действия, само исчезает. Для Base UI — toast.add() из @/components/ui/toast; Toaster подключён один раз в корне приложения. Слой — popover с тенью."
    >
      <Section
        title="Типы"
        description="Проп type добавляет иконку. Цвет несёт только иконка ошибки (destructive), остальные — цвета текста: смысл передаёт заголовок, а не цвет."
      >
        <Preview>
          <Specimens>
            <Specimen label="без type">
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Отчёт готов",
                    description: "Сделки за август, 42 строки.",
                  })
                }
              >
                Обычный
              </Button>
            </Specimen>
            {TYPES.map(([type, title, description]) => (
              <Specimen key={type} label={`type="${type}"`}>
                <Button
                  variant="outline"
                  onClick={() => toast.add({ type, title, description })}
                >
                  {type}
                </Button>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="С действием и промисом"
        description="actionProps — кнопка в тосте (Button outline sm). toast.promise показывает загрузку, затем результат."
      >
        <Preview>
          <Specimens>
            <Specimen label="actionProps">
              <Button variant="outline" onClick={showUndo}>
                Отменить заявку
              </Button>
            </Specimen>
            <Specimen label="toast.promise">
              <Button onClick={showPromise}>Отправить заявку</Button>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>
    </Page>
  )
}
