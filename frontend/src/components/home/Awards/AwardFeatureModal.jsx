import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const AwardFeatureModal = ({ feature, isOpen, onClose }) => {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
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
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && feature && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[rgba(5,5,5,0.72)] p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick} role="presentation"
        >
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="award-feature-title"
            className="grid h-[calc(100vh-1.5rem)] max-h-[calc(100vh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-[24px] bg-[var(--color-white)] shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:h-[92vh] sm:max-h-[92vh] sm:rounded-[32px] lg:grid-cols-[1.3fr_0.7fr]"
            initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          >
            <div className="h-full min-h-0 overflow-y-auto bg-[#f7f4ed] p-3 sm:p-6">
              <img src={feature.image.src} alt={feature.image.alt} className="h-auto w-full object-contain" />
            </div>
            <div className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">{feature.eyebrow}</p>
                  <h2 id="award-feature-title" className="mt-3 text-3xl font-semibold text-[var(--color-black)]">{feature.title}</h2>
                </div>
                <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close featured recognition" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] text-xl text-[var(--color-black)] transition hover:bg-[var(--color-gray-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]">
                  <FiX aria-hidden="true" />
                </button>
              </div>
              <p className="mt-6 text-base leading-7 text-[var(--color-gray-600)]">{feature.description}</p>
              <p className="mt-auto pt-8 text-sm font-medium text-[var(--color-gray-500)]">Scroll the image to read the full feature.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AwardFeatureModal
