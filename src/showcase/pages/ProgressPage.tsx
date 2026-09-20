import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function ProgressPage() {
  return (
    <Page
      title="Загрузка и прогресс"
      lead="Progress — известная доля выполненного, Spinner — ожидание без срока, Skeleton — место под содержимое, пока оно грузится."
    >
      <Section
        title="Progress"
        description="Заполненная часть — primary, дорожка — secondary (правило по data-slot в index.css: у shadcn она muted и сливается с поверхностью). Подпись и значение — ProgressLabel и ProgressValue."
      >
        <Preview>
          <div className="flex max-w-md flex-col gap-6">
            {[0, 30, 75, 100].map((v) => (
              <Progress key={v} value={v} aria-label={`Пример ${v}%`} />
            ))}
            <Progress value={56}>
              <ProgressLabel>Загрузка истории сделок</ProgressLabel>
              <ProgressValue className="ml-auto" />
            </Progress>
          </div>
        </Preview>
      </Section>

      <Section
        title="Spinner"
        description="Иконка Loader2 с вращением. Размер — size-*, цвет — текущий цвет текста."
      >
        <Preview>
          <Specimens>
            <Specimen label="size-4">
              <Spinner />
            </Specimen>
            <Specimen label="size-6">
              <Spinner className="size-6" />
            </Specimen>
            <Specimen label="text-muted-foreground">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner />
                Подключаемся к стриму…
              </span>
            </Specimen>
            <Specimen label="в кнопке">
              <Button disabled>
                <Spinner data-icon="inline-start" />
                Сохранение…
              </Button>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Skeleton"
        description="Заглушки повторяют форму будущего содержимого: строки текста, аватар, карточку. Заливка — secondary, как у дорожек: у скелетона нет ничего, кроме формы."
      >
        <Preview>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
        </Preview>
      </Section>
    </Page>
  )
}
