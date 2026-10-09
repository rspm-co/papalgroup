import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { leadPriorities, leadStatuses } from '../../../constants/leads.js'
import LeadActivity from '../LeadActivity'
import LeadNotes from '../LeadNotes'
import LeadPriorityBadge from '../LeadPriorityBadge'
import LeadStatusBadge from '../LeadStatusBadge'
import LeadTimeline from '../LeadTimeline'
import { useAuth } from '../../../hooks/useAuth.js'

const defaultValues = {
  status: 'New',
  priority: 'Medium',
  assignedTo: '',
  followUpDate: '',
  internalNotes: '',
}

const formatDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '')

const LeadDrawer = ({ isOpen, lead, isSaving, onClose, onSubmit }) => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({ defaultValues })

  useEffect(() => {
    reset({
      status: lead?.status || 'New',
      priority: lead?.priority || 'Medium',
      assignedTo: lead?.assignedTo?._id || lead?.assignedTo || '',
      followUpDate: formatDateInput(lead?.followUpDate),
      internalNotes: '',
    })
  }, [lead, reset])

  useEffect(() => {
    if (!isDirty) return undefined
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  if (!isOpen || !lead) return null

  return (
    <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="gallery-drawer lead-drawer" role="dialog" aria-modal="true" aria-labelledby="lead-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="gallery-drawer-header">
          <div>
            <p>Lead Details</p>
            <h2 id="lead-drawer-title">{lead.fullName}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close lead drawer">
            <FiX />
          </button>
        </header>

        <form className="gallery-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="lead-panel lead-summary">
            <div>
              <p>Personal Details</p>
              <h3>{lead.fullName}</h3>
            </div>
            <div className="lead-detail-grid">
              <span>Email</span><strong>{lead.email || '-'}</strong>
              <span>Phone</span><strong>{lead.phone || '-'}</strong>
              <span>Company</span><strong>{lead.company || '-'}</strong>
              <span>Address</span><strong>{[lead.addressLine1, lead.addressLine2].filter(Boolean).join(', ') || '-'}</strong>
              <span>Location</span><strong>{[lead.city, lead.state, lead.country].filter(Boolean).join(', ') || '-'}</strong>
            </div>
            <div className="lead-badge-row">
              <LeadStatusBadge status={lead.status} />
              <LeadPriorityBadge priority={lead.priority} />
            </div>
          </section>

          <section className="lead-panel">
            <div>
              <p>Business Details</p>
              <h3>Enquiry Context</h3>
            </div>
            <div className="lead-detail-grid">
              <span>Lead Type</span><strong>{lead.leadType || '-'}</strong>
              <span>Preferred Brand</span><strong>{lead.preferredBrand || '-'}</strong>
              <span>Investment Range</span><strong>{lead.investmentRange || '-'}</strong>
              <span>Business Experience</span><strong>{lead.businessExperience || '-'}</strong>
              <span>Subject</span><strong>{lead.subject || '-'}</strong>
              <span>Source</span><strong>{lead.source || 'Website'}</strong>
            </div>
            <div className="lead-message">
              <span>Message</span>
              <p>{lead.message || '-'}</p>
            </div>
          </section>

          <section className="lead-panel">
            <div>
              <p>Follow-up</p>
              <h3>CRM Update</h3>
            </div>
            <div className="cms-grid two">
              <label>
                Status
                <select {...register('status')}>
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label>
                Priority
                <select {...register('priority')}>
                  {leadPriorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="cms-grid two">
              <label>
                Assigned To
                <select {...register('assignedTo')}>
                  <option value="">Unassigned</option>
                  <option value={user?.id}>{user?.name || 'Assign to me'}</option>
                  {lead.assignedTo?._id && lead.assignedTo._id !== user?.id && <option value={lead.assignedTo._id}>{lead.assignedTo.name}</option>}
                </select>
              </label>
              <label>
                Follow-up Date
                <input type="date" {...register('followUpDate')} />
              </label>
            </div>
          </section>

          <LeadNotes register={register} />
          {lead.internalNotes?.length > 0 && <section className="lead-panel"><h3>Previous notes</h3>{lead.internalNotes.map((item, index) => <p key={item._id || index}>{item.note}</p>)}</section>}
          <LeadTimeline status={lead.status} />
          <LeadActivity lead={lead} />

          <div className="gallery-drawer-actions">
            <button type="button" className="secondary-button" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}

export default LeadDrawer
