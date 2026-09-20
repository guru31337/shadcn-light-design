import { Fragment } from "react"
import { ChevronRight, KeyRound, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const TOKENS = [
  ["Робот · пробой", "Read/Write · выпущен 02.09.2026"],
  ["Отчёты", "Read only · выпущен 14.07.2026"],
] as const

export function ItemPage() {
  return (
    <Page
      title="Item"
      lead="Строка списка: медиа, заголовок с описанием и действия справа. Из Item собираются списки настроек, токенов, уведомлений."
    >
      <Section
        title="Варианты"
        description="Проп variant: default — без края, для списков внутри карточки; outline — с рамкой; muted — лёгкая подложка muted/50 для страницы и карточки. На утопленной поверхности подложка пропадает — там берите outline."
      >
        <Preview>
          <Specimens>
            {(["default", "outline", "muted"] as const).map((variant) => (
              <Specimen key={variant} label={variant}>
                <Item variant={variant} className="w-80">
                  <ItemMedia variant="icon">
                    <ShieldCheck />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Двухфакторный вход</ItemTitle>
                    <ItemDescription>
                      Код из Telegram при входе.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Badge variant="success">Вкл</Badge>
                  </ItemActions>
                </Item>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Размеры"
        description="Проп size: default, sm, xs — плотнее отступы и мельче медиа."
      >
        <Preview>
          <Specimens>
            {(["default", "sm", "xs"] as const).map((size) => (
              <Specimen key={size} label={size}>
                <Item variant="outline" size={size} className="w-72">
                  <ItemMedia>
                    <Avatar size={size === "default" ? "default" : "sm"}>
                      <AvatarFallback>АК</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Анна Королёва</ItemTitle>
                    <ItemDescription>Администратор</ItemDescription>
                  </ItemContent>
                </Item>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="ItemGroup с ItemSeparator: список токенов с действием и ссылкой-строкой."
      >
        <Preview>
          <ItemGroup className="max-w-lg rounded-xl border border-border">
            {TOKENS.map(([title, text], i) => (
              <Fragment key={title}>
                {i > 0 && <ItemSeparator />}
                <Item>
                  <ItemMedia variant="icon">
                    <KeyRound />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{text}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Отозвать
                    </Button>
                  </ItemActions>
                </Item>
              </Fragment>
            ))}
            <ItemSeparator />
            <Item render={<a href="#/item" />}>
              <ItemContent>
                <ItemTitle>Все токены и права</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRight />
              </ItemActions>
            </Item>
          </ItemGroup>
        </Preview>
      </Section>
    </Page>
  )
}
