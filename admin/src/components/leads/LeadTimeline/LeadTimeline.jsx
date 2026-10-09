import { leadTimelineStatuses } from '../../../constants/leads.js'

const LeadTimeline = ({ status }) => {
  const activeIndex = leadTimelineStatuses.indexOf(status)

  return (
    <section className="lead-panel">
      <div>
        <p>Timeline</p>
        <h3>Lead Progress</h3>
      </div>
      <ol className="lead-timeline">
        {leadTimelineStatuses.map((item, index) => (
          <li key={item} className={index <= activeIndex ? 'complete' : ''}>
            <span />
            <strong>{item}</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default LeadTimeline
