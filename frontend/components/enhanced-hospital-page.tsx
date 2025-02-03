'use client'

import { useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarIcon, BedDoubleIcon, SearchIcon, PhoneIcon, ClockIcon, MapPinIcon } from "lucide-react"
import { AppointmentDialog } from './dashboard'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


export default function HospitalPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [appointmentId, setAppointmentId] = useState('')
  const [appointmentStatus, setAppointmentStatus] = useState('')
  const [appointments, setAppointments] = useState([{}])

  const handleSaveAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }])
  }

  const checkAppointment = () => {
    setAppointmentStatus(appointmentId ? 'Your appointment is confirmed.' : 'Please enter a valid appointment ID.')
  }
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const hId = searchParams.get('id');
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">City General Hospital</h1>
          <div className="flex items-center space-x-4">
            <Input 
              type="search" 
              placeholder="Search departments or services" 
              className="max-w-xs"
            />
            <Button size="icon" variant="ghost">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-lg overflow-hidden relative h-96">
          <Image
            src="data:image/jpeg;base64,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"
            alt="City General Hospital"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center justify-start">
            <div className="p-8 text-white max-w-lg">
              <h2 className="text-4xl font-bold mb-4">Welcome to City General Hospital</h2>
              <p className="text-lg">Providing compassionate care and cutting-edge medical services to our community since 1950.</p>
            </div>
          </div>
        </div>

        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">About City General Hospital</h3>
            <p className="mb-4">
              City General Hospital has been a cornerstone of healthcare in our community for over 70 years. 
              We are committed to delivering exceptional medical care with compassion and respect for all patients.
            </p>
            <p className="mb-4">
              Our state-of-the-art facilities and dedicated team of healthcare professionals ensure that you receive 
              the highest quality of care. From routine check-ups to complex surgeries, we're here to support your 
              health and well-being every step of the way.
            </p>
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <p>123 Hospital Street, Cityville, State 12345</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-red-50 border-red-200 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <PhoneIcon className="mr-2 h-6 w-6" />
                Emergency? Call Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-700">911</p>
              <p className="text-sm text-red-600">For immediate medical emergencies</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <ClockIcon className="mr-2 h-6 w-6" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-700">24/7 Emergency Services</p>
              <p className="text-sm text-blue-600">OPD: Mon-Sat, 9:00 AM - 5:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">How can we help you today?</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-6 w-6 text-primary" />
                Register for OPD
              </CardTitle>
              <CardDescription>Book an appointment with our specialists</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={()=>setIsDialogOpen(true)}>Book OPD Appointment</Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BedDoubleIcon className="mr-2 h-6 w-6 text-primary" />
                Book a Bed
              </CardTitle>
              <CardDescription>Reserve a bed for inpatient care</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={()=>router.push(`hospital/bedbooking?id=${hId}`)} className="w-full">
                Reserve Hospital Bed</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Check Appointment Status</CardTitle>
            <CardDescription>Enter your appointment ID to check its status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />
              <Button onClick={checkAppointment}>Check</Button>
            </div>
            {appointmentStatus && (
              <p className="mt-2 text-sm text-muted-foreground">{appointmentStatus}</p>
            )}
          </CardContent>
        </Card>
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