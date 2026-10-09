import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  DeleteLeadDialog,
  EmptyState,
  LeadDrawer,
  LeadTable,
  LeadToolbar,
  LoadingState,
} from '../../components/leads'
import { deleteLead, getLeadById, getLeads, updateLead } from '../../services/leads.js'

const getId = (lead) => lead?._id || lead?.id || lead

const getItemsFromResponse = (data) => data?.items || data?.leads || data?.docs || data?.results || []

const buildPayload = (values) => ({
  status: values.status,
  priority: values.priority,
  assignedTo: values.assignedTo,
  followUpDate: values.followUpDate || null,
  note: values.internalNotes || undefined,
})

const Leads = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    search: '',
    leadType: '',
    status: '',
    priority: '',
    preferredBrand: '',
    dateFrom: '',
    dateTo: '',
    assignedTo: '',
    sort: 'newest',
    page: 1,
    limit: 20,
  })
  const [drawerState, setDrawerState] = useState({ isOpen: false, lead: null })
  const [deleteLeadItem, setDeleteLeadItem] = useState(null)

  const leadsQuery = useQuery({
    queryKey: ['leads-crm', filters],
    queryFn: () => getLeads(filters),
  })

  const leads = useMemo(() => getItemsFromResponse(leadsQuery.data), [leadsQuery.data])

  const leadDetailsMutation = useMutation({
    mutationFn: getLeadById,
    onSuccess: (lead) => setDrawerState({ isOpen: true, lead }),
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to load lead details'),
  })

  const updateMutation = useMutation({
    mutationFn: updateLead,
    onSuccess: (lead) => {
      toast.success('Lead updated successfully')
      setDrawerState({ isOpen: false, lead: null })
      queryClient.invalidateQueries({ queryKey: ['leads-crm'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-overview'] })
      if (lead) {
        queryClient.setQueryData(['lead-details', getId(lead)], lead)
      }
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update lead'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast.success('Lead deleted successfully')
      setDeleteLeadItem(null)
      queryClient.invalidateQueries({ queryKey: ['leads-crm'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-overview'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete lead'),
  })

  const openLeadDrawer = (lead) => {
    const leadId = getId(lead)
    setDrawerState({ isOpen: true, lead })
    leadDetailsMutation.mutate(leadId)
  }

  const saveLead = (values) => {
    const leadId = getId(drawerState.lead)
    updateMutation.mutate({ id: leadId, payload: buildPayload(values) })
  }

  return (
    <>
      <Helmet>
        <title>Lead Management | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="gallery-cms-page leads-page">
        <header className="cms-page-heading">
          <div>
            <p>CRM</p>
            <h1>Lead Management</h1>
            <span>Manage all enquiries received from the website.</span>
          </div>
        </header>

        <LeadToolbar
          filters={filters}
          leads={leads}
          onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters, page: 1 }))}
        />

        {leadsQuery.isLoading && <LoadingState />}
        {leadsQuery.isError && (
          <section className="gallery-state error-state" role="alert">
            <h2>Unable to load leads</h2>
            <p>{leadsQuery.error?.response?.data?.message || 'Please try again.'}</p>
            <button type="button" className="primary-button" onClick={() => leadsQuery.refetch()}>
              Try Again
            </button>
          </section>
        )}
        {!leadsQuery.isLoading && !leadsQuery.isError && leads.length === 0 && <EmptyState />}
        {!leadsQuery.isLoading && !leadsQuery.isError && leads.length > 0 && (
          <LeadTable
            leads={leads}
            onView={openLeadDrawer}
            onEdit={openLeadDrawer}
            onDelete={setDeleteLeadItem}
          />
        )}
        {leadsQuery.data?.pagination && !leadsQuery.isError && (
          <nav className="lead-pagination" aria-label="Lead pages">
            <span>{leadsQuery.data.pagination.total} enquiries · Page {filters.page} of {Math.max(1, leadsQuery.data.pagination.pages)}</span>
            <button className="secondary-button" type="button" disabled={filters.page <= 1 || leadsQuery.isFetching} onClick={() => setFilters(current => ({ ...current, page: current.page - 1 }))}>Previous</button>
            <button className="secondary-button" type="button" disabled={filters.page >= leadsQuery.data.pagination.pages || leadsQuery.isFetching} onClick={() => setFilters(current => ({ ...current, page: current.page + 1 }))}>Next</button>
          </nav>
        )}
      </div>

      <LeadDrawer
        isOpen={drawerState.isOpen}
        lead={drawerState.lead}
        isSaving={updateMutation.isPending || leadDetailsMutation.isPending}
        onClose={() => setDrawerState({ isOpen: false, lead: null })}
        onSubmit={saveLead}
      />
      <DeleteLeadDialog
        lead={deleteLeadItem}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleteLeadItem(null)}
        onConfirm={(lead) => deleteMutation.mutate(getId(lead))}
      />
    </>
  )
}

export default Leads
