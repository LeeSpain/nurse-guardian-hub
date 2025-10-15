import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'
import { initPerformanceMonitoring } from './lib/performance.ts'
import { UserProvider } from './contexts/UserContext.tsx'

// Initialize performance monitoring
initPerformanceMonitoring();

// Configure React Query with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (replaces cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
