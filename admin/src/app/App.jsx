import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './AppRoutes.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { MotionConfig } from 'framer-motion'

const App = () => {
  return (
    <MotionConfig reducedMotion="user"><BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </AuthProvider>
    </BrowserRouter></MotionConfig>
  )
}

export default App
