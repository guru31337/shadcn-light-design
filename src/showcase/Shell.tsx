import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { PAGES } from "./pages"
import { useRoute } from "./router"
import { SURFACES, type Surface, SurfaceContext, useSurface } from "./surface"

function SurfaceToggle() {
  const { surface, setSurface } = useSurface()
  return (
    <Tabs
      value={surface}
      onValueChange={(value) => setSurface(value as Surface)}
    >
      <TabsList variant="line" aria-label="Поверхность превью">
        {SURFACES.map((s) => (
          <TabsTrigger key={s.id} value={s.id}>
            {s.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function Nav({ current }: { current: string }) {
  const groups = [...new Set(PAGES.map((p) => p.group))]
  return (
    <nav className="flex flex-col gap-6" aria-label="Разделы витрины">
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-1">
          <span className="px-3 pb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {group}
          </span>
          {PAGES.filter((p) => p.group === group).map((p) => (
            <a
              key={p.id}
              href={`#/${p.id}`}
              aria-current={p.id === current ? "page" : undefined}
              className={cn(
                "flex h-8 items-center rounded-lg px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                p.id === current
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {p.title}
            </a>
          ))}
        </div>
      ))}
    </nav>
  )
}

export function Shell() {
  const route = useRoute()
  const page = PAGES.find((p) => p.id === route) ?? PAGES[0]
  const [surface, setSurface] = useState<Surface>("card")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page.id])

  return (
    <SurfaceContext.Provider value={{ surface, setSurface }}>
      <div className="min-h-svh bg-background">
        <header className="sticky top-0 z-20 border-b border-border bg-card">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6">
            <a href="#/" className="font-heading text-base font-medium">
              shadcn-light-design
            </a>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                Поверхность превью
              </span>
              <SurfaceToggle />
            </div>
          </div>
        </header>
        <div className="mx-auto flex max-w-7xl">
          <aside className="hidden w-56 shrink-0 border-r border-border md:block">
            <ScrollArea className="sticky top-14 h-[calc(100svh-3.5rem)]">
              <div className="px-3 py-8">
                <Nav current={page.id} />
              </div>
            </ScrollArea>
          </aside>
          <main className="min-w-0 flex-1 px-6 py-10 md:px-12">
            <div className="mx-auto max-w-5xl">
              <page.Component />
            </div>
          </main>
        </div>
      </div>
    </SurfaceContext.Provider>
  )
}
