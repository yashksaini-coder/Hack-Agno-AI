import React from "react"
import { health } from "@/lib/types"

export const HealthSection = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [data, setData] = React.useState<health | null>(null)
  
  const fetchHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `${server}health`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch health data: ${response.statusText}`)
      }
      const data = await response.json()
      setData(data)
    } catch (err) {
      console.error("Error fetching health data:", err)
      setError("Failed to load health data")
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    fetchHealth()
  }, [])


  return (
    <div>
      <div className="terminal-text">
        {loading ? (
          <div className="flex items-center">
            <span>Checking system health</span>
            <span className="ml-2 terminal-cursor"></span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2 text-gray-400">System Status</td>
                  <td className="px-4 py-2">
                    <span className={`font-medium ${data?.status === "healthy" ? "text-green-500" : "text-red-500"}`}>
                      {data?.status}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2 text-gray-400">Uptime</td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-green-500">
                      {data?.uptime} ({data?.uptime_seconds}s)
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2 text-gray-400">API Status</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-3">
                      <span className={`px-2 py-1 rounded-md ${data?.api?.gemini_api ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        Gemini
                      </span>
                      <span className={`px-2 py-1 rounded-md ${data?.api?.groq_api ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        Groq
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-400">Last Checked</td>
                  <td className="px-4 py-2 text-gray-400">{data?.timestamp}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

