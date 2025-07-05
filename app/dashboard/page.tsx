"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"

// Types defined in the same file
interface GitHubInsights {
  totalRepositories: number;
  languageDistribution: Record<string, number>;
  contributionStreak: number;
  topRepositories: string[];
  recentActivity: string[];
  skillsFromRepos: string[];
}

interface ProgressChart {
  totalWeeks: number;
  weeklyHours: number;
  completedHours: number;
  targetHours: number;
  weeklyProgress: Array<{
    week: number;
    planned: number;
    actual: number;
  }>;
}

interface RoadmapItem {
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface RecommendedResources {
  youtube: string[];
  openSource: string[];
  linkedin: string[];
}

interface AssessmentData {
  track: string;
  timeline: string;
  skillLevel: string;
  timeCommitment: string;
  roadmap: RoadmapItem[];
  githubInsights: GitHubInsights;
  progressChart: ProgressChart;
  recommendedResources: RecommendedResources;
}

export default function DashboardPage() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("assessmentData")
    if (data) {
      try {
        const parsedData = JSON.parse(data) as AssessmentData
        setAssessmentData(parsedData)
      } catch (error) {
        console.error("Failed to parse assessment data:", error)
      }
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <DashboardContent  />
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  )
}
