"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function ProgressChart() {
  // Mock data for progress visualization
  const progressData = [
    { week: "Week 1", completed: 2, target: 3 },
    { week: "Week 2", completed: 4, target: 6 },
    { week: "Week 3", completed: 7, target: 9 },
    { week: "Week 4", completed: 8, target: 12 },
  ]

  // const maxValue = Math.max(...progressData.map((d) => Math.max(d.completed, d.target)))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progressData.map((data, index) => (
            <div key={data.week} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{data.week}</span>
                <span className="text-gray-600">
                  {data.completed}/{data.target} tasks
                </span>
              </div>
              <div className="relative">
                {/* Target bar (background) */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(data.completed / data.target) * 100}%`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>
                {/* Completion percentage */}
                <div className="absolute right-0 top-4 text-xs text-gray-500">
                  {Math.round((data.completed / data.target) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Overall Progress</p>
              <p className="text-2xl font-bold text-blue-600">67%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">21/32 tasks completed</p>
              <p className="text-xs text-blue-600">Keep up the great work! 🎉</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
