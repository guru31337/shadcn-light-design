import { KeyRound, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function DialogPage() {
  return (
    <Page
      title="Dialog и AlertDialog"
      lead="Модальные окна над страницей: фон popover, тень и затемнение фона. Dialog — задача с вводом, AlertDialog — подтверждение необратимого действия. Заголовок обязателен — для чтения с экрана."
    >
      <Section
        title="Dialog"
        description="DialogHeader (DialogTitle, DialogDescription), содержимое, DialogFooter с действиями. Крестик в углу — по умолчанию, showCloseButton={false} убирает его."
      >
        <Preview>
          <Specimens>
            <Specimen label="с формой">
              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>
                  Переименовать счёт
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>Название счёта</DialogTitle>
                      <DialogDescription>
                        Видно только вам: в списке счетов и в уведомлениях.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="d-name">Название</FieldLabel>
                        <Input id="d-name" defaultValue="Основной" />
                      </Field>
                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Отмена
                      </DialogClose>
                      <Button type="submit">Сохранить</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </Specimen>
            <Specimen label="showCloseButton={false}">
              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>
                  Условия песочницы
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                  <DialogHeader>
                    <DialogTitle>Песочница</DialogTitle>
                    <DialogDescription>
                      Заявки исполняются по текущим котировкам без учёта
                      ликвидности стакана. Комиссия — 0,05% от оборота.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button />}>Понятно</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="AlertDialog"
        description='Подтверждение: AlertDialogCancel и AlertDialogAction. size="sm" — компактное окно с кнопками на всю ширину; AlertDialogMedia — иконка над заголовком.'
      >
        <Preview>
          <Specimens>
            <Specimen label="default">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Выпустить новый токен
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogMedia>
                      <KeyRound />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Выпустить новый токен?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Старый токен перестанет работать сразу. Роботы, которые им
                      пользуются, остановятся до замены.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction>Выпустить</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Specimen>
            <Specimen label='size="sm" · destructive'>
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" />}>
                  Удалить стратегию
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                      <Trash2 />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Удалить стратегию?</AlertDialogTitle>
                    <AlertDialogDescription>
                      История сделок останется в отчётах, настройки будут
                      потеряны.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="ghost">
                      Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>
    </Page>
  )
}
