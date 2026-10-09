import { Helmet } from 'react-helmet-async'

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | R S PAPAL GROUP Admin</title>
      </Helmet>
      <section className="page-header">
        <p>Overview</p>
        <h2>Dashboard foundation is ready.</h2>
        <span>Widgets and analytics can be connected in the next feature phase.</span>
      </section>
      <div className="foundation-grid">
        {['Content Modules', 'Media Library', 'Lead Management'].map((item) => (
          <article className="foundation-card" key={item}>
            <h3>{item}</h3>
            <p>Application shell and protected routing are configured.</p>
          </article>
        ))}
      </div>
    </>
  )
}

export default Dashboard
