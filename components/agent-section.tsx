"use client"

import { useState } from "react"

const AgentSection: React.FC = () => {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/agent?query=${encodeURIComponent(query)}`)
      if (!res.ok) {
        throw new Error("Failed to get response from agent")
      }
      const data = await res.json()
      setResponse(data.response)
    } catch (err) {
      // setError("Error communicating with agent")
      console.error('Failed to fetch from /api/agent:',err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="terminal-title">/Agent</h2>

      <div className="flex-grow overflow-auto mb-4">
        {response ? (
          <div className="terminal-text whitespace-pre-wrap">{response}</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : loading ? (
          <div className="flex items-center">
            <span>Processing query</span>
            <span className="ml-2 terminal-cursor"></span>
          </div>
        ) : (
          <div className="terminal-text">
            <p className="mb-2">Welcome to the AI Agent Interface.</p>
            <p className="mb-2">This agent can help you with stock market analysis and recommendations.</p>
            <p>Example queries:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Analyze AAPL performance</li>
              <li>Compare MSFT and GOOGL</li>
              <li>Recommend tech stocks to buy</li>
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center">
          <span className="text-terminal-cyan mr-2">$</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            className="terminal-input flex-grow"
            disabled={loading}
          />
          <button type="submit" className="terminal-button ml-2" disabled={loading || !query.trim()}>
            Run
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgentSection
