import { ArrowUp, Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Spinner } from "@/components/ui/spinner"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const VARIANTS = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const

const THREAD = [
  {
    id: "1",
    role: "user",
    text: "Почему робот не открыл позицию по SBER утром?",
  },
  {
    id: "2",
    role: "bot",
    text: "В 10:00 спред был 0,4% — выше порога стратегии 0,15%. Робот пропустил сигнал, как задано в настройках.",
  },
  { id: "3", role: "user", text: "Можно поднять порог до 0,3%?" },
  {
    id: "4",
    role: "bot",
    text: "Можно. Тогда за последний месяц было бы на 6 сделок больше, средний результат сделки ниже на 0,08%.",
  },
] as const

export function ChatPage() {
  return (
    <Page
      title="Чат"
      lead="Компоненты переписки: Message — строка сообщения, Bubble — подложка текста, Marker — служебная строка и разделитель, MessageScroller — лента с прокруткой к новым сообщениям."
    >
      <Section
        title="Bubble"
        description='Проп variant; align="end" — свои сообщения справа. muted, tinted и destructive — без рамки: на утопленной поверхности берите outline или secondary. BubbleReactions — реакции под пузырём.'
      >
        <Preview>
          <Specimens>
            {VARIANTS.map((v) => (
              <Specimen key={v} label={v}>
                <Bubble variant={v} className="max-w-56">
                  <BubbleContent>Заявка исполнена по 284.15</BubbleContent>
                </Bubble>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Message"
        description="MessageAvatar, MessageHeader, пузыри в BubbleGroup и MessageFooter. align=end — свои сообщения."
      >
        <Preview>
          <div className="flex max-w-lg flex-col gap-8">
            <Message align="start">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>ИИ</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>
                  <span>Ассистент</span>
                  <span className="ml-auto font-normal">18:42</span>
                </MessageHeader>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Стоп-заявка сработала по 281.90.
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>Убыток по сделке — 2 250 ₽.</BubbleContent>
                    <BubbleReactions>
                      <Button variant="ghost" size="xs">
                        Понятно
                      </Button>
                    </BubbleReactions>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <MessageHeader className="justify-end">Вы</MessageHeader>
                <Bubble>
                  <BubbleContent>Покажи сделки за сегодня</BubbleContent>
                </Bubble>
                <MessageFooter className="justify-end gap-1">
                  <Check />
                  Прочитано
                </MessageFooter>
              </MessageContent>
            </Message>
          </div>
        </Preview>
      </Section>

      <Section
        title="Marker"
        description="Служебные строки: variant default — строка, separator — подпись между линиями, border — строка с линией снизу."
      >
        <Preview>
          <div className="flex max-w-lg flex-col gap-6">
            <Marker>
              <MarkerIcon>
                <Spinner />
              </MarkerIcon>
              <MarkerContent>Считаем результат стратегии…</MarkerContent>
            </Marker>
            <Marker variant="separator">
              <MarkerContent>Сегодня</MarkerContent>
            </Marker>
            <Marker variant="border">
              <MarkerContent>Робот «Пробой» остановлен вручную</MarkerContent>
            </Marker>
          </div>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Переписка с ассистентом в Card: лента MessageScroller, разделитель дня и поле ввода внизу."
      >
        <Preview>
          <Card className="h-[34rem] max-w-lg">
            <CardHeader>
              <CardTitle>Ассистент</CardTitle>
              <CardDescription>Отвечает по данным вашего счёта</CardDescription>
            </CardHeader>
            <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
              <MessageScrollerProvider>
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent className="p-(--card-spacing)">
                      <MessageScrollerItem scrollAnchor={false}>
                        <Marker variant="separator">
                          <MarkerContent>Сегодня</MarkerContent>
                        </Marker>
                      </MessageScrollerItem>
                      {THREAD.map((m) => (
                        <MessageScrollerItem
                          key={m.id}
                          messageId={m.id}
                          scrollAnchor={m.role === "user"}
                        >
                          <Message align={m.role === "user" ? "end" : "start"}>
                            <MessageContent>
                              <Bubble
                                variant={
                                  m.role === "user" ? "default" : "muted"
                                }
                              >
                                <BubbleContent>{m.text}</BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </MessageScrollerProvider>
            </CardContent>
            <CardFooter>
              <InputGroup>
                <InputGroupTextarea
                  placeholder="Спросите про счёт или стратегию"
                  className="min-h-10"
                  aria-label="Сообщение"
                />
                <InputGroupAddon align="block-end" className="p-2">
                  <InputGroupButton
                    variant="default"
                    size="icon-sm"
                    className="ml-auto"
                    aria-label="Отправить"
                  >
                    <ArrowUp />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </CardFooter>
          </Card>
        </Preview>
      </Section>
    </Page>
  )
}
