"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, MessageSquare, Loader2 } from "lucide-react"

export default function HometownGPTHomepage() {
  const [question, setQuestion] = useState("")
  const [radius, setRadius] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !radius) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResponse(
        `Based on your question "${question}" within ${radius} miles, here's what I found: There are several local events and activities happening in your area this weekend. This includes farmers markets, community festivals, and outdoor activities. I'd recommend checking out the downtown area for live music and food trucks on Saturday evening.`,
      )
      setIsLoading(false)
    }, 2500)
  }

  return (
    <div className="h-screen flex flex-col justify-center bg-gradient-to-b from-sky-50 to-white">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-0 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-2">
          {/* Desktop: Icon left of title, Mobile: Icon above title */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2">
            <div className="p-3 bg-sky-600 rounded-2xl shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">HometownGPT</h1>
          </div>

          <p className="text-lg md:text-xl text-slate-600 font-light mb-2 leading-relaxed">Ask your city anything.</p>

          {/* Dynamic Fact/Stat */}
          <div className="inline-block bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl px-6 py-4 shadow-sm">
            <p className="text-lg font-semibold text-slate-700 flex items-center justify-center gap-2">
              <span className="text-2xl">🚧</span>7 road closures this weekend in San Jose. Ask what affects your area.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Question Input */}
              <div className="space-y-3 mb-2">
                <Label htmlFor="question" className="text-slate-700 font-medium text-lg">
                  What would you like to know?
                </Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="What's happening in my area this weekend?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="text-lg py-4 px-4 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl"
                />
              </div>

              {/* Radius Selection */}
              <div className="space-y-3 mb-2">
                <Label htmlFor="radius" className="text-slate-700 font-medium text-lg">
                  Search radius
                </Label>
                <Select value={radius} onValueChange={setRadius}>
                  <SelectTrigger className="py-4 px-4 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl text-lg">
                    <SelectValue placeholder="Select radius in miles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 mile</SelectItem>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="25">25 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Try asking examples */}
              <div className="text-center space-y-2 mb-4">
                <p className="text-xs font-medium text-slate-600">Try asking:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs border border-slate-200">
                    "What roads are closed near me?"
                  </span>
                  <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs border border-slate-200">
                    "Any free events this weekend?"
                  </span>
                  <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs border border-slate-200">
                    "Crime stats in my neighborhood?"
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={!question.trim() || !radius || isLoading}
                  className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white py-4 px-12 text-lg font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none shadow-lg hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Thinking...
                    </div>
                  ) : (
                    "Ask HometownGPT"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Large Response Container */}
        <Card
          className={`shadow-lg border-0 bg-slate-100 transition-all duration-500 ${response ? "opacity-100 translate-y-0" : "opacity-100"}`}
        >
          <CardContent className="p-2 md:p-3">
            <div className="min-h-[40px] flex items-center justify-center">
              {response ? (
                <div
                  className={`w-full transition-all duration-500 ${response ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-100 rounded-xl flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Here's what I found:</h3>
                      <p className="text-slate-700 leading-relaxed text-lg">{response}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 text-lg font-light text-center font-medium">
                  Your AI-powered local answer will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
