"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Clock, TrendingUp, BookOpen, ExternalLink, CheckCircle, Circle } from "lucide-react"
import { GitHubInsights } from "@/components/github-insights"
import { ProgressChart } from "@/components/progress-chart"


// Example object to simulate backend response
const exampleAssessmentData = {
  track: "faang",
  timeline: "3months",
  skillLevel: "intermediate",
  timeCommitment: "10-20",
  roadmap: [
    { title: "Master Data Structures", completed: true, priority: "high" },
    { title: "Algorithm Patterns", completed: false, priority: "high" },
    { title: "System Design Basics", completed: false, priority: "medium" },
    { title: "Mock Interviews", completed: false, priority: "high" },
    { title: "Build Portfolio Projects", completed: false, priority: "high" },
    { title: "Learn Modern Frameworks", completed: false, priority: "medium" },
    { title: "Deploy Applications", completed: false, priority: "medium" },
    { title: "Open Source Contributions", completed: false, priority: "low" }
  ],
  githubInsights: {}, // Fill as needed for <GitHubInsights />
  progressChart: {}, // Fill as needed for <ProgressChart />
  recommendedResources: {
    youtube: ["NeetCode (DSA)", "Traversy Media (Web Dev)", "Tech With Tim (Python)"],
    openSource: ["Good First Issues", "Hacktoberfest Projects", "Beginner-friendly repos"],
    linkedin: ["Developer Communities", "Job Opportunities", "Networking Groups"]
  }
};

export function DashboardContent() {
  const assessmentData = exampleAssessmentData;
  const roadmapItems = assessmentData.roadmap;
  const completedItems = roadmapItems.filter((item) => item.completed).length;
  const progressPercentage = (completedItems / roadmapItems.length) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Coding Journey! 🚀</h1>
        <p className="text-gray-600">
          Based on your assessment, we have created a personalized roadmap for your{" "}
          <Badge variant="secondary" className="mx-1">
            {assessmentData.track === "faang" ? "FAANG" : assessmentData.track === "startup" ? "Startup" : "Balanced"}{" "}
            Track
          </Badge>
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Timeline</p>
                  <p className="text-2xl font-bold">{assessmentData.timeline || "3 months"}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Level</p>
                  <p className="text-2xl font-bold capitalize">{assessmentData.skillLevel}</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
                  <p className="text-2xl font-bold">{assessmentData.timeCommitment || "10-20"}</p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roadmap Progress */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Your Personalized Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">
                    {completedItems}/{roadmapItems.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="mb-6" />

                <div className="space-y-3">
                  {roadmapItems.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                        <span className={item.completed ? "line-through text-gray-500" : ""}>{item.title}</span>
                      </div>
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4">
                  View Full Roadmap
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <ProgressChart />
        </motion.div>
      </div>

      {/* GitHub Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <GitHubInsights />
      </motion.div>

      {/* Recommended Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Recommended Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">📺 YouTube Channels</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• NeetCode (DSA)</li>
                  <li>• Traversy Media (Web Dev)</li>
                  <li>• Tech With Tim (Python)</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🔗 Open Source</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Good First Issues</li>
                  <li>• Hacktoberfest Projects</li>
                  <li>• Beginner-friendly repos</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">💼 LinkedIn</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Developer Communities</li>
                  <li>• Job Opportunities</li>
                  <li>• Networking Groups</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
