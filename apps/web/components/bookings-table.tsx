"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Copy01Icon,
  EyeIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
} from "@workspace/ui/components/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { toast } from "@workspace/ui/components/toast"
import { bookings, type Booking, type BookingStatus } from "@/lib/data"

const statusVariant: Record<BookingStatus, "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
}

const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "guest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7">
          <AvatarImage
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${row.original.guest}`}
          />
          <AvatarFallback className="bg-muted text-[0.6rem]">
            {row.original.guest
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{row.original.guest}</span>
          <span className="truncate text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "checkIn",
    header: "Check-in",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        ${row.original.amount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Booking actions" />
          }
        >
          <HugeiconsIcon icon={MoreVerticalIcon} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              toast.add({
                title: row.original.id,
                description: `Viewing ${row.original.guest}'s booking.`,
                type: "info",
              })
            }
          >
            <HugeiconsIcon icon={EyeIcon} strokeWidth={2} />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard?.writeText(row.original.id)
              toast.add({
                title: "Copied",
                description: `${row.original.id} copied to clipboard.`,
                type: "success",
              })
            }}
          >
            <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            Copy booking ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              toast.add({
                title: "Booking cancelled",
                description: `${row.original.id} was cancelled.`,
                type: "error",
              })
            }
          >
            Cancel booking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function BookingsTable({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Recent bookings</CardTitle>
          <CardDescription>
            {bookings.length} reservations this quarter
          </CardDescription>
        </div>
        <CardAction>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={bookings}
          searchKey="guest"
          searchPlaceholder="Search guests…"
          pageSize={7}
        />
      </CardContent>
    </Card>
  )
}
