import { useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
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
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

function Code({
  id,
  value,
  invalid,
  disabled,
}: {
  id: string
  value?: string
  invalid?: boolean
  disabled?: boolean
}) {
  // input-otp не поддерживает defaultValue — только управляемое значение
  const [code, setCode] = useState(value ?? "")
  return (
    <InputOTP
      id={id}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={code}
      onChange={setCode}
      disabled={disabled}
    >
      <InputOTPGroup>
        {[0, 1, 2].map((i) => (
          <InputOTPSlot key={i} index={i} aria-invalid={invalid || undefined} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map((i) => (
          <InputOTPSlot key={i} index={i} aria-invalid={invalid || undefined} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export function InputOTPPage() {
  return (
    <Page
      title="InputOTP"
      lead="Одноразовый код по ячейкам. Ячейки — рамка input, активная — рамка и ореол ring, как у фокуса поля."
    >
      <Section
        title="Состояния"
        description="Группы ячеек разделяет InputOTPSeparator. Ошибка — aria-invalid на ячейках."
      >
        <Preview>
          <Specimens>
            <Specimen label="пустой">
              <Code id="otp-empty" />
            </Specimen>
            <Specimen label="заполнен">
              <Code id="otp-filled" value="482913" />
            </Specimen>
            <Specimen label="aria-invalid">
              <Code id="otp-invalid" value="4829" invalid />
            </Specimen>
            <Specimen label="disabled">
              <Code id="otp-off" value="482913" disabled />
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="В контексте"
        description="Подтверждение входа: код из Telegram, ошибка под полем, повторная отправка — ссылкой."
      >
        <Preview>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Подтвердите вход</CardTitle>
              <CardDescription>
                Мы отправили код в Telegram-бот, он действует 5 минут.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field data-invalid>
                <FieldLabel htmlFor="otp-login">Код</FieldLabel>
                <Code id="otp-login" value="11" invalid />
                <FieldError>Неверный код, осталось 2 попытки.</FieldError>
                <FieldDescription>
                  Не пришёл?{" "}
                  <Button variant="link" className="h-auto p-0">
                    Отправить ещё раз
                  </Button>
                </FieldDescription>
              </Field>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Войти</Button>
            </CardFooter>
          </Card>
        </Preview>
      </Section>
    </Page>
  )
}
