'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BedIcon, DollarSignIcon, CalendarIcon } from "lucide-react"

interface Bed {
  id: number;
  type: string;
  available: number;
  total: number;
  charge: number;
}

const beds: Bed[] = [
  { id: 1, type: "General Ward", available: 5, total: 20, charge: 100 },
  { id: 2, type: "Semi-Private Room", available: 3, total: 10, charge: 250 },
  { id: 3, type: "Private Room", available: 2, total: 5, charge: 500 },
  { id: 4, type: "ICU", available: 1, total: 8, charge: 1000 },
]

export default function BedAvailabilityPage() {
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null)
  const [bookingDate, setBookingDate] = useState<string>('')

  const handleBooking = (bedId: number) => {
    const bed = beds.find(bed => bed.id === bedId)
    if (bed) {
      setSelectedBed(bed)
    }
  }

  const confirmBooking = () => {
    if (selectedBed) {
      // Here you would typically send a request to your backend to confirm the booking
      alert(`Booking confirmed for ${selectedBed.type} on ${bookingDate}`)
      setSelectedBed(null)
      setBookingDate('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hospital Bed Availability</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map((bed) => (
          <Card key={bed.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BedIcon className="mr-2 h-6 w-6" />
                {bed.type}
              </CardTitle>
              <CardDescription>
                Available: {bed.available} / {bed.total}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSignIcon className="mr-2 h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold">${bed.charge}</span>
                </div>
                <span className="text-sm text-muted-foreground">per night</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleBooking(bed.id)}
                disabled={bed.available === 0}
              >
                {bed.available === 0 ? 'No Beds Available' : 'Book Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedBed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Book a Bed</CardTitle>
              <CardDescription>
                You are booking a {selectedBed.type} bed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Date of Admission</Label>
                    <div className="flex">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      <Input
                        id="date"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedBed(null)}>Cancel</Button>
              <Button onClick={confirmBooking} disabled={!bookingDate}>Confirm Booking</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}