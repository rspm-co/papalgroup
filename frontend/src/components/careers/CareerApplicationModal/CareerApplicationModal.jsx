import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { Button } from '../../ui'
import { submitContactForm } from '../../../services/api'

const initialForm = { fullName: '', email: '', phone: '', message: '' }
const inputClass = 'mt-2 w-full rounded-[12px] border border-[var(--color-gray-200)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-black)] outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)]'

const CareerApplicationModal = ({ job, isOpen, onClose }) => {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; previouslyFocused?.focus?.() }
  }, [isOpen, onClose])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setStatus(null)
    if (!form.fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !/^[0-9+\-\s()]{8,16}$/.test(form.phone) || !form.message.trim()) {
      setStatus('error')
      return
    }
    setIsSubmitting(true)
    try {
      await submitContactForm({
        ...form,
        leadType: 'Career',
        company: job.title,
        subject: `Application for ${job.title}`,
        source: 'Careers Page',
      })
      setForm(initialForm)
      setStatus('success')
    } catch { setStatus('submit-error') } finally { setIsSubmitting(false) }
  }

  return (
    <AnimatePresence>
      {isOpen && job && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(17,17,17,0.68)] p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="presentation">
          <motion.div role="dialog" aria-modal="true" aria-labelledby="career-application-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8" initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">Career Application</p><h2 id="career-application-title" className="mt-3 text-3xl font-bold text-[var(--color-black)]">{job.title}</h2><p className="mt-2 text-sm text-[var(--color-gray-600)]">{job.location} · {job.employmentType}</p></div>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close application form" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gray-200)] text-xl"><FiX /></button>
            </div>
            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <Field label="Full Name" name="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <div className="sm:col-span-2"><label className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-black)]" htmlFor="career-message">Cover Message</label><textarea id="career-message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} placeholder="Tell us about your experience and interest in this role." /></div>
              {status === 'success' && <p className="sm:col-span-2 rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold-soft)] px-4 py-3 text-sm font-medium">Application received. Our team will be in touch soon.</p>}
              {status === 'error' && <p className="sm:col-span-2 text-sm font-medium text-[var(--color-danger)]">Please complete all fields with a valid email address and phone number.</p>}
              {status === 'submit-error' && <p className="sm:col-span-2 text-sm font-medium text-[var(--color-danger)]">We could not submit your application. Please try again.</p>}
              <Button type="submit" size="large" loading={isSubmitting} className="sm:col-span-2 sm:w-fit">Submit Application</Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Field = ({ label, name, type = 'text', value, onChange }) => <div><label className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-black)]" htmlFor={name}>{label}</label><input id={name} name={name} type={type} value={value} onChange={onChange} className={inputClass} /></div>

export default CareerApplicationModal
