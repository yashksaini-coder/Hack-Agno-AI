"use client"

import type React from "react";
import { useEffect, useState } from "react";
import { StockAnalysisData } from "@/lib/types";
import { Search } from "lucide-react";

const StockAnalysisSection: React.FC = () => {
  const [analysis, setAnalysis] = useState<StockAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const stockList = ["MSFT", "AAPL", "GOOGL", "AMZN", "META", "TSLA", "NVDA"];
  const [ticker, setTicker] = useState(stockList[Math.floor(Math.random() * stockList.length)]);

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchAnalysisStockData = async (symbol: string) => {
    setLoading(true)
    setError(null)
    try {
      const url = `${server}stock-analysis/${symbol}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.statusText}`)
      }
      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      console.error("Error fetching stock data:", err)
      setError("Failed to load stock data")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticker) {
      fetchAnalysisStockData(ticker)
    }
  }

  useEffect(() => {
    fetchAnalysisStockData(ticker)
  }, [])

  return (
    <div>
      <h2 className="terminal-title">/stock-analysis</h2>
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
          <Search />
        </button>
      </div>
    </form>

      
      <div className="terminal-text">
        {loading ? (
          <div className="flex items-center">
            <span>Loading analysis</span>
            <span className="ml-2 terminal-cursor"></span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : analysis ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Symbol:</span>
              <span>{analysis.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Company:</span>
              <span>{analysis.company_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Price:</span>
              <span>${analysis.current_price}</span>
            </div>
            <div className="flex justify-between">
              <span>Market Cap:</span>
              <span>${(analysis.market_cap / 1e9).toFixed(2)}B</span>
            </div>
            {/* Financial Ratios */}
            <div className="mt-4 font-bold">Financial Ratios</div>
            <div className="flex justify-between">
              <span>PE Ratio:</span>
              <span>{analysis.financial_ratios.pe_ratio}</span>
            </div>
            <div className="flex justify-between">
              <span>PB Ratio:</span>
              <span>{analysis.financial_ratios.pb_ratio}</span>
            </div>
            <div className="flex justify-between">
              <span>EV/EBITDA:</span>
              <span>{analysis.financial_ratios.ev_ebitda}</span>
            </div>
            <div className="flex justify-between">
              <span>ROE:</span>
              <span>{analysis.financial_ratios.roe}%</span>
            </div>
            <div className="flex justify-between">
              <span>ROA:</span>
              <span>{analysis.financial_ratios.roa}%</span>
            </div>
            <div className="flex justify-between">
              <span>Operating Margin:</span>
              <span>{analysis.financial_ratios.operating_margin}%</span>
            </div>
            <div className="flex justify-between">
              <span>Net Margin:</span>
              <span>{analysis.financial_ratios.net_margin}%</span>
            </div>

            {/* Financial Health */}
            <div className="mt-4 font-bold">Financial Health</div>
            <div className="flex justify-between">
              <span>Debt to Equity:</span>
              <span>{analysis.financial_health.debt_to_equity}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Ratio:</span>
              <span>{analysis.financial_health.current_ratio}</span>
            </div>

            {/* Per Share Metrics */}
            <div className="mt-4 font-bold">Per Share Metrics</div>
            <div className="flex justify-between">
              <span>EPS:</span>
              <span>${analysis.per_share_metrics?.eps}</span>
            </div>
            <div className="flex justify-between">
              <span>Book Value:</span>
              <span>${analysis.per_share_metrics?.book_value}</span>
            </div>
          </div>
        ) : (
          <div>No analysis data available</div>
        )}
      </div>
    </div>
  )
}

export default StockAnalysisSection
