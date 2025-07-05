"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import { AssessmentForm } from "@/components/assessment-form"
import Link from "next/link"

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const totalSteps = 10
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Complete assessment and redirect to dashboard
      localStorage.setItem("assessmentData", JSON.stringify({ ...formData, ...data }))
      window.location.href = "/dashboard"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Build Your Roadmap</h1>
            <p className="text-gray-600 mb-6">Answer a few questions to get your personalized coding journey</p>
            <Progress value={progress} className="max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </motion.div>
        </div>

        {/* Assessment Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <AssessmentForm
                    step={currentStep}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    canGoBack={currentStep > 0}
                  />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
