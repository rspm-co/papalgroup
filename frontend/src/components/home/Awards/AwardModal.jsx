import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '../../../utils/classNames'

const AwardModal = ({ award, isOpen, onClose }) => {
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
      {isOpen && award && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(5,5,5,0.58)] p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="award-modal-title"
            className="grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.28)] bg-[var(--color-white)] shadow-[0_28px_90px_rgba(0,0,0,0.24)] lg:grid-cols-[1.05fr_0.95fr]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          >
            <div
              className={classNames(
                'flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br lg:min-h-[620px]',
                award.awardImage.gradient,
              )}
              role="img"
              aria-label={award.awardImage.alt}
            >
              {award.awardImage.src && (
                <img src={award.awardImage.src} alt={award.awardImage.alt} className="h-full w-full object-contain bg-white p-3" />
              )}
            </div>

            <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {award.organization}
                  </p>
                  <h3
                    id="award-modal-title"
                    className="mt-3 text-3xl font-semibold tracking-normal text-[var(--color-black)]"
                  >
                    {award.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[var(--color-gray-500)]">
                    {award.year}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-[var(--color-white)] text-xl leading-none text-[var(--color-black)] shadow-sm transition hover:bg-[var(--color-gray-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                  onClick={onClose}
                  aria-label="Close award details"
                >
                  x
                </button>
              </div>

              <p className="mt-6 text-base leading-7 text-[var(--color-gray-600)]">
                {award.description}
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-[var(--color-gray-200)] bg-[var(--color-gray-50)] p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-black)]">
                  Certificate
                </p>
                <div
                  className={classNames(
                    'h-44 rounded-2xl bg-gradient-to-br',
                    award.certificateImage.gradient,
                  )}
                  role="img"
                  aria-label={award.certificateImage.alt}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AwardModal
