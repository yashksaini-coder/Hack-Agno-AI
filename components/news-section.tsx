"use client"

import type React from "react";
import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${server}stock-news`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch stock data: ${response.json()}`)
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        setError("Error fetching news data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])
  console.log("News data:", news);

  return (
    <div>
      <h2 className="terminal-title">/News</h2>
      <div className="terminal-text">
        {loading ? (
          <div className="flex items-center">
            <span>Loading news</span>
            <span className="ml-2 terminal-cursor"></span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {news.length > 0 ? (
              <div className="border-b border-terminal-border/30 pb-2 mb-2">
              <div className="flex justify-between text-xs text-terminal-cyan">
                <span>{news[0].data}</span>
              </div>
              </div>
            ) : (
              <div>No news available</div>
            )}
            </div>
        )}
      </div>
    </div>
  )
}

export default NewsSection
