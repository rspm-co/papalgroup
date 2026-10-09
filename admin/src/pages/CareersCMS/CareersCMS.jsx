import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  DeleteJobDialog,
  EmptyState,
  JobDrawer,
  JobsTable,
  JobToolbar,
  LoadingState,
} from '../../components/careersCMS'
import { createJob, deleteJob, getJobs, updateJob } from '../../services/careers.js'
import { arrayToLines, createSlug, linesToArray } from '../../constants/careers.js'

const emptyJob = {
  title: '',
  slug: '',
  department: '',
  location: '',
  employmentType: 'Full Time',
  workMode: 'On Site',
  experience: '',
  salary: '',
  vacancies: 1,
  description: '',
  responsibilitiesText: '',
  requirementsText: '',
  skillsText: '',
  benefitsText: '',
  applicationDeadline: '',
  featured: false,
  status: 'Draft',
  displayOrder: 0,
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  },
}

const getId = (item) => item?._id || item?.id || item

const getItemsFromResponse = (data) => data?.items || data?.careers || data?.jobs || data?.docs || data?.results || []

const normalizeJob = (job = {}) => ({
  ...emptyJob,
  ...job,
  id: getId(job),
  applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().slice(0, 10) : '',
  responsibilitiesText: arrayToLines(job.responsibilities),
  requirementsText: arrayToLines(job.requirements),
  skillsText: arrayToLines(job.skills),
  benefitsText: arrayToLines(job.benefits),
  seo: {
    ...emptyJob.seo,
    ...job.seo,
    keywords: Array.isArray(job.seo?.keywords) ? job.seo.keywords.join(', ') : job.seo?.keywords || '',
  },
})

const buildPayload = (values) => ({
  title: values.title,
  slug: values.slug || createSlug(values.title),
  department: values.department,
  location: values.location,
  employmentType: values.employmentType,
  workMode: values.workMode,
  experience: values.experience,
  salary: values.salary,
  vacancies: Number(values.vacancies || 1),
  description: values.description,
  responsibilities: linesToArray(values.responsibilitiesText),
  requirements: linesToArray(values.requirementsText),
  skills: linesToArray(values.skillsText),
  benefits: linesToArray(values.benefitsText),
  applicationDeadline: values.applicationDeadline,
  featured: Boolean(values.featured),
  status: values.status,
  displayOrder: Number(values.displayOrder || 0),
  seo: {
    ...values.seo,
    keywords: values.seo?.keywords ? values.seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean) : [],
  },
})

const CareersCMS = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    location: '',
    employmentType: '',
    workMode: '',
    status: '',
    sort: 'newest',
  })
  const [drawerState, setDrawerState] = useState({ isOpen: false, mode: 'create', job: emptyJob })
  const [deleteJobItem, setDeleteJobItem] = useState(null)

  const jobsQuery = useQuery({
    queryKey: ['careers-cms', filters],
    queryFn: () => getJobs(filters),
  })

  const jobs = useMemo(() => getItemsFromResponse(jobsQuery.data), [jobsQuery.data])

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully')
      setDrawerState({ isOpen: false, mode: 'create', job: emptyJob })
      queryClient.invalidateQueries({ queryKey: ['careers-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to create job'),
  })

  const updateMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      toast.success('Job updated successfully')
      setDrawerState({ isOpen: false, mode: 'create', job: emptyJob })
      queryClient.invalidateQueries({ queryKey: ['careers-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update job'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Job deleted successfully')
      setDeleteJobItem(null)
      queryClient.invalidateQueries({ queryKey: ['careers-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete job'),
  })

  const saveJob = (values) => {
    const payload = buildPayload(values)
    const jobId = getId(drawerState.job)

    if (drawerState.mode === 'edit' && jobId) {
      updateMutation.mutate({ id: jobId, payload })
      return
    }

    createMutation.mutate(payload)
  }

  const duplicateJob = (job) => {
    const normalizedJob = normalizeJob(job)
    createMutation.mutate(buildPayload({
      ...normalizedJob,
      title: `${normalizedJob.title} Copy`,
      slug: `${normalizedJob.slug || createSlug(normalizedJob.title)}-copy-${Date.now()}`,
      status: 'Draft',
      displayOrder: Number(normalizedJob.displayOrder || 0) + 1,
    }))
  }

  const openCreateDrawer = () => setDrawerState({ isOpen: true, mode: 'create', job: emptyJob })
  const openEditDrawer = (job) => setDrawerState({ isOpen: true, mode: 'edit', job: normalizeJob(job) })
  const closeDrawer = () => setDrawerState({ isOpen: false, mode: 'create', job: emptyJob })

  return (
    <>
      <Helmet>
        <title>Careers CMS | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="gallery-cms-page careers-cms-page">
        <header className="cms-page-heading">
          <div>
            <p>Careers</p>
            <h1>Careers Management</h1>
            <span>Manage all job openings across R S PAPAL GROUP.</span>
          </div>
        </header>

        <JobToolbar
          filters={filters}
          onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters }))}
          onCreate={openCreateDrawer}
        />

        {jobsQuery.isLoading && <LoadingState />}
        {jobsQuery.isError && (
          <section className="gallery-state error-state" role="alert">
            <h2>Unable to load jobs</h2>
            <p>{jobsQuery.error?.response?.data?.message || 'Please try again.'}</p>
            <button type="button" className="primary-button" onClick={() => jobsQuery.refetch()}>
              Try Again
            </button>
          </section>
        )}
        {!jobsQuery.isLoading && !jobsQuery.isError && jobs.length === 0 && <EmptyState onCreate={openCreateDrawer} />}
        {!jobsQuery.isLoading && !jobsQuery.isError && jobs.length > 0 && (
          <JobsTable
            items={jobs}
            onPreview={openEditDrawer}
            onEdit={openEditDrawer}
            onDelete={setDeleteJobItem}
            onDuplicate={duplicateJob}
          />
        )}
      </div>

      <JobDrawer
        isOpen={drawerState.isOpen}
        mode={drawerState.mode}
        job={drawerState.job}
        isSaving={createMutation.isPending || updateMutation.isPending}
        onClose={closeDrawer}
        onSubmit={saveJob}
      />
      <DeleteJobDialog
        job={deleteJobItem}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleteJobItem(null)}
        onConfirm={(job) => deleteMutation.mutate(getId(job))}
      />
    </>
  )
}

export default CareersCMS
