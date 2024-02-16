import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import toast, { Toaster } from 'react-hot-toast'
import Quran from './pages/Quran'
import './App.css'
import Test from './pages/Test'
import SurahPage from './pages/SurahPage'
import Hadith from './pages/Hadith'
import { ConfigProvider } from 'antd'

function App() {
    return (
        <div className="App">
            <Header toast={toast} />
            <Toaster />
            <ConfigProvider
                theme={{
                    components: {
                        Segmented: {
                            itemColor: '#fff',
                            itemSelectedColor: '#fff',
                            itemHoverColor: '#fff',
                            trackPadding: 3,
                            trackBg: '#795547',
                            itemSelectedBg: '#CA9B79',
                            itemActiveBg: '#795547'
                        }
                    }
                }}
            >
                <Routes>
                    <Route path="/" element={<Quran />} />
                    <Route path="test" element={<Test />} />
                    <Route path="hadith" element={<Hadith />} />
                    <Route path="quran/:surahNumber" element={<SurahPage />} />
                </Routes>
            </ConfigProvider>
        </div>
    )
}

export default App
