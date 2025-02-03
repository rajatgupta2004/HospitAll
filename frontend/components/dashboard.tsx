'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Home, Search, Settings, User, Bell, BookOpen, Phone, ChevronLeft, ChevronRight, Plus, X, AlertTriangle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for hospitals
const hospitals = [
  { id: 1, name: "City General Hospital", beds: 50, waitTime: "30 min", rating: 4.5 },
  { id: 2, name: "Central Medical Center", beds: 30, waitTime: "45 min", rating: 4.2 },
  { id: 3, name: "Riverside Health Institute", beds: 40, waitTime: "20 min", rating: 4.8 },
  { id: 4, name: "Sunshine Community Hospital", beds: 25, waitTime: "1 hour", rating: 3.9 },
  { id: 5, name: "Metropolitan Care Center", beds: 60, waitTime: "15 min", rating: 4.6 },
  { id: 6, name: "Greenview Medical Complex", beds: 35, waitTime: "40 min", rating: 4.3 },
  { id: 7, name: "Harmony Health Hub", beds: 45, waitTime: "25 min", rating: 4.7 },
  { id: 8, name: "Lakeside Wellness Clinic", beds: 20, waitTime: "50 min", rating: 4.1 },
  { id: 9, name: "Unity Medical Plaza", beds: 55, waitTime: "35 min", rating: 4.4 },
  { id: 10, name: "Serenity Health Center", beds: 30, waitTime: "55 min", rating: 4.0 },
]

// Mock data for appointments
const initialAppointments = [
  { id: 1, date: new Date(2023, 5, 15), title: "Annual Checkup", doctor: "Dr. Smith", hospital: "City General Hospital", status: "confirmed" },
  { id: 2, date: new Date(2023, 5, 18), title: "Dental Cleaning", doctor: "Dr. Johnson", hospital: "Central Medical Center", status: "pending" },
  { id: 3, date: new Date(2023, 5, 22), title: "Eye Exam", doctor: "Dr. Lee", hospital: "Riverside Health Institute", status: "confirmed" },
]

function SimpleCalendar({ appointments, onDateClick }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i + 1)

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Appointments</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold">{day}</div>
          ))}
          {previousMonthDays.map(day => (
            <div key={`prev-${day}`} className="text-gray-400">{day}</div>
          ))}
          {days.map(day => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const hasAppointment = appointments.some(apt => apt.date.toDateString() === date.toDateString())
            return (
              <div 
                key={day} 
                className={`p-2 cursor-pointer ${hasAppointment ? 'bg-blue-100 text-blue-600 font-bold rounded-full' : ''}`}
                onClick={() => onDateClick(date)}
              >
                {day}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function AppointmentDialog({ isOpen, onClose, date, onSave }) {
  const [title, setTitle] = useState('')
  const [doctor, setDoctor] = useState('')
  const [hospital, setHospital] = useState('')

  const handleSave = () => {
    onSave({ date, title, doctor, hospital, status: 'pending' })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment for {date?.toDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doctor" className="text-right">
              Doctor
            </Label>
            <Input
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hospital" className="text-right">
              Hospital
            </Label>
            <Select onValueChange={setHospital} defaultValue={hospital}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((h) => (
                  <SelectItem key={h.id} value={h.name}>
                    {h.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function HospitalCard({ hospital }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hospital.name}</CardTitle>
        <CardDescription>Available Beds: {hospital.beds}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">Wait Time: {hospital.waitTime}</Badge>
          <div className="flex items-center">
            <span className="mr-1">{hospital.rating}</span>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
        </div>
        <Progress value={hospital.beds} max={100} className="w-full" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link href={`/hospital?id=${hospital.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [appointments, setAppointments] = useState(initialAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your appointment is confirmed for tomorrow", type: "success" },
    { id: 2, message: "Please complete your health questionnaire", type: "warning" },
  ])

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleSaveAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }])
  }

  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">MediBook</h1>
        </div>
        <nav className="mt-6">
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600">
            <Home className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600">
            <Calendar className="inline-block mr-2" size={20} />
            Appointments
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600">
            <User className="inline-block mr-2" size={20} />
            Profile
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600">
            <Settings className="inline-block mr-2" size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, John</h2>
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600 transform translate-x-1/2 -translate-y-1/2"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4">
                      {notification.type === 'success' ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                      )}
                      <p className="text-sm">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointments[0]?.title || "None"}</div>
                  <p className="text-xs text-muted-foreground">
                    {appointments[0]?.date.toDateString() || "No upcoming appointments"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Good</div>
                  <Progress value={progress} className="w-full mt-2" />
                </CardContent>
              </Card>
            </div>
            <SimpleCalendar appointments={appointments} onDateClick={handleDateClick} />
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Appointment
                  </Button>
                  <Button className="w-full" variant="outline">
                    <User className="mr-2 h-4 w-4" /> View Health Records
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Contact Support
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                      <div>
                        <h3 className="font-semibold">{appointment.title}</h3>
                        <p className="text-sm text-gray-500">{appointment.date.toDateString()}</p>
                        <p className="text-sm text-gray-500">{appointment.doctor} - {appointment.hospital}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Appointment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="hospitals" className="space-y-4">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search for hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <AppointmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        date={selectedDate}
        onSave={handleSaveAppointment}
      />
    </div>
  )
}