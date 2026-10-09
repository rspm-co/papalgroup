import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { Button } from '../../ui'

const GalleryModal = ({
  item,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  canNavigate,
}) => {
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
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[rgba(17,17,17,0.72)] p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            className="grid max-h-[calc(100vh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.28)] bg-[var(--color-white)] shadow-[0_28px_90px_rgba(0,0,0,0.3)] sm:max-h-[92vh] sm:rounded-[32px] lg:grid-cols-[1.2fr_0.8fr]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          >
            <div className="relative flex min-h-[240px] max-h-[52vh] items-center justify-center overflow-hidden bg-[#171310] p-3 sm:min-h-[340px] sm:p-6 lg:min-h-[640px] lg:max-h-none">
              <img
                src={item.image.src}
                alt={item.image.alt}
                loading="eager"
                decoding="async"
                className="h-full max-h-[50vh] w-full object-contain lg:max-h-full"
              />
            </div>

            <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-8">
              <div className="pr-1">
                <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {item.category}
                  </p>
                  <h2
                    id="gallery-modal-title"
                    className="mt-3 text-3xl font-bold text-[var(--color-black)]"
                  >
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[var(--color-gray-500)]">
                    {item.date}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-[var(--color-white)] text-xl leading-none text-[var(--color-black)] shadow-sm transition hover:bg-[var(--color-gray-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
                  onClick={onClose}
                  aria-label="Close gallery preview"
                >
                  <FiX aria-hidden="true" />
                </button>
                </div>

                <p className="mt-6 text-base leading-7 text-[var(--color-gray-600)]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex shrink-0 flex-col gap-3 border-t border-[var(--color-gray-200)] bg-[var(--color-white)] pt-5 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  size="medium"
                  className="w-full sm:flex-1"
                  onClick={onPrevious}
                  aria-label="Previous gallery item"
                >
                  <FiChevronLeft aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  className="w-full sm:flex-1"
                  onClick={onNext}
                  aria-label="Next gallery item"
                >
                  Next
                  <FiChevronRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GalleryModal
