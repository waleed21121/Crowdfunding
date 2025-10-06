import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../api/axios-global.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import AppContextProvider from './context/AppContext.jsx'


const queryClient =new QueryClient ({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
