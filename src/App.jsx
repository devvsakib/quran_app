import { Toaster } from 'react-hot-toast'
import { ConfigProvider } from 'antd'
import Navigation from './components/Navigation'
import Router from './routes/Routes'

function App() {
    return (
        <div>
            <Navigation />
            {/* <Header toast={toast} /> */}
            <Toaster />
            <ConfigProvider
                theme={{
                    token: 'var(--color-primary)',
                    components: {
                        Segmented: {
                            itemColor: '#fff',
                            itemSelectedColor: '#fff',
                            itemHoverColor: '#fff',
                            trackPadding: 3,
                            trackBg: '#795547',
                            itemSelectedBg: '#CA9B79',
                            itemActiveBg: '#795547'
                        },
                        Table: {
                            headerBg: 'var(--color-secondary)',
                            headerColor: '#fff',
                            headerSortHoverBg: 'var(--color-tertiary)',
                            headerSortActiveBg: 'var(--color-tertiary)',
                            bodyBg: '#fff',
                            bodyColor: '#000',
                            colorFillQuaternary: '#000',
                            colorIcon: '#000',
                            colorPrimary: 'var(--color-primary)',
                        },
                    }
                }}
            >
                <Router />
            </ConfigProvider>
        </div>
    )
}

export default App
