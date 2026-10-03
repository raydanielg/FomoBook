import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { DateRangePicker } from "@workspace/ui/components/date-picker"
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BookingSheet } from "@/components/booking-sheet"
import { BookingsChart } from "@/components/bookings-chart"
import { BookingsTable } from "@/components/bookings-table"
import { SiteHeader } from "@/components/site-header"
import { FaqCard, ScheduleCard, UpcomingCard } from "@/components/side-cards"
import { StatsCards } from "@/components/stats-cards"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Good evening, Ezra
              </h1>
              <p className="text-sm text-muted-foreground">
                Here&apos;s what&apos;s happening across your properties today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DateRangePicker className="hidden sm:inline-flex" />
              <BookingSheet>
                <Button>
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                  New booking
                </Button>
              </BookingSheet>
            </div>
          </div>
          <StatsCards />
          <div className="grid gap-6 xl:grid-cols-3">
            <BookingsChart className="xl:col-span-2" />
            <ScheduleCard />
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            <BookingsTable className="xl:col-span-2" />
            <div className="flex flex-col gap-6">
              <UpcomingCard />
              <FaqCard />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
