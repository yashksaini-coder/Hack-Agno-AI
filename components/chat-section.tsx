"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(`/api/chat?query=${encodeURIComponent(input)}`)
      if (!response.ok) {
        throw new Error("Failed to get chat response")
      }
      const data = await response.json()

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error in chat:", error)
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="terminal-title">/chat</h2>

      <div className="flex-grow overflow-auto mb-4">
        {messages.length === 0 ? (
          <div className="terminal-text">
            <p className="mb-2">Welcome to the Stock Market Chat Interface.</p>
            <p className="mb-2">You can ask questions about stocks, market trends, and investment strategies.</p>
            <p>Example questions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>What are the best performing stocks today?</li>
              <li>Should I invest in tech stocks right now?</li>
              <li>What is the outlook for renewable energy stocks?</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.role === "user" ? "text-terminal-green" : "text-terminal-cyan"}`}>
                <div className="flex items-start">
                  <span className="font-bold mr-2">{msg.role === "user" ? "You:" : "AI:"}</span>
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                </div>
                <div className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</div>
              </div>
            ))}
            {loading && (
              <div className="text-terminal-cyan flex items-center">
                <span className="font-bold mr-2">AI:</span>
                <span className="terminal-cursor"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center">
          <span className="text-terminal-cyan mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="terminal-input flex-grow"
            disabled={loading}
          />
          <button type="submit" className="terminal-button ml-2" disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatSection
