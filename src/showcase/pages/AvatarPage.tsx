import { Check } from "lucide-react"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import PHOTO from "../assets/avatar.svg"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const TEAM = ["АК", "МС", "ИП", "ОЛ"]

export function AvatarPage() {
  return (
    <Page
      title="Avatar"
      lead="Фото или инициалы. AvatarFallback обязателен — он виден, пока картинка грузится или если не загрузилась. Край — тонкая рамка border поверх круга."
    >
      <Section
        title="Размеры и состав"
        description="Проп size: sm, default, lg. AvatarBadge — точка статуса в углу."
      >
        <Preview>
          <Specimens>
            {(["sm", "default", "lg"] as const).map((size) => (
              <Specimen key={size} label={size}>
                <Avatar size={size}>
                  <AvatarImage src={PHOTO} alt="Анна Королёва" />
                  <AvatarFallback>АК</AvatarFallback>
                </Avatar>
              </Specimen>
            ))}
            <Specimen label="AvatarFallback">
              <Avatar>
                <AvatarFallback>МС</AvatarFallback>
              </Avatar>
            </Specimen>
            <Specimen label="AvatarBadge">
              <Avatar size="lg">
                <AvatarFallback>ИП</AvatarFallback>
                <AvatarBadge>
                  <Check />
                </AvatarBadge>
              </Avatar>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="AvatarGroup"
        description="Стопка аватаров с кольцом ring-background; остаток — AvatarGroupCount."
      >
        <Preview>
          <AvatarGroup>
            {TEAM.map((i) => (
              <Avatar key={i}>
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+8</AvatarGroupCount>
          </AvatarGroup>
        </Preview>
      </Section>
    </Page>
  )
}
