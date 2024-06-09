import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style.scss'
import './breadcrumb.scss'
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './utilities/ThemeProvider.jsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </BrowserRouter>
)
