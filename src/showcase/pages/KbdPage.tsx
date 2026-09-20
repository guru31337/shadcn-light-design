import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function KbdPage() {
  return (
    <Page
      title="Kbd"
      lead="Клавиша или сочетание клавиш. Подложка muted, текст muted-foreground; в тултипе цвета меняются вместе с ним."
    >
      <Section
        title="Состав"
        description="Kbd — одна клавиша, KbdGroup — сочетание."
      >
        <Preview>
          <Specimens>
            <Specimen label="Kbd">
              <Kbd>Esc</Kbd>
            </Specimen>
            <Specimen label="KbdGroup">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>Shift</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </Specimen>
            <Specimen label="в кнопке">
              <Button variant="outline">
                Отправить заявку
                <Kbd>Enter</Kbd>
              </Button>
            </Specimen>
            <Specimen label="в InputGroup">
              <InputGroup className="w-56">
                <InputGroupInput placeholder="Поиск" aria-label="Поиск" />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Kbd>/</Kbd>
                </InputGroupAddon>
              </InputGroup>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В тексте"
        description="Внутри связного текста Kbd набирается JetBrains Mono."
      >
        <Preview>
          <p className="max-w-md text-sm leading-6">
            Нажмите <Kbd>B</Kbd>, чтобы открыть заявку на покупку, и{" "}
            <Kbd>S</Kbd> — на продажу.{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>{" "}
            открывает командную строку.
          </p>
        </Preview>
      </Section>
    </Page>
  )
}
