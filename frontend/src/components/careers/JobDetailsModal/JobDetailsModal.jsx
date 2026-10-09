import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Badge } from '../../ui'

const DetailList = ({ title, items }) => (
  <div>
    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
      {title}
    </h3>
    <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--color-gray-600)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && job && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(17,17,17,0.62)] p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-modal-title"
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-[rgba(255,255,255,0.28)] bg-[var(--color-white)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge>{job.department}</Badge>
                <h2
                  id="job-modal-title"
                  className="mt-4 text-3xl font-bold text-[var(--color-black)]"
                >
                  {job.title}
                </h2>
                <p className="mt-3 text-base text-[var(--color-gray-600)]">
                  {job.location} · {job.experience} · {job.employmentType}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-[var(--color-white)] text-xl leading-none text-[var(--color-black)] shadow-sm transition hover:bg-[var(--color-gray-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                onClick={onClose}
                aria-label="Close job details"
              >
                ×
              </button>
            </div>

            <p className="mt-8 text-lg leading-8 text-[var(--color-gray-600)]">
              {job.description}
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <DetailList title="Responsibilities" items={job.responsibilities} />
              <DetailList title="Requirements" items={job.requirements} />
              <DetailList title="Skills" items={job.skills} />
            </div>

            <Button
              type="button"
              size="large"
              className="mt-10 w-full sm:w-auto"
              onClick={onApply}
              aria-label={`Apply for ${job.title}`}
            >
              Apply
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default JobDetailsModal
