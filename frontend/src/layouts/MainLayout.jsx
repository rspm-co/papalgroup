import { Outlet, useLocation } from 'react-router-dom'
import SEO from '../components/common/SEO'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { pageSeo, seoDefaults } from '../constants/seo'
import PageTransition from '../utils/PageTransition'
import ScrollToTop from '../utils/ScrollToTop'

const MainLayout = () => {
  const location = useLocation()
  const seo = pageSeo[location.pathname] || pageSeo['*']
  const canonical = `${seoDefaults.canonicalBaseUrl}${location.pathname}`

  return (
    <div className="min-h-screen bg-[var(--color-white)] text-[var(--color-gray-700)]">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={canonical}
        ogImage={seoDefaults.ogImage}
      />
      <ScrollToTop />
      <Navbar key={location.pathname} />
      <main id="main-content" className="min-h-screen pt-16 md:pt-[70px]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
