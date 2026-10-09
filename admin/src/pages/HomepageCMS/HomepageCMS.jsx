import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  AchievementsEditor,
  AwardsEditor,
  BrandsSectionEditor,
  CTAEditor,
  FranchiseProcessEditor,
  HeroEditor,
  JourneyEditor,
  MomentsEditor,
  PublishBar,
  SEOEditor,
} from '../../components/homepageCMS'
import { getHomepageContent, updateHomepageContent } from '../../services/homepage.js'

const sectionDefaults = {
  title: '',
  subtitle: '',
  isVisible: true,
}

const defaultValues = {
  id: '',
  status: 'Draft',
  hero: {
    title: '',
    subtitle: '',
    description: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    backgroundImage: '',
    isActive: true,
  },
  journey: [],
  achievements: [],
  brandsSection: { ...sectionDefaults },
  momentsSection: { ...sectionDefaults },
  awardsSection: { ...sectionDefaults },
  franchiseProcess: { ...sectionDefaults },
  cta: {
    title: '',
    description: '',
    primaryButton: { text: '', link: '' },
    secondaryButton: { text: '', link: '' },
    backgroundImage: '',
  },
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
  },
}

const normalizeHomepage = (homepage) => ({
  ...defaultValues,
  ...homepage,
  id: homepage?._id || homepage?.id || '',
  status: homepage?.status || 'Draft',
  hero: { ...defaultValues.hero, ...homepage?.hero },
  journey: homepage?.journey || [],
  achievements: homepage?.achievements || [],
  brandsSection: { ...defaultValues.brandsSection, ...homepage?.brandsSection },
  momentsSection: { ...defaultValues.momentsSection, ...homepage?.momentsSection },
  awardsSection: { ...defaultValues.awardsSection, ...homepage?.awardsSection },
  franchiseProcess: { ...defaultValues.franchiseProcess, ...homepage?.franchiseProcess },
  cta: {
    ...defaultValues.cta,
    ...homepage?.cta,
    primaryButton: {
      ...defaultValues.cta.primaryButton,
      ...homepage?.cta?.primaryButton,
    },
    secondaryButton: {
      ...defaultValues.cta.secondaryButton,
      ...homepage?.cta?.secondaryButton,
    },
  },
  seo: {
    ...defaultValues.seo,
    ...homepage?.seo,
    keywords: Array.isArray(homepage?.seo?.keywords)
      ? homepage.seo.keywords.join(', ')
      : homepage?.seo?.keywords || '',
  },
})

const buildPayload = (values, status) => ({
  ...values,
  status,
  seo: {
    ...values.seo,
    keywords: values.seo.keywords
      ? values.seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
      : [],
  },
})

const HomepageCMS = () => {
  const queryClient = useQueryClient()
  const [autoSaveStatus, setAutoSaveStatus] = useState('')
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isDirty },
  } = useForm({ defaultValues, mode: 'onBlur' })

  const homepageQuery = useQuery({
    queryKey: ['homepage-cms'],
    queryFn: getHomepageContent,
  })

  const saveMutation = useMutation({
    mutationFn: updateHomepageContent,
    onSuccess: (homepage) => {
      const nextValues = normalizeHomepage(homepage)
      reset(nextValues)
      queryClient.setQueryData(['homepage-cms'], homepage)
      setAutoSaveStatus('Saved just now')
      toast.success('Homepage saved successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Unable to save homepage')
    },
  })

  useEffect(() => {
    if (homepageQuery.data) {
      reset(normalizeHomepage(homepageQuery.data))
    }
  }, [homepageQuery.data, reset])

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }

    setAutoSaveStatus('Unsaved changes')
    const timer = window.setTimeout(() => {
      setAutoSaveStatus('Auto-save pending')
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [isDirty])

  const currentStatus = watch('status') || 'Draft'

  const submitWithStatus = (status) =>
    handleSubmit((values) => {
      if (values.journey.length === 0) {
        toast.error('Add at least one journey milestone')
        return
      }

      if (values.achievements.length === 0) {
        toast.error('Add at least one achievement card')
        return
      }

      saveMutation.mutate({
        id: values.id,
        payload: buildPayload(values, status),
      })
    })()

  if (homepageQuery.isLoading) {
    return (
      <section className="dashboard-state">
        <span className="loader" />
        <p>Loading homepage content...</p>
      </section>
    )
  }

  if (homepageQuery.isError) {
    return (
      <section className="dashboard-state error-state" role="alert">
        <h2>Unable to load homepage CMS</h2>
        <p>{homepageQuery.error?.response?.data?.message || 'Please try again.'}</p>
        <button type="button" className="primary-button" onClick={() => homepageQuery.refetch()}>
          Try Again
        </button>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Homepage CMS | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="homepage-cms">
        <div className="cms-page-heading">
          <div>
            <p>Homepage</p>
            <h1>Homepage Content Management</h1>
            <span>Manage every major section of the public homepage from one focused workspace.</span>
          </div>
        </div>

        <form className="cms-form" noValidate>
          <HeroEditor register={register} errors={errors} />
          <JourneyEditor control={control} register={register} errors={errors} />
          <AchievementsEditor control={control} register={register} errors={errors} />
          <BrandsSectionEditor register={register} errors={errors} />
          <MomentsEditor register={register} errors={errors} />
          <AwardsEditor register={register} errors={errors} />
          <FranchiseProcessEditor register={register} errors={errors} />
          <CTAEditor register={register} errors={errors} />
          <SEOEditor register={register} errors={errors} />
        </form>

        <PublishBar
          status={currentStatus}
          isSaving={saveMutation.isPending}
          isDirty={isDirty}
          autoSaveStatus={autoSaveStatus}
          onSaveDraft={() => submitWithStatus('Draft')}
          onPublish={() => submitWithStatus('Published')}
        />
      </div>
    </>
  )
}

export default HomepageCMS
