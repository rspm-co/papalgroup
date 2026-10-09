import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import { PageLoader } from './components/ui'
import { WebsiteProvider } from './context/WebsiteContext'
import AppRoutes from './routes/AppRoutes'
import ErrorBoundary from './utils/ErrorBoundary'

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <WebsiteProvider>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader label="Loading application" />}>
                <AppRoutes />
              </Suspense>
            </ErrorBoundary>
          </WebsiteProvider>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  )
}

export default App
