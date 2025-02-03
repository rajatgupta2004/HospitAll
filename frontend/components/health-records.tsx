'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, SearchIcon, ActivityIcon, HeartPulseIcon, ScaleIcon, PillIcon, EditIcon } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Mock data - in a real app, this would come from an API
const initialHealthMetrics = [
  { date: '2023-01', weight: 70, bloodPressure: 120, cholesterol: 180 },
  { date: '2023-02', weight: 69, bloodPressure: 118, cholesterol: 175 },
  { date: '2023-03', weight: 68, bloodPressure: 115, cholesterol: 172 },
  { date: '2023-04', weight: 68, bloodPressure: 117, cholesterol: 170 },
  { date: '2023-05', weight: 67, bloodPressure: 116, cholesterol: 168 },
]

const recentVisits = [
  { date: '2023-05-15', doctor: 'Dr. Smith', reason: 'Annual Check-up' },
  { date: '2023-04-02', doctor: 'Dr. Johnson', reason: 'Flu Symptoms' },
  { date: '2023-03-10', doctor: 'Dr. Williams', reason: 'Vaccination' },
]

const upcomingAppointments = [
  { date: '2023-06-20', time: '10:00 AM', doctor: 'Dr. Brown', reason: 'Follow-up' },
  { date: '2023-07-05', time: '2:30 PM', doctor: 'Dr. Davis', reason: 'Dental Check-up' },
]

export function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [healthMetrics, setHealthMetrics] = useState(initialHealthMetrics)
  const [editMetric, setEditMetric] = useState({ type: '', value: 0 })

  const filteredVisits = recentVisits.filter(visit => 
    visit.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.reason.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMetricEdit = (type: string, value: number) => {
    setEditMetric({ type, value })
  }

  const saveMetricEdit = () => {
    const updatedMetrics = [...healthMetrics]
    updatedMetrics[updatedMetrics.length - 1][editMetric.type] = editMetric.value
    setHealthMetrics(updatedMetrics)
    setEditMetric({ type: '', value: 0 })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Health Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weight
            </CardTitle>
            <ScaleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{healthMetrics[healthMetrics.length - 1].weight} kg</div>
                <p className="text-xs text-muted-foreground">
                  {healthMetrics[healthMetrics.length - 1].weight < healthMetrics[healthMetrics.length - 2].weight ? 'Decreased' : 'Increased'} since last month
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleMetricEdit('weight', healthMetrics[healthMetrics.length - 1].weight)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Weight</DialogTitle>
                    <DialogDescription>Enter your current weight in kg.</DialogDescription>
                  </DialogHeader>
                  <Input 
                    type="number" 
                    value={editMetric.value} 
                    onChange={(e) => setEditMetric({ ...editMetric, value: parseFloat(e.target.value) })} 
                  />
                  <DialogFooter>
                    <Button onClick={saveMetricEdit}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blood Pressure
            </CardTitle>
            <HeartPulseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{healthMetrics[healthMetrics.length - 1].bloodPressure} mmHg</div>
                <p className="text-xs text-muted-foreground">
                  {healthMetrics[healthMetrics.length - 1].bloodPressure < healthMetrics[healthMetrics.length - 2].bloodPressure ? 'Decreased' : 'Increased'} since last month
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleMetricEdit('bloodPressure', healthMetrics[healthMetrics.length - 1].bloodPressure)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Blood Pressure</DialogTitle>
                    <DialogDescription>Enter your current blood pressure in mmHg.</DialogDescription>
                  </DialogHeader>
                  <Input 
                    type="number" 
                    value={editMetric.value} 
                    onChange={(e) => setEditMetric({ ...editMetric, value: parseFloat(e.target.value) })} 
                  />
                  <DialogFooter>
                    <Button onClick={saveMetricEdit}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cholesterol
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{healthMetrics[healthMetrics.length - 1].cholesterol} mg/dL</div>
                <p className="text-xs text-muted-foreground">
                  {healthMetrics[healthMetrics.length - 1].cholesterol < healthMetrics[healthMetrics.length - 2].cholesterol ? 'Decreased' : 'Increased'} since last month
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleMetricEdit('cholesterol', healthMetrics[healthMetrics.length - 1].cholesterol)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Cholesterol</DialogTitle>
                    <DialogDescription>Enter your current cholesterol level in mg/dL.</DialogDescription>
                  </DialogHeader>
                  <Input 
                    type="number" 
                    value={editMetric.value} 
                    onChange={(e) => setEditMetric({ ...editMetric, value: parseFloat(e.target.value) })} 
                  />
                  <DialogFooter>
                    <Button onClick={saveMetricEdit}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
          <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
          <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics Over Time</CardTitle>
              <CardDescription>
                Visualize your health trends over the past months
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="cholesterol" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Doctor Visits</CardTitle>
              <CardDescription>
                Search and view your recent medical appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search visits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredVisits.map((visit, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="font-semibold">{visit.date}</div>
                  <div>{visit.doctor}</div>
                  <div className="text-sm text-muted-foreground">{visit.reason}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                View and manage your scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{appointment.date} at {appointment.time}</div>
                    <div>{appointment.doctor}</div>
                    <div className="text-sm text-muted-foreground">{appointment.reason}</div>
                  </div>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Reschedule
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}