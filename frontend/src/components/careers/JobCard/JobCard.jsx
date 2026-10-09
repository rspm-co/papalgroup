import { memo } from 'react'
import { motion } from 'framer-motion'
import { Badge, Button } from '../../ui'

const JobCard = ({ job, index, onApply }) => {
  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: Math.min(index * 0.05, 0.24), duration: 0.58, ease: 'easeOut' }}
      aria-labelledby={`${job.id}-title`}
    >
      <div className="flex h-full flex-col rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <Badge>{job.status}</Badge>
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            {job.department}
          </span>
        </div>
        <h2
          id={`${job.id}-title`}
          className="mt-6 text-2xl font-bold text-[var(--color-black)]"
        >
          {job.title}
        </h2>
        <dl className="mt-5 grid gap-3 text-sm text-[var(--color-gray-600)]">
          <div className="flex justify-between gap-4 border-t border-[var(--color-gray-200)] pt-3">
            <dt className="font-medium">Location</dt>
            <dd className="text-right">{job.location}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[var(--color-gray-200)] pt-3">
            <dt className="font-medium">Experience</dt>
            <dd className="text-right">{job.experience}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[var(--color-gray-200)] pt-3">
            <dt className="font-medium">Type</dt>
            <dd className="text-right">{job.employmentType}</dd>
          </div>
        </dl>
        <Button
          type="button"
          className="mt-8 w-full"
          onClick={onApply}
          aria-label={`Apply for ${job.title}`}
        >
          Apply Now
        </Button>
      </div>
    </motion.article>
  )
}

export default memo(JobCard)
