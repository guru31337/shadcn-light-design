import { Download, FileSpreadsheet, FileText, RotateCw, X } from "lucide-react"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const STATES = [
  ["idle", "сделки-август.csv", "Готов к загрузке"],
  ["uploading", "отчёт-брокера.pdf", "Загрузка · 64%"],
  ["processing", "стратегия.py", "Проверяем код"],
  ["error", "портфель.xlsx", "Файл больше 10 МБ"],
  ["done", "налоги-2025.pdf", "PDF · 2,4 МБ"],
] as const

function Media({ state }: { state: (typeof STATES)[number][0] }) {
  if (state === "uploading") return <Spinner />
  if (state === "error") return <FileSpreadsheet />
  return <FileText />
}

export function AttachmentPage() {
  return (
    <Page
      title="Attachment"
      lead="Вложение в чате или форме: файл, его состояние и действия. Карточка на фоне card с рамкой; описание ошибки — destructive/80."
    >
      <Section
        title="Состояния"
        description="Проп state: idle, uploading, processing, error, done. При загрузке и обработке заголовок переливается сам — отдельный индикатор не нужен."
      >
        <Preview>
          <div className="flex max-w-md flex-col gap-2">
            {STATES.map(([state, title, text]) => (
              <Attachment key={state} state={state} className="w-full">
                <AttachmentMedia>
                  <Media state={state} />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{title}</AttachmentTitle>
                  <AttachmentDescription>{text}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  {state === "error" && (
                    <AttachmentAction aria-label={`Повторить ${title}`}>
                      <RotateCw />
                    </AttachmentAction>
                  )}
                  {state === "done" ? (
                    <AttachmentAction aria-label={`Скачать ${title}`}>
                      <Download />
                    </AttachmentAction>
                  ) : (
                    <AttachmentAction aria-label={`Убрать ${title}`}>
                      <X />
                    </AttachmentAction>
                  )}
                </AttachmentActions>
              </Attachment>
            ))}
          </div>
        </Preview>
      </Section>

      <Section
        title="Размеры и группа"
        description="Проп size: default, sm, xs. AttachmentGroup — ряд вложений с прокруткой."
      >
        <Preview>
          <Specimens>
            {(["default", "sm", "xs"] as const).map((size) => (
              <Specimen key={size} label={size}>
                <Attachment size={size}>
                  <AttachmentMedia>
                    <FileText />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>выписка.pdf</AttachmentTitle>
                    <AttachmentDescription>312 КБ</AttachmentDescription>
                  </AttachmentContent>
                </Attachment>
              </Specimen>
            ))}
          </Specimens>
          <AttachmentGroup className="mt-8 max-w-lg">
            {["январь", "февраль", "март", "апрель"].map((m) => (
              <Attachment key={m} size="sm">
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>отчёт-{m}.pdf</AttachmentTitle>
                </AttachmentContent>
              </Attachment>
            ))}
          </AttachmentGroup>
        </Preview>
      </Section>
    </Page>
  )
}
