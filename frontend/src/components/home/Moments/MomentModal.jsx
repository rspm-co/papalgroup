import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../ui'
import { classNames } from '../../../utils/classNames'

const MomentModal = ({
  moment,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  canNavigate,
}) => {
  const dialogRef = useRef(null)
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

      if (event.key === 'ArrowLeft' && canNavigate) {
        onPrevious()
      }

      if (event.key === 'ArrowRight' && canNavigate) {
        onNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [canNavigate, isOpen, onClose, onNext, onPrevious])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && moment && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(5,5,5,0.58)] p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="moment-modal-title"
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.3)] bg-[var(--color-white)] shadow-[0_28px_90px_rgba(0,0,0,0.24)] lg:grid-cols-[1.15fr_0.85fr]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          >
            {moment.image.src ? (
              <img
                src={moment.image.src}
                alt={moment.image.alt}
                className="h-full min-h-[320px] w-full object-cover lg:min-h-[620px]"
              />
            ) : (
              <div
                className={classNames(
                  'min-h-[320px] bg-gradient-to-br lg:min-h-[620px]',
                  moment.image.gradient,
                )}
                role="img"
                aria-label={moment.image.alt}
              />
            )}

            <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {moment.category}
                  </p>
                  <h3
                    id="moment-modal-title"
                    className="mt-3 text-3xl font-semibold tracking-normal text-[var(--color-black)]"
                  >
                    {moment.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-[var(--color-white)] text-xl leading-none text-[var(--color-black)] shadow-sm transition hover:bg-[var(--color-gray-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                  onClick={onClose}
                  aria-label="Close moments preview"
                >
                  ×
                </button>
              </div>

              <p className="mt-6 text-base leading-7 text-[var(--color-gray-600)]">
                {moment.description}
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--color-gray-500)]">
                {moment.date}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  size="medium"
                  fullWidth
                  onClick={onPrevious}
                  disabled={!canNavigate}
                  aria-label="Previous moment"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  fullWidth
                  onClick={onNext}
                  disabled={!canNavigate}
                  aria-label="Next moment"
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MomentModal
