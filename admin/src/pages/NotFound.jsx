import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  return (
    <main className="not-found">
      <Helmet>
        <title>404 | R S PAPAL GROUP Admin</title>
      </Helmet>
      <p>404</p>
      <h1>Page not found</h1>
      <Link to="/dashboard" className="primary-button">
        Back to Dashboard
      </Link>
    </main>
  )
}

export default NotFound
