import { Helmet } from 'react-helmet-async'
import { site } from '../config/site'

// Centralised <head> management. Rendered once near the top of the app.
export default function Seo() {
  const title = `${site.name} | Rooftop Solar Installation in ${site.location}`
  const description =
    'Asian Solar installs rooftop solar systems for homes, businesses, factories, schools and farms across Maharashtra. Cut bills, claim subsidy, go green.'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <html lang="en" />
    </Helmet>
  )
}
