export interface StockData {
    symbol: string
    name: string
    currentPrice: number
    previousClose: number
    sector: string
}

export interface health {
    status: string
    timestamp: string
    uptime: string
    uptime_seconds: number
    api: {
        groq_api: string
        gemini_api: string
    }
}

interface FinancialRatios {
    pe_ratio: number
    pb_ratio: number
    ev_ebitda: number
    roe: number
    roa: number
    operating_margin: number
    net_margin: number
  }
  
  interface FinancialHealth {
    debt_to_equity: number
    current_ratio: number
    quick_ratio: number
    interest_coverage: number
  }
  
  interface PerShareMetrics {
    eps: number
    book_value: number
    dividend_yield: number
    fifty_two_week_low: number
    fifty_two_week_high: number
  }
  
  export interface StockAnalysisData {
    symbol: string
    company_name: string
    current_price: number
    market_cap: number
    financial_ratios: FinancialRatios
    financial_health: FinancialHealth
    per_share_metrics: PerShareMetrics
  }
  
  export interface NewsItem {
    data: string
  }
  