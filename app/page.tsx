"use client"

import React, { useState, useRef, useEffect } from "react"
import { MapPin, Moon, Sun, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export default function HometownGPTHomepage() {
  /** ──────────── local state ──────────── */
  const [question, setQuestion] = useState("")
  const [radius, setRadius] = useState("25")
  const [messages, setMessages] = useState<
    { q: string; a: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  /** auto-scroll on new answer */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  /** theme toggle */
  const toggleTheme = () =>
    document.documentElement.classList.toggle("dark")

  /** ask GPT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    const q = question
    setQuestion("")
    setIsLoading(true)

    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, radius }),
      })
      const data = await r.json()
      setMessages((prev) => [...prev, { q, a: data.answer }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { q, a: "Sorry, something went wrong." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen dark:bg-[#0b0f19]">
      {/* ─────────── Sidebar placeholder ─────────── */}
      <aside className="hidden md:flex w-64 flex-col border-r dark:border-slate-800 p-4 gap-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          History&nbsp;🚧
        </h2>
        <p className="text-xs text-slate-500">
          (Coming soon)
        </p>
      </aside>

      {/* ─────────── Main panel ─────────── */}
      <section className="flex flex-1 flex-col">

        {/* sticky header */}
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b bg-white/80 backdrop-blur-md px-6 py-3 dark:bg-[#0b0f19]/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-sky-600 rounded-xl">
              <MapPin className="h-5 w-5 text-white" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              HometownGPT
            </h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>
        </header>

        {/* chat scroll area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((m, i) => (
            <Card
              key={i}
              className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow"
            >
              <CardContent className="px-5 py-4 space-y-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <strong>You asked:</strong> {m.q}
                </p>
                <p className="whitespace-pre-line text-slate-800 dark:text-slate-100">
                  {m.a}
                </p>
              </CardContent>
            </Card>
          ))}

          {isLoading && (
            <p className="text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" /> Thinking…
            </p>
          )}

          {/* dummy div for auto-scroll */}
          <div ref={bottomRef} />
        </div>

        {/* input dock */}
        <footer className="border-t dark:border-slate-800 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Ask about San Jose…"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              autoComplete="off"
              className="flex-1"
            />

            <Select
              value={radius}
              onValueChange={setRadius}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 mi</SelectItem>
                <SelectItem value="5">5 mi</SelectItem>
                <SelectItem value="10">10 mi</SelectItem>
                <SelectItem value="25">25 mi</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              disabled={isLoading || !question.trim()}
            >
              Ask
            </Button>
          </form>
        </footer>
      </section>
    </div>
  )
}