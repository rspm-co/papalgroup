import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container, Heading, Section } from '../../ui'
import { submitContactForm } from '../../../services/api'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const ContactForm = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fields = useMemo(
    () => [
      { id: 'fullName', label: 'Full Name', type: 'text' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'phone', label: 'Phone Number', type: 'tel' },
      { id: 'subject', label: 'Subject', type: 'text' },
    ],
    [],
  )

  const validate = () => {
    const nextErrors = {}

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone)) {
      nextErrors.phone = 'Enter a valid phone number.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    try {
      await submitContactForm({ ...form, leadType: 'Contact', source: 'Website' })
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('submit-error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section spacing="large" aria-label="Contact Form">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Heading
            eyebrow="Send a Message"
            title="Tell us how we can help."
            description="Use the form for business enquiries, franchise opportunities, support requests or general questions."
            size="sm"
          />
          <motion.form
            id="contact-form"
            className="rounded-[32px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_14px_42px_rgba(26,26,26,0.06)] sm:p-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <Field
                  key={field.id}
                  field={field}
                  value={form[field.id]}
                  error={errors[field.id]}
                  onChange={handleChange}
                />
              ))}
            </div>
            <div className="mt-5">
              <label
                className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-black)]"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="mt-3 w-full rounded-[14px] border border-[var(--color-gray-200)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-black)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)]"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && <ErrorText id="message-error" text={errors.message} />}
            </div>

            {status === 'success' && (
              <p className="mt-5 rounded-[14px] border border-[var(--color-gold)] bg-[var(--color-gold-soft)] px-4 py-3 text-sm font-medium text-[var(--color-black)]">
                Thanks — your message has been sent. Our team will be in touch shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-5 rounded-[14px] border border-[var(--color-danger)] bg-[rgba(194,65,59,0.08)] px-4 py-3 text-sm font-medium text-[var(--color-danger)]">
                Please fix the highlighted fields and try again.
              </p>
            )}
            {status === 'submit-error' && (
              <p className="mt-5 rounded-[14px] border border-[var(--color-danger)] bg-[rgba(194,65,59,0.08)] px-4 py-3 text-sm font-medium text-[var(--color-danger)]">
                We could not send your message. Please try again in a moment.
              </p>
            )}

            <Button type="submit" size="large" loading={isSubmitting} className="mt-8 w-full sm:w-auto">
              Send Message
            </Button>
          </motion.form>
        </div>
      </Container>
    </Section>
  )
}

const Field = ({ field, value, error, onChange }) => (
  <div>
    <label
      className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-black)]"
      htmlFor={field.id}
    >
      {field.label}
    </label>
    <input
      id={field.id}
      name={field.id}
      type={field.type}
      value={value}
      onChange={onChange}
      className="mt-3 w-full rounded-[14px] border border-[var(--color-gray-200)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-black)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)]"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${field.id}-error` : undefined}
    />
    {error && <ErrorText id={`${field.id}-error`} text={error} />}
  </div>
)

const ErrorText = ({ id, text }) => (
  <p id={id} className="mt-2 text-sm font-medium text-[var(--color-danger)]">
    {text}
  </p>
)

export default ContactForm
