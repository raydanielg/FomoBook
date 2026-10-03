"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { DatePicker } from "@workspace/ui/components/date-picker"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Switch } from "@workspace/ui/components/switch"
import { Textarea } from "@workspace/ui/components/textarea"
import { toast } from "@workspace/ui/components/toast"
import { services } from "@/lib/data"

export function BookingSheet({
  children,
}: {
  children: React.ReactElement
}) {
  const [open, setOpen] = React.useState(false)
  const [checkIn, setCheckIn] = React.useState<Date | undefined>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpen(false)
    toast.add({
      title: "Booking created",
      description: checkIn
        ? `Check-in on ${checkIn.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}.`
        : "The reservation was saved as a draft.",
      type: "success",
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children} />
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>New booking</SheetTitle>
          <SheetDescription>
            Add a reservation for a guest. Confirmation is sent automatically.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 px-1">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="guest-name">Guest name</FieldLabel>
              <Input id="guest-name" placeholder="Full name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="guest-email">Email</FieldLabel>
              <Input
                id="guest-email"
                type="email"
                placeholder="guest@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Property</FieldLabel>
              <Select defaultValue={services[0]}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Check-in date</FieldLabel>
              <DatePicker value={checkIn} onChange={setCheckIn} className="w-full" />
            </Field>
            <Field>
              <FieldLabel htmlFor="guests">Guests</FieldLabel>
              <Input id="guests" type="number" min={1} max={12} defaultValue={2} />
            </Field>
            <Field orientation="horizontal">
              <Switch id="sms" defaultChecked />
              <FieldContent>
                <FieldLabel htmlFor="sms">SMS reminders</FieldLabel>
                <FieldDescription>
                  Send check-in reminders to the guest.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                id="notes"
                placeholder="Special requests, dietary needs…"
                rows={3}
              />
            </Field>
          </FieldGroup>
          <SheetFooter className="mt-auto px-0">
            <SheetClose render={<Button variant="outline" type="button" />}>
              Cancel
            </SheetClose>
            <Button type="submit">Confirm booking</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
