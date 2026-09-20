import { ChevronDown, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function ButtonGroupPage() {
  return (
    <Page
      title="ButtonGroup"
      lead="Связанные действия одной полосой: общие рамки, скругление только по краям группы. Внутри — обычные Button, Input, Select и подпись ButtonGroupText."
    >
      <Section
        title="Состав"
        description="Кнопки outline сливают соседние рамки. Для заливных вариантов рамки нет — между ними ставится ButtonGroupSeparator."
      >
        <Preview>
          <Specimens>
            <Specimen label="outline">
              <ButtonGroup>
                <Button variant="outline">1Д</Button>
                <Button variant="outline">1Н</Button>
                <Button variant="outline">1М</Button>
              </ButtonGroup>
            </Specimen>
            <Specimen label="secondary + ButtonGroupSeparator">
              <ButtonGroup>
                <Button variant="secondary">Копировать</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary" size="icon" aria-label="Ещё">
                  <ChevronDown />
                </Button>
              </ButtonGroup>
            </Specimen>
            <Specimen label="ButtonGroupText + Input">
              <ButtonGroup>
                <ButtonGroupText render={<Label htmlFor="bg-lot" />}>
                  Лот
                </ButtonGroupText>
                <Input id="bg-lot" defaultValue="10" className="w-20" />
              </ButtonGroup>
            </Specimen>
            <Specimen label='orientation="vertical"'>
              <ButtonGroup orientation="vertical">
                <Button variant="outline" size="icon" aria-label="Больше">
                  <Plus />
                </Button>
                <Button variant="outline" size="icon" aria-label="Меньше">
                  <Minus />
                </Button>
              </ButtonGroup>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Кнопка с меню"
        description="Главное действие и стрелка с остальными — DropdownMenuTrigger с render={<Button />}."
      >
        <Preview>
          <ButtonGroup>
            <Button variant="outline">Экспорт в CSV</Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Другие форматы"
                  />
                }
              >
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Экспорт в XLSX</DropdownMenuItem>
                  <DropdownMenuItem>Экспорт в JSON</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Количество лотов в заявке: шаг вниз, поле, шаг вверх. Группы рядом разделяются отступом, а не общей рамкой."
      >
        <Preview>
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="Меньше лотов">
                <Minus />
              </Button>
              <Input
                defaultValue="12"
                className="w-16 text-center"
                aria-label="Лотов"
              />
              <Button variant="outline" size="icon" aria-label="Больше лотов">
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="success">Купить</Button>
            </ButtonGroup>
          </ButtonGroup>
        </Preview>
      </Section>
    </Page>
  )
}
