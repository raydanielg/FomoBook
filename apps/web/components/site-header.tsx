"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AnalyticsUpIcon,
  Book02Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  ComputerIcon,
  CreditCardIcon,
  Moon02Icon,
  Notification03Icon,
  PlusSignIcon,
  Search01Icon,
  Settings02Icon,
  Sun03Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { toast } from "@workspace/ui/components/toast"

const notifications = [
  {
    icon: Book02Icon,
    title: "New booking received",
    detail: "Ocean Villa · 4 nights · Amina Juma",
    unread: true,
  },
  {
    icon: CreditCardIcon,
    title: "Payment settled",
    detail: "$1,240.00 from BK-1024",
    unread: true,
  },
  {
    icon: UserGroupIcon,
    title: "Guest checked in",
    detail: "Hiro Tanaka · City Loft",
    unread: false,
  },
]

function SearchCommand() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const runCommand = (name: string) => {
    setOpen(false)
    toast.add({ title: name, description: "Demo action executed.", type: "success" })
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-40 justify-between text-muted-foreground md:w-56"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
          Search…
        </span>
        <KbdGroup>
          <Kbd>⌘K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search bookings, guests, actions…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand("New booking")}>
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              New booking
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand("Open calendar")}>
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
              Open calendar
            </CommandItem>
            <CommandItem onSelect={() => runCommand("View analytics")}>
              <HugeiconsIcon icon={AnalyticsUpIcon} strokeWidth={2} />
              View analytics
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bookings">
            <CommandItem onSelect={() => runCommand("BK-1024 · Amina Juma")}>
              <HugeiconsIcon icon={Book02Icon} strokeWidth={2} />
              BK-1024 · Amina Juma
            </CommandItem>
            <CommandItem onSelect={() => runCommand("BK-1030 · Grace Njeri")}>
              <HugeiconsIcon icon={Book02Icon} strokeWidth={2} />
              BK-1030 · Grace Njeri
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand("Property settings")}>
              <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
              Property settings
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

function NotificationsMenu() {
  const unread = notifications.filter((n) => n.unread).length
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="Notifications" />}
      >
        <span className="relative">
          <HugeiconsIcon icon={Notification03Icon} strokeWidth={2} />
          <Badge className="absolute -top-2 -end-2 size-4 justify-center rounded-full p-0 text-[0.6rem]">
            {unread}
          </Badge>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {notifications.map((item) => (
            <DropdownMenuItem
              key={item.title}
              className="flex items-start gap-3 py-2"
              onClick={() =>
                toast.add({ title: item.title, type: "info" })
              }
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                <HugeiconsIcon icon={item.icon} strokeWidth={2} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium">{item.title}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {item.detail}
                </span>
              </span>
              {item.unread && (
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-center text-muted-foreground"
          onClick={() =>
            toast.add({ title: "All notifications marked as read", type: "success" })
          }
        >
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="Toggle theme" />}
      >
        {mounted && theme === "dark" ? (
          <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} />
        ) : (
          <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as string)}
        >
          <DropdownMenuRadioItem value="light">
            <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="Account" />}
      >
        <Avatar className="size-7">
          <AvatarImage src="https://api.dicebear.com/9.x/thumbs/svg?seed=Ezra" />
          <AvatarFallback className="bg-primary/15 text-[0.65rem] text-primary-foreground">
            EJ
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex flex-col">
              <span>Ezra John</span>
              <span className="text-xs font-normal text-muted-foreground">
                ezra@fomobook.io
              </span>
            </span>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => toast.add({ title: "Profile", type: "info" })}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.add({ title: "Billing", type: "info" })}>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.add({ title: "Settings", type: "info" })}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.add({ title: "Signed out", type: "info" })}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ms-1" />
      <Separator orientation="vertical" className="mx-1 h-5!" />
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href="#" />}>FomoBook</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ms-auto flex items-center gap-1.5">
        <SearchCommand />
        <NotificationsMenu />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
