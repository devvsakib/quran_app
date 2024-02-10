import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import toast, { Toaster } from 'react-hot-toast'
import Quran from './pages/Quran'
import './App.css'

function App() {
  return (
    <div className="App">
    <Header toast={toast} />
    <Toaster />
    <Routes>
        <Route path="/" element={<Quran />} />
    </Routes>
</div>
  )
}

export default App
