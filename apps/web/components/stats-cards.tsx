import { HugeiconsIcon } from "@hugeicons/react"
import {
  AnalyticsUpIcon,
  AnalyticsDownIcon,
  Book02Icon,
  BedDoubleIcon,
  UserGroupIcon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@workspace/ui/components/card"

const stats = [
  {
    label: "Total bookings",
    value: "3,312",
    delta: "+12.5%",
    trend: "up" as const,
    note: "vs last month",
    icon: Book02Icon,
  },
  {
    label: "Revenue",
    value: "$68.5k",
    delta: "+8.2%",
    trend: "up" as const,
    note: "vs last month",
    icon: Wallet02Icon,
  },
  {
    label: "Active guests",
    value: "342",
    delta: "-2.4%",
    trend: "down" as const,
    note: "vs last month",
    icon: UserGroupIcon,
  },
  {
    label: "Occupancy",
    value: "87%",
    delta: "+4.1%",
    trend: "up" as const,
    note: "vs last month",
    icon: BedDoubleIcon,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon
                icon={stat.icon}
                strokeWidth={2}
                className="size-4"
              />
              {stat.label}
            </CardDescription>
            <CardAction>
              <Badge
                variant={stat.trend === "up" ? "secondary" : "outline"}
                className={
                  stat.trend === "up"
                    ? "bg-primary/15 text-primary-foreground dark:bg-primary/20"
                    : "text-muted-foreground"
                }
              >
                <HugeiconsIcon
                  icon={
                    stat.trend === "up" ? AnalyticsUpIcon : AnalyticsDownIcon
                  }
                  strokeWidth={2}
                />
                {stat.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">
              {stat.value}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
