"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"
import { upcomingToday } from "@/lib/data"

export function ScheduleCard({ className }: { className?: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Schedule</CardTitle>
          <CardDescription>
            {date
              ? date.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              : "Pick a date"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="mx-auto"
        />
        <div className="flex flex-col gap-3">
          <Progress value={87}>
            <ProgressLabel>Occupancy today</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={62}>
            <ProgressLabel>Housekeeping done</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <Alert>
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
          <AlertTitle>3 bookings pending</AlertTitle>
          <AlertDescription>
            Review and confirm reservations before 6 PM.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export function UpcomingCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Upcoming today</CardTitle>
          <CardDescription>Check-ins and guest activity</CardDescription>
        </div>
        <CardAction>
          <Button variant="ghost" size="sm">
            View all
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {upcomingToday.map((item) => (
            <Item key={item.name} variant="outline" size="sm">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${item.name}`}
                  />
                  <AvatarFallback className="bg-muted text-[0.65rem]">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.detail}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-sm" aria-label="Open">
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

export function FaqCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={SparklesIcon}
              strokeWidth={2}
              className="size-4 text-primary-foreground"
            />
            Quick answers
          </CardTitle>
          <CardDescription>Common host questions</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion>
          <AccordionItem value="payouts">
            <AccordionTrigger>When do payouts arrive?</AccordionTrigger>
            <AccordionContent>
              Payouts are released 24 hours after guest check-in and settle in
              1–3 business days depending on your bank.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cancel">
            <AccordionTrigger>How do cancellations work?</AccordionTrigger>
            <AccordionContent>
              Guests can cancel free of charge up to 48 hours before check-in.
              After that, the first night is charged.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sync">
            <AccordionTrigger>Can I sync external calendars?</AccordionTrigger>
            <AccordionContent>
              Yes — connect Airbnb, Booking.com, or any iCal feed from Settings
              to keep availability in sync automatically.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
