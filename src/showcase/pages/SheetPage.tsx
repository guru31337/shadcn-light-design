import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

const SIDES = ["top", "right", "bottom", "left"] as const

function Filters() {
  return (
    <div className="flex flex-col gap-6 px-4">
      <FieldSet>
        <FieldLegend variant="label">Тип</FieldLegend>
        <FieldGroup className="gap-3">
          {["Акции", "Облигации", "Фонды"].map((t, i) => (
            <Field key={t} orientation="horizontal">
              <Checkbox id={`sh-${i}`} defaultChecked={i === 0} />
              <FieldLabel htmlFor={`sh-${i}`} className="font-normal">
                {t}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>
      <Field>
        <FieldLabel htmlFor="sh-min">Оборот за день от, ₽</FieldLabel>
        <Input id="sh-min" defaultValue="10 000 000" />
      </Field>
    </div>
  )
}

export function SheetPage() {
  return (
    <Page
      title="Sheet и Drawer"
      lead="Панели, которые выезжают с края. Sheet — боковая панель на компьютере: фильтры, подробности строки. Drawer — нижняя панель для телефона, закрывается смахиванием."
    >
      <Section
        title="Sheet"
        description='Проп side: "top", "right" (по умолчанию), "bottom", "left". SheetTitle обязателен.'
      >
        <Preview>
          <Specimens>
            {SIDES.map((side) => (
              <Specimen key={side} label={`side="${side}"`}>
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" />}>
                    {side === "right" ? (
                      <>
                        <SlidersHorizontal data-icon="inline-start" />
                        Фильтры
                      </>
                    ) : (
                      side
                    )}
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Фильтры</SheetTitle>
                      <SheetDescription>
                        Применяются к списку инструментов сразу.
                      </SheetDescription>
                    </SheetHeader>
                    <Filters />
                    <SheetFooter>
                      <Button>Показать 128</Button>
                      <SheetClose render={<Button variant="outline" />}>
                        Сбросить
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </Specimen>
            ))}
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Drawer"
        description="Выезжает снизу; swipeDirection меняет край. DrawerHeader, содержимое и DrawerFooter — как у Sheet."
      >
        <Preview>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Заявка на покупку
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>SBER · покупка</DrawerTitle>
                  <DrawerDescription>
                    Лимитная заявка, действует до конца дня.
                  </DrawerDescription>
                </DrawerHeader>
                <FieldGroup className="px-4">
                  <Field>
                    <FieldLabel htmlFor="dr-lots">Лотов</FieldLabel>
                    <Input id="dr-lots" defaultValue="10" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="dr-price">Цена, ₽</FieldLabel>
                    <Input id="dr-price" defaultValue="284.15" />
                  </Field>
                </FieldGroup>
                <DrawerFooter>
                  <Button variant="success">Купить на 28 415 ₽</Button>
                  <DrawerClose render={<Button variant="outline" />}>
                    Отмена
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Preview>
      </Section>
    </Page>
  )
}
