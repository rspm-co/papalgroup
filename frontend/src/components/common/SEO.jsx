import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../constants/site'

const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
}) => {
  const pageTitle = title && title !== siteConfig.name ? `${title} | ${siteConfig.name}` : siteConfig.name
  const pageDescription = description || siteConfig.description

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  )
}

export default SEO
