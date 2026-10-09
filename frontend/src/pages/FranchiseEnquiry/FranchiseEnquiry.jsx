import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container, Heading, Section } from '../../components/ui'
import { submitContactForm } from '../../services/api'

const franchiseBrands = [
  'Ladachi Kulfi',
  'Gauraai Modak',
  'Tiparii Ice Cream',
]

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  preferredBrand: '',
}

const inputClassName =
  'mt-2.5 w-full rounded-[14px] border border-[var(--color-gray-200)] bg-[var(--color-background)] px-4 py-3 text-[var(--color-black)] outline-none transition placeholder:text-[var(--color-gray-500)] focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)]'

const FranchiseEnquiry = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.'
    if (!form.addressLine1.trim()) nextErrors.addressLine1 = 'Address line 1 is required.'
    if (!form.preferredBrand) nextErrors.preferredBrand = 'Please select a brand.'
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
    if (Object.keys(validationErrors).length) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    try {
      await submitContactForm({
        ...form,
        fullName: `${form.firstName.trim()} ${form.lastName.trim()}`,
        leadType: 'Franchise',
        subject: `Franchise enquiry for ${form.preferredBrand}`,
        message: `Franchise enquiry for ${form.preferredBrand}. Address: ${form.addressLine1}${form.addressLine2 ? `, ${form.addressLine2}` : ''}.`,
        source: 'Website',
      })
      setForm(initialForm)
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('submit-error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Section spacing="large" className="overflow-hidden bg-[linear-gradient(135deg,#FFFDF9_0%,#F8F0DF_100%)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Heading
              eyebrow="Partner With Us"
              title="Start your franchise journey."
              description="Tell us a little about yourself and the brand you are interested in. Our franchise team will get in touch with the next steps."
              titleAs="h1"
            />
            <motion.form
              className="rounded-[32px] border border-[var(--color-gray-200)] bg-white p-6 shadow-[0_18px_50px_rgba(74,43,27,0.10)] sm:p-8"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First Name" name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} autoComplete="given-name" />
                <Field label="Last Name" name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} autoComplete="family-name" />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={handleChange} autoComplete="tel" />
                <Field label="Email Address" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} autoComplete="email" />
              </div>
              <div className="mt-5 grid gap-5">
                <Field label="Address Line 1" name="addressLine1" value={form.addressLine1} error={errors.addressLine1} onChange={handleChange} autoComplete="address-line1" />
                <Field label="Address Line 2" name="addressLine2" value={form.addressLine2} error={errors.addressLine2} onChange={handleChange} autoComplete="address-line2" required={false} />
                <div>
                  <label className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-black)]" htmlFor="preferredBrand">Brand you are interested in</label>
                  <select id="preferredBrand" name="preferredBrand" value={form.preferredBrand} onChange={handleChange} className={inputClassName} aria-invalid={Boolean(errors.preferredBrand)} aria-describedby={errors.preferredBrand ? 'preferredBrand-error' : undefined}>
                    <option value="">Select a brand</option>
                    {franchiseBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                  </select>
                  {errors.preferredBrand && <ErrorText id="preferredBrand-error" text={errors.preferredBrand} />}
                </div>
              </div>
              <FormStatus status={status} />
              <Button type="submit" size="large" loading={isSubmitting} className="mt-8 w-full sm:w-auto">Submit Enquiry</Button>
            </motion.form>
          </div>
        </Container>
      </Section>
    </>
  )
}

const Field = ({ label, name, type = 'text', value, error, onChange, autoComplete, required = true }) => (
  <div>
    <label className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-black)]" htmlFor={name}>{label}{required && <span className="ml-1 text-[var(--color-danger)]">*</span>}</label>
    <input id={name} name={name} type={type} value={value} onChange={onChange} autoComplete={autoComplete} className={inputClassName} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
    {error && <ErrorText id={`${name}-error`} text={error} />}
  </div>
)

const ErrorText = ({ id, text }) => <p id={id} className="mt-2 text-sm font-medium text-[var(--color-danger)]">{text}</p>

const FormStatus = ({ status }) => {
  if (!status) return null
  const messages = {
    success: 'Thank you — your franchise enquiry has been received. Our team will contact you soon.',
    error: 'Please fix the highlighted fields and try again.',
    'submit-error': 'We could not submit your enquiry. Please try again in a moment.',
  }
  const isError = status !== 'success'
  return <p className={`mt-5 rounded-[14px] border px-4 py-3 text-sm font-medium ${isError ? 'border-[var(--color-danger)] bg-[rgba(194,65,59,0.08)] text-[var(--color-danger)]' : 'border-[var(--color-gold)] bg-[var(--color-gold-soft)] text-[var(--color-black)]'}`}>{messages[status]}</p>
}

export default FranchiseEnquiry
