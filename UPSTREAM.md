# Отличия компонентов от оригинала shadcn

Реестр всех правок в `src/components/ui/`. Нужен, чтобы обновлять компоненты
(`pnpm dlx shadcn@latest add <имя> --dry-run` → `--diff <файл>`) и не терять свои изменения.
Правило — в `AGENTS.md`: в компонент попадают только новые варианты ролей и рамки мягких
вариантов, всё остальное решается в `src/index.css`.

> **Состояние:** правки этапа 1 сделаны до того, как был принят принцип «дизайн в index.css».
> Строки с пометкой **→ index.css** будут вынесены в тему и откатаны в компонентах к оригиналу.

| Файл | Изменение | Почему | Статус |
|---|---|---|---|
| `button.tsx` | варианты `success`; рамка `border-destructive/40` у `destructive`; рамка `border-border` у `secondary` | роли нет в shadcn; край мягкого варианта | остаётся |
| `button.tsx` | радиусы `rounded-sm`, фокус `focus-ring`, hover через `accent`, размеры без `rounded-[min(…)]` | — | → index.css |
| `badge.tsx` | варианты `success`, `warning`, `info`; рамки мягких вариантов и `secondary` | роли нет в shadcn; край | остаётся |
| `badge.tsx` | `rounded-sm` вместо `rounded-4xl`, фокус | — | → index.css |
| `alert.tsx` | варианты `success`, `warning`, `info`; мягкая подложка + рамка у статусных | роли нет в shadcn | остаётся |
| `alert.tsx` | `rounded-md`, шрифт описания `type-body` | — | → index.css |
| `card.tsx` | `rounded-md`, `ring-border`, подвал `bg-muted`, шрифт описания | — | → index.css |
| `input.tsx` | `rounded-sm`, `bg-card`, фокус, без кольца ошибки | — | → index.css |
| `select.tsx` | `rounded-sm`/`rounded-md`, `bg-card`, фокус, `ring-border` | — | → index.css |
| `field.tsx` | шрифт описания и ошибки, `rounded-md` у карточки выбора | — | → index.css |
| `scroll-area.tsx` | удалён неиспользуемый `import * as React` | оригинал не собирается со строгим `tsconfig` шаблона (`noUnusedLocals`) | остаётся |
