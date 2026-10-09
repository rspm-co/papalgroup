import { useMemo, useState } from 'react'
import { Container, Heading, Section } from '../../ui'
import JobCard from '../JobCard'
import JobDetailsModal from '../JobDetailsModal'
import CareerApplicationModal from '../CareerApplicationModal'

const OpenPositions = ({ jobs }) => {
  const [activeJobId, setActiveJobId] = useState(null)
  const [applicationJob, setApplicationJob] = useState(null)

  const activeJob = useMemo(
    () => jobs.find((job) => job.id === activeJobId),
    [activeJobId, jobs],
  )

  return (
    <Section spacing="large" aria-label="Open Positions">
      <Container>
        <Heading
          align="center"
          title="Open Positions"
          description="Explore current opportunities across marketing, design, business development, operations, HR and technology."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              onApply={() => setActiveJobId(job.id)}
            />
          ))}
        </div>
      </Container>

      <JobDetailsModal
        job={activeJob}
        isOpen={Boolean(activeJob)}
        onClose={() => setActiveJobId(null)}
        onApply={() => {
          setActiveJobId(null)
          setApplicationJob(activeJob)
        }}
      />
      <CareerApplicationModal job={applicationJob} isOpen={Boolean(applicationJob)} onClose={() => setApplicationJob(null)} />
    </Section>
  )
}

export default OpenPositions
