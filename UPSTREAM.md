# Отличия компонентов от оригинала shadcn

Реестр всех правок в `src/components/ui/`. Остальные файлы побайтово совпадают с реестром
shadcn (стиль `base-nova`). Реестр нужен, чтобы обновлять компоненты
(`pnpm dlx shadcn@latest add <имя> --dry-run` → `--diff <файл>`) и не терять свои изменения.

Правило — в `AGENTS.md` (правило №1): всё, что можно решить в `src/index.css`, решается там.
В компонент попадают только новые варианты для ролей, которых нет в shadcn, и рамки у вариантов,
которые сливаются с поверхностью.

| Файл | Изменение | Почему нельзя в `index.css` |
|---|---|---|
| `button.tsx` | вариант `success` (копия `destructive` без `dark:`) | роли `success` нет в shadcn, вариант задаётся в `cva` |
| `button.tsx` | `border-destructive/40` у варианта `destructive` | заливка `destructive/10` с прозрачностью зашита в класс; без рамки кнопка сливается с `muted` (1.02:1) |
| `badge.tsx` | варианты `success`, `warning`, `info` (копия `destructive` без `dark:`) | ролей нет в shadcn |
| `badge.tsx` | `border-destructive/40` у варианта `destructive` | та же причина, что у кнопки |
| `alert.tsx` | варианты `success`, `warning`, `info` (копия `destructive` без `dark:`) | ролей нет в shadcn |
| `scroll-area.tsx` | удалён неиспользуемый `import * as React` | не стилевая правка: оригинал не собирается со строгим `tsconfig` шаблона (`noUnusedLocals`) |

## Что решено в `index.css`, а не в компонентах

- **Радиусы.** Значения имён шкалы: `xs`–`lg` и `4xl` → `--radius-control`, `xl`–`3xl` →
  `--radius-container`.
- **Inter в описаниях, ошибках, тултипах** — правило по `data-slot` в `@layer base`.
- **Видимость `secondary`** — роль `--secondary` на ступень темнее поверхностей, заливка сама
  даёт край.
- **Фокус** — штатный shadcn (`border-ring` + `ring-ring/50`), настраивается только `--ring`.
- **Тени** — определены только имена, которые shadcn ставит слоям над страницей.
- **`bg-black/10` и `bg-white`** в оверлеях и ползунке — `--color-black` и `--color-white`
  ссылаются на палитру.
