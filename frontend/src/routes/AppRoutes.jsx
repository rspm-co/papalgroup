import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const About = lazy(() => import('../pages/About/About'))
const Awards = lazy(() => import('../pages/Awards/Awards'))
const Brands = lazy(() => import('../pages/Brands/Brands'))
const Careers = lazy(() => import('../pages/Careers/Careers'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const FranchiseEnquiry = lazy(() => import('../pages/FranchiseEnquiry/FranchiseEnquiry'))
const Gallery = lazy(() => import('../pages/Gallery/Gallery'))
const Home = lazy(() => import('../pages/Home/Home'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="brands" element={<Brands />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="awards" element={<Awards />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="franchise-enquiry" element={<FranchiseEnquiry />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
