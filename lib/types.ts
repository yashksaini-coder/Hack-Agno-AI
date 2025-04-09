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
