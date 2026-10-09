import { Helmet } from 'react-helmet-async'
import { modulePages } from '../constants/navigation.js'

const ModulePage = ({ moduleKey }) => {
  const page = modulePages[moduleKey]

  return (
    <>
      <Helmet>
        <title>{page.title} | R S PAPAL GROUP Admin</title>
      </Helmet>
      <section className="page-header">
        <p>CMS Module</p>
        <h2>{page.title}</h2>
        <span>{page.description}</span>
      </section>
      <article className="empty-module">
        <h3>{page.title} shell</h3>
        <p>CRUD screens are intentionally not built in this foundation step.</p>
      </article>
    </>
  )
}

export default ModulePage
