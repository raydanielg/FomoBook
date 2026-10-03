export type BookingStatus = "confirmed" | "pending" | "cancelled"

export type Booking = {
  id: string
  guest: string
  email: string
  service: string
  checkIn: string
  nights: number
  amount: number
  status: BookingStatus
}

export const bookings: Booking[] = [
  { id: "BK-1024", guest: "Amina Juma", email: "amina@fomo.io", service: "Ocean Villa", checkIn: "Oct 12, 2026", nights: 4, amount: 1240, status: "confirmed" },
  { id: "BK-1025", guest: "Brian Ochieng", email: "b.ochieng@mail.com", service: "Safari Suite", checkIn: "Oct 14, 2026", nights: 3, amount: 890, status: "pending" },
  { id: "BK-1026", guest: "Chloe Dubois", email: "chloe.d@studio.fr", service: "City Loft", checkIn: "Oct 15, 2026", nights: 2, amount: 420, status: "confirmed" },
  { id: "BK-1027", guest: "David Mwale", email: "dmwale@corp.com", service: "Garden Bungalow", checkIn: "Oct 18, 2026", nights: 5, amount: 1150, status: "confirmed" },
  { id: "BK-1028", guest: "Elena Rossi", email: "elena@rossi.it", service: "Mountain Cabin", checkIn: "Oct 20, 2026", nights: 6, amount: 1680, status: "pending" },
  { id: "BK-1029", guest: "Farid Hassan", email: "farid.h@mail.com", service: "Ocean Villa", checkIn: "Oct 21, 2026", nights: 3, amount: 930, status: "cancelled" },
  { id: "BK-1030", guest: "Grace Njeri", email: "grace.n@mail.com", service: "Safari Suite", checkIn: "Oct 24, 2026", nights: 4, amount: 1120, status: "confirmed" },
  { id: "BK-1031", guest: "Hiro Tanaka", email: "hiro@tanaka.jp", service: "City Loft", checkIn: "Oct 26, 2026", nights: 2, amount: 460, status: "confirmed" },
  { id: "BK-1032", guest: "Ines Costa", email: "ines.c@mail.pt", service: "Garden Bungalow", checkIn: "Oct 28, 2026", nights: 7, amount: 1540, status: "pending" },
  { id: "BK-1033", guest: "Jamal Carter", email: "jcarter@mail.com", service: "Mountain Cabin", checkIn: "Nov 01, 2026", nights: 3, amount: 810, status: "confirmed" },
  { id: "BK-1034", guest: "Katarina Novak", email: "k.novak@mail.cz", service: "Ocean Villa", checkIn: "Nov 03, 2026", nights: 5, amount: 1550, status: "confirmed" },
  { id: "BK-1035", guest: "Luis Mendez", email: "lmendez@mail.mx", service: "Safari Suite", checkIn: "Nov 05, 2026", nights: 2, amount: 590, status: "cancelled" },
  { id: "BK-1036", guest: "Mara Olsen", email: "mara.o@mail.no", service: "City Loft", checkIn: "Nov 08, 2026", nights: 4, amount: 880, status: "pending" },
  { id: "BK-1037", guest: "Nadia Said", email: "n.said@mail.com", service: "Garden Bungalow", checkIn: "Nov 10, 2026", nights: 3, amount: 660, status: "confirmed" },
]

export const chartData = [
  { month: "Nov", bookings: 186, revenue: 32.4 },
  { month: "Dec", bookings: 214, revenue: 38.1 },
  { month: "Jan", bookings: 173, revenue: 30.2 },
  { month: "Feb", bookings: 242, revenue: 42.7 },
  { month: "Mar", bookings: 268, revenue: 47.3 },
  { month: "Apr", bookings: 231, revenue: 40.8 },
  { month: "May", bookings: 297, revenue: 52.6 },
  { month: "Jun", bookings: 324, revenue: 58.9 },
  { month: "Jul", bookings: 352, revenue: 63.4 },
  { month: "Aug", bookings: 311, revenue: 55.7 },
  { month: "Sep", bookings: 338, revenue: 61.2 },
  { month: "Oct", bookings: 376, revenue: 68.5 },
]

export const upcomingToday = [
  { name: "Amina Juma", detail: "Ocean Villa · Check-in 2:00 PM", initials: "AJ" },
  { name: "Chloe Dubois", detail: "City Loft · Check-in 3:30 PM", initials: "CD" },
  { name: "Hiro Tanaka", detail: "City Loft · Check-out 11:00 AM", initials: "HT" },
  { name: "Grace Njeri", detail: "Safari Suite · Spa 5:00 PM", initials: "GN" },
]

export const services = [
  "Ocean Villa",
  "Safari Suite",
  "City Loft",
  "Garden Bungalow",
  "Mountain Cabin",
]
