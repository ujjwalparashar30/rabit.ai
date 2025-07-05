"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  const [assessmentData, setAssessmentData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("assessmentData")
    if (data) {
      setAssessmentData(JSON.parse(data))
    }
  }, [])

  if (!assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading your dashboard...</h2>
          <p className="text-gray-600">Please complete the assessment first.</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DashboardContent assessmentData={assessmentData} />
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  )
}
