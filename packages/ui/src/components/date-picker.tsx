"use client"

import * as React from "react"
import { format, startOfMonth, subDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "cn"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  CalendarRangeIcon,
} from "@hugeicons/core-free-icons"

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>()
  const date = value !== undefined ? value : internalDate

  const handleSelect = (next: Date | undefined) => {
    if (value === undefined) setInternalDate(next)
    onChange?.(next)
    if (next) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            variant="outline"
            className={cn(
              "w-56 justify-start font-normal",
              !date && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
        {date ? format(date, "PPP") : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}

const RANGE_PRESETS: { label: string; range: () => DateRange }[] = [
  {
    label: "Today",
    range: () => ({ from: new Date(), to: new Date() }),
  },
  {
    label: "Last 7 days",
    range: () => ({ from: subDays(new Date(), 6), to: new Date() }),
  },
  {
    label: "Last 30 days",
    range: () => ({ from: subDays(new Date(), 29), to: new Date() }),
  },
  {
    label: "This month",
    range: () => ({ from: startOfMonth(new Date()), to: new Date() }),
  },
]

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
  showPresets = true,
  disabled,
  className,
}: {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  numberOfMonths?: number
  showPresets?: boolean
  disabled?: boolean
  className?: string
}) {
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >()
  const range = value !== undefined ? value : internalRange

  const handleSelect = (next: DateRange | undefined) => {
    if (value === undefined) setInternalRange(next)
    onChange?.(next)
  }

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            variant="outline"
            className={cn(
              "w-64 justify-start font-normal",
              !range?.from && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <HugeiconsIcon icon={CalendarRangeIcon} strokeWidth={2} />
        {range?.from ? (
          range.to ? (
            <>
              {format(range.from, "LLL dd, y")} – {format(range.to, "LLL dd, y")}
            </>
          ) : (
            format(range.from, "LLL dd, y")
          )
        ) : (
          placeholder
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {showPresets && (
            <>
              <div className="flex flex-col gap-1 p-2">
                {RANGE_PRESETS.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handleSelect(preset.range())}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              <Separator orientation="vertical" />
            </>
          )}
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
