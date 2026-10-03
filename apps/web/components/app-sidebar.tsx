"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  AnalyticsUpIcon,
  BedDoubleIcon,
  Book02Icon,
  Calendar03Icon,
  CreditCardIcon,
  LayoutGridIcon,
  Logout03Icon,
  Notification03Icon,
  Settings02Icon,
  StarIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import { toast } from "@workspace/ui/components/toast"

const mainNav = [
  { title: "Dashboard", icon: LayoutGridIcon, active: true },
  { title: "Bookings", icon: Book02Icon, badge: "12" },
  { title: "Calendar", icon: Calendar03Icon },
  { title: "Guests", icon: UserGroupIcon },
  { title: "Properties", icon: BedDoubleIcon },
]

const insightNav = [
  { title: "Analytics", icon: AnalyticsUpIcon },
  { title: "Payments", icon: CreditCardIcon },
  { title: "Reviews", icon: StarIcon, badge: "4.9" },
]

const systemNav = [
  { title: "Notifications", icon: Notification03Icon, badge: "3" },
  { title: "Settings", icon: Settings02Icon },
]

function NavGroup({
  label,
  items,
}: {
  label: string
  items: { title: string; icon: typeof LayoutGridIcon; active?: boolean; badge?: string }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={item.active}
                tooltip={item.title}
                onClick={() =>
                  !item.active &&
                  toast.add({
                    title: item.title,
                    description: "This section is part of the demo navigation.",
                    type: "info",
                  })
                }
              >
                <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                <span>{item.title}</span>
              </SidebarMenuButton>
              {item.badge && (
                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="FomoBook">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HugeiconsIcon icon={Book02Icon} strokeWidth={2} className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">FomoBook</span>
                <span className="text-xs text-muted-foreground">Booking OS</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label="Manage" items={mainNav} />
        <NavGroup label="Insights" items={insightNav} />
        <NavGroup label="System" items={systemNav} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() =>
                toast.add({ title: "Signed out", type: "info" })
              }
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/15 text-xs text-primary-foreground">
                  EJ
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-0.5 leading-none">
                <span className="text-sm font-medium">Ezra John</span>
                <span className="text-xs text-muted-foreground">
                  ezra@fomobook.io
                </span>
              </div>
              <HugeiconsIcon
                icon={Logout03Icon}
                strokeWidth={2}
                className="text-muted-foreground"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
