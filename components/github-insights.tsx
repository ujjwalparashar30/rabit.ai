"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  bio: string
}

interface Repository {
  name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  html_url: string
}

export function GitHubInsights() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchGitHubData = async () => {
    if (!username.trim()) return

    setLoading(true)
    setError("")

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) throw new Error("User not found")
      const userData = await userResponse.json()
      setUser(userData)

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
      const reposData = await reposResponse.json()
      setRepos(reposData)
    } catch (err) {
      setError("Failed to fetch GitHub data. Please check the username.")
      setUser(null)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  const suggestedRepos = [
    {
      name: "first-contributions",
      description: "Help beginners to contribute to open source projects",
      language: "JavaScript",
      stars: 35000,
      url: "https://github.com/firstcontributions/first-contributions",
    },
    {
      name: "awesome-for-beginners",
      description: "A list of awesome beginners-friendly projects",
      language: "Markdown",
      stars: 45000,
      url: "https://github.com/MunGell/awesome-for-beginners",
    },
    {
      name: "coding-interview-university",
      description: "A complete computer science study plan",
      language: "Python",
      stars: 250000,
      url: "https://github.com/jwasham/coding-interview-university",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="mr-2 h-5 w-5" />
          GitHub Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* GitHub Username Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchGitHubData()}
            />
            <Button onClick={fetchGitHubData} disabled={loading}>
              {loading ? "Loading..." : "Analyze"}
            </Button>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          {/* User Profile */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <img src={user.avatar_url || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user.name || user.login}</h3>
                <p className="text-gray-600 text-sm">{user.bio}</p>
                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                  <span>{user.public_repos} repos</span>
                  <span>{user.followers} followers</span>
                  <span>{user.following} following</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* User Repositories */}
          {repos.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Top Repositories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-blue-600">{repo.name}</h5>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        {repo.language && (
                          <Badge variant="outline" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center">
                          <GitFork className="h-3 w-3 mr-1" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Repositories */}
          <div>
            <h4 className="font-semibold mb-3">Suggested for Beginners</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedRepos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-green-600">{repo.name}</h5>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{repo.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {repo.stars.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
