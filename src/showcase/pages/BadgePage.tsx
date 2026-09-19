import { CircleCheck, TriangleAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const VARIANTS = [
  ["default", "LIVE"],
  ["secondary", "Акция"],
  ["outline", "SBER"],
  ["destructive", "Разрыв связи"],
  ["success", "Подключён"],
  ["warning", "SANDBOX"],
  ["info", "Новое"],
  ["ghost", "Черновик"],
  ["link", "Все"],
] as const

export function BadgePage() {
  return (
    <Page
      title="Badge"
      lead="Короткая метка статуса, режима или категории — одно-два слова. success, warning и info — варианты системы, у shadcn их нет."
    >
      <Section
        title="Варианты"
        description="Проп variant. Статусные варианты мягкие: подложка 10% и рамка 40% цвета."
      >
        <Preview>
          <Specimens>
            {VARIANTS.map(([v, text]) => (
              <Specimen key={v} label={v}>
                <Badge variant={v}>{text}</Badge>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="С иконкой"
        description="Иконка с data-icon — статус читается не только по цвету."
      >
        <Preview>
          <Specimens>
            <Specimen label="success">
              <Badge variant="success">
                <CircleCheck data-icon="inline-start" />
                Подключён
              </Badge>
            </Specimen>
            <Specimen label="warning">
              <Badge variant="warning">
                <TriangleAlert data-icon="inline-start" />
                Переподключение
              </Badge>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Рядом с заголовком и в строке списка."
      >
        <Preview className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h3 className="type-h4">Сбербанк</h3>
            <Badge variant="secondary">Акция</Badge>
            <Badge variant="outline">SBER</Badge>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
            <span>Стрим маркет-данных</span>
            <Badge variant="success">
              <CircleCheck data-icon="inline-start" />
              Подключён
            </Badge>
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
