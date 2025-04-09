"use client"

import { useEffect, useState } from "react"
import Logo from "@/components/logo"
import {HealthSection} from "@/components/health-section"
import TopStocksSection from "@/components/top-stocks-section"
import AgentSection from "@/components/agent-section"
import StockSection from "@/components/stock-section"
import NewsSection from "@/components/news-section"
import StockAnalysisSection from "@/components/stock-analysis-section"
import ChatSection from "@/components/chat-section"

export default function Home() {

  return (
    <main className="min-h-screen p-4 bg-terminal-background text-terminal-green">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 min-h-[10px]">
        {/* Header Row */}
        <div className="md:col-span-8 terminal-section flex items-center overflow-visible">
          <Logo />
        </div>
        <div className="md:col-span-4 terminal-section">
          <HealthSection />
        </div>

        {/* Middle Row */}
        <div className="md:col-span-3 terminal-section">
          <StockAnalysisSection />
        </div>
        <div className="md:col-span-5 terminal-section">
          <AgentSection />
        </div>
        <div className="md:col-span-4 md:grid md:grid-rows-2 md:gap-4">
          <div className="terminal-section mb-4 md:mb-0">
            <StockSection />
          </div>
          <div className="terminal-section">
            <NewsSection />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="md:col-span-3 terminal-section">
          <TopStocksSection />
        </div>
        <div className="md:col-span-9 terminal-section">
          <ChatSection />
        </div>
      </div>
    </main>
  )
}
