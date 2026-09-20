import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Page, Preview, Section, Specimen, Specimens } from "../kit"

export function BreadcrumbPaginationPage() {
  return (
    <Page
      title="Breadcrumb и Pagination"
      lead="Где я и куда дальше. Breadcrumb — путь до текущей страницы, Pagination — страницы длинного списка. Текущая страница — foreground, ссылки — muted-foreground."
    >
      <Section
        title="Breadcrumb"
        description="Текущая страница — BreadcrumbPage, не ссылка. Длинный путь сворачивается в BreadcrumbEllipsis с меню."
      >
        <Preview>
          <Specimens>
            <Specimen label="простой">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/breadcrumb">
                      Портфель
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/breadcrumb">Акции</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>SBER</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Specimen>
            <Specimen label="с BreadcrumbEllipsis">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/breadcrumb">Счета</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Скрытые разделы"
                          />
                        }
                      >
                        <BreadcrumbEllipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Основной</DropdownMenuItem>
                          <DropdownMenuItem>Стратегии</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Пробой уровня</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Specimen>
          </Specimens>
        </Preview>
      </Section>

      <Section
        title="Pagination"
        description="PaginationLink с isActive — текущая страница, в рамке. Пропуски — PaginationEllipsis. По умолчанию у shadcn подписи Previous и Next — меняются пропом text."
      >
        <Preview>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#/breadcrumb" text="Назад" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/breadcrumb">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/breadcrumb" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/breadcrumb">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#/breadcrumb">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#/breadcrumb" text="Вперёд" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Preview>
      </Section>
    </Page>
  )
}
