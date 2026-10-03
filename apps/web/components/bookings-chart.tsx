"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { chartData } from "@/lib/data"

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue ($k)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function MetricChart({ dataKey }: { dataKey: "bookings" | "revenue" }) {
  return (
    <ChartContainer config={chartConfig} className="h-72 w-full">
      <AreaChart data={chartData} margin={{ left: 4, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="fillMetric" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={`var(--color-${dataKey})`}
              stopOpacity={0.35}
            />
            <stop
              offset="100%"
              stopColor={`var(--color-${dataKey})`}
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey={dataKey}
          type="natural"
          stroke={`var(--color-${dataKey})`}
          strokeWidth={2.5}
          fill="url(#fillMetric)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function BookingsChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <Tabs defaultValue="revenue">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              Trailing 12 months · updated 5 min ago
            </CardDescription>
          </div>
          <CardAction>
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TabsContent value="revenue">
            <MetricChart dataKey="revenue" />
          </TabsContent>
          <TabsContent value="bookings">
            <MetricChart dataKey="bookings" />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
