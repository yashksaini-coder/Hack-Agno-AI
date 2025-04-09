"use client";
import { useState, useEffect } from "react";
import { StockData } from "@/lib/types";
import { list } from "postcss";

const StockSection: React.FC = () => {
  const stockList = ["MSFT", "AAPL", "GOOGL", "AMZN", "META", "TSLA", "NVDA"];
  const [ticker, setTicker] = useState(stockList[Math.floor(Math.random() * stockList.length)]);
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const server = process.env.NEXT_PUBLIC_SERVER_URL; 
  const fetchStockData = async (symbol: string) => {
    setLoading(true)
    setError(null)
    try {
      const url = `${server}stock/${symbol}`
        
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.statusText}`)
      }
      const data = await response.json()
      setStockData(data)
    } catch (err) {
      console.error("Error fetching stock data:", err)
      setError("Failed to load stock data")
    } finally {
      setLoading(false)
    }
  }
  


useEffect(() => {
  fetchStockData(ticker)
}, [])

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (ticker) {
    fetchStockData(ticker)
  }
}

return (
  <div>
    <h2 className="terminal-title">/Stock</h2>

    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-terminal-cyan">$</span>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter ticker symbol (e.g. AAPL)"
          className="terminal-input flex-grow bg-transparent border border-terminal-green px-2 py-1"
        />
        <button
          type="submit"
          className="terminal-button border border-terminal-green px-3 py-1 hover:bg-terminal-green hover:text-black transition-colors"
          disabled={loading}
        >
          GET
        </button>
      </div>
    </form>

    <div className="terminal-text">
      {loading ? (
        <div className="flex items-center">
          <span>Loading stock data</span>
          <span className="ml-2 terminal-cursor"></span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : stockData ? (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Symbol:</span>
            <span>{stockData.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Name:</span>
            <span>{stockData.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Price:</span>
            <span>${stockData.currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Previous Close:</span>
            <span>${stockData.previousClose.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sector:</span>
            <span>{stockData.sector}</span>
          </div>
          <div className="flex justify-between">
            <span>Change:</span>
            <span className={stockData.currentPrice >= stockData.previousClose ? "text-green-500" : "text-red-500"}>
              {stockData.currentPrice >= stockData.previousClose ? "+" : ""}
              {((stockData.currentPrice - stockData.previousClose) / stockData.previousClose * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      ) : (
        <div>No stock data available</div>
      )}
    </div>
  </div>
)
}

export default StockSection
