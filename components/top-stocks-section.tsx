"use client"

import type React from "react"
import { useEffect, useState } from "react";
import { StockData } from "@/lib/types";

const TopStocksSection: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const server = process.env.NEXT_PUBLIC_SERVER_URL; 
  const fetchTopStocks = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `${server}top-stocks/`
        
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.statusText}`)
      }
      const data = await response.json()
      setStocks(data)
    } catch (err) {
      console.error("Error fetching stock data:", err)
      setError("Failed to load stock data")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTopStocks()
  }, [])

  return (
    <div>
      <h2 className="terminal-title">/top-stocks</h2>
      <div className="terminal-text">
        {loading ? (
          <div className="flex items-center">
            <span>Loading top stocks</span>
            <span className="ml-2 terminal-cursor"></span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="space-y-2">
            {stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="flex gap-2"><span>{index + 1}.</span>{stock.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>No top stocks data available</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopStocksSection
