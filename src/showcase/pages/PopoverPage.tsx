import { Bell, Info, Save } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const SIDES = ["top", "right", "bottom", "left"] as const

export function PopoverPage() {
  return (
    <Page
      title="Popover, HoverCard, Tooltip"
      lead="Небольшие слои рядом с элементом. Popover — по нажатию, с содержимым и полями; HoverCard — по наведению, превью; Tooltip — короткая подпись к кнопке без текста. Фон popover, тень shadow-md."
    >
      <Section
        title="Popover"
        description="PopoverHeader (PopoverTitle, PopoverDescription) и любое содержимое. Сторона — side, выравнивание — align."
      >
        <Preview>
          <Specimens>
            <Specimen label="с полями">
              <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>
                  <Bell data-icon="inline-start" />
                  Алерт по цене
                </PopoverTrigger>
                <PopoverContent align="start">
                  <PopoverHeader>
                    <PopoverTitle>Алерт SBER</PopoverTitle>
                    <PopoverDescription>
                      Пришлём сообщение, когда цена пересечёт уровень.
                    </PopoverDescription>
                  </PopoverHeader>
                  <FieldGroup className="gap-3">
                    <Field>
                      <FieldLabel htmlFor="pop-level">Уровень, ₽</FieldLabel>
                      <Input id="pop-level" defaultValue="290.00" />
                    </Field>
                    <Button size="sm">Создать алерт</Button>
                  </FieldGroup>
                </PopoverContent>
              </Popover>
            </Specimen>
            {SIDES.map((side) => (
              <Specimen key={side} label={`side="${side}"`}>
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {side}
                  </PopoverTrigger>
                  <PopoverContent side={side} className="w-56">
                    <PopoverHeader>
                      <PopoverTitle>Комиссия</PopoverTitle>
                      <PopoverDescription>
                        0,05% от оборота, не меньше 0,01 ₽.
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="HoverCard"
        description="Превью по наведению — только дополнительная информация: на телефоне наведения нет."
      >
        <Preview>
          <HoverCard>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="link" className="px-0" />}
            >
              @moex_signals
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Сигналы Мосбиржи</span>
                  <p className="text-muted-foreground">
                    Канал с сигналами по голубым фишкам. 12 400 подписчиков.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Preview>
      </Section>

      <Section
        title="Tooltip"
        description="Подпись к кнопке-иконке и сочетание клавиш в Kbd. Тёмный слой foreground с текстом background — единственный инвертированный элемент системы."
      >
        <Preview>
          <Specimens>
            {SIDES.map((side) => (
              <Specimen key={side} label={`side="${side}"`}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Подробнее"
                      />
                    }
                  >
                    <Info />
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    Подробнее о комиссии
                  </TooltipContent>
                </Tooltip>
              </Specimen>
            ))}
            <Specimen label="с Kbd">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Сохранить"
                    />
                  }
                >
                  <Save />
                </TooltipTrigger>
                <TooltipContent>
                  Сохранить <Kbd>Ctrl S</Kbd>
                </TooltipContent>
              </Tooltip>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>
    </Page>
  )
}
