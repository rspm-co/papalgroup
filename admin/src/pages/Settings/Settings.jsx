import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  AnalyticsSettings,
  BrandingSettings,
  BusinessHours,
  CompanySettings,
  ContactSettings,
  ErrorState,
  LoadingState,
  MaintenanceSettings,
  OfficeAddress,
  SaveBar,
  SEOSettings,
  SettingsToolbar,
  SocialLinks,
  SuccessToast,
} from '../../components/settings'
import { defaultSettingsValues } from '../../constants/settings.js'
import { getSettings, updateSettings } from '../../services/settings.js'

const normalizeSettings = (settings = {}) => ({
  ...defaultSettingsValues,
  ...settings,
  id: settings._id || settings.id || '',
  businessHours: {
    ...defaultSettingsValues.businessHours,
    ...settings.businessHours,
  },
  socialLinks: {
    ...defaultSettingsValues.socialLinks,
    ...settings.socialLinks,
  },
  seo: {
    ...defaultSettingsValues.seo,
    ...settings.seo,
    defaultKeywords: Array.isArray(settings.seo?.defaultKeywords)
      ? settings.seo.defaultKeywords.join(', ')
      : settings.seo?.defaultKeywords || '',
  },
  analytics: {
    ...defaultSettingsValues.analytics,
    ...settings.analytics,
  },
  primaryBrandColor: settings.primaryBrandColor || settings.branding?.primaryBrandColor || defaultSettingsValues.primaryBrandColor,
  secondaryBrandColor: settings.secondaryBrandColor || settings.branding?.secondaryBrandColor || defaultSettingsValues.secondaryBrandColor,
})

const buildPayload = (values) => ({
  companyName: values.companyName,
  tagline: values.tagline,
  website: values.website,
  logo: values.logo,
  favicon: values.favicon,
  primaryBrandColor: values.primaryBrandColor,
  secondaryBrandColor: values.secondaryBrandColor,
  primaryEmail: values.primaryEmail,
  supportEmail: values.supportEmail,
  phone: values.phone,
  whatsapp: values.whatsapp,
  address: values.address,
  city: values.city,
  state: values.state,
  country: values.country,
  postalCode: values.postalCode,
  googleMapsEmbed: values.googleMapsEmbed,
  businessHours: values.businessHours,
  socialLinks: values.socialLinks,
  seo: {
    ...values.seo,
    defaultKeywords: values.seo.defaultKeywords
      ? values.seo.defaultKeywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
      : [],
  },
  analytics: values.analytics,
  maintenanceMode: Boolean(values.maintenanceMode),
  maintenanceMessage: values.maintenanceMessage,
})

const Settings = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: defaultSettingsValues, mode: 'onBlur' })

  const settingsQuery = useQuery({
    queryKey: ['website-settings'],
    queryFn: getSettings,
  })

  const saveMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (settings) => {
      const nextValues = normalizeSettings(settings)
      reset(nextValues)
      queryClient.setQueryData(['website-settings'], settings)
      toast.success(<SuccessToast message="Website settings saved successfully" />)
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to save settings'),
  })

  useEffect(() => {
    if (settingsQuery.data) {
      reset(normalizeSettings(settingsQuery.data))
    }
  }, [settingsQuery.data, reset])

  useEffect(() => {
    if (!isDirty) return undefined
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const saveSettings = handleSubmit((values) => {
    saveMutation.mutate({
      id: values.id,
      payload: buildPayload(values),
    })
  })

  const resetChanges = () => {
    reset(normalizeSettings(settingsQuery.data))
  }

  if (settingsQuery.isLoading) {
    return <LoadingState />
  }

  if (settingsQuery.isError) {
    return (
      <ErrorState
        message={settingsQuery.error?.response?.data?.message}
        onRetry={() => settingsQuery.refetch()}
      />
    )
  }

  return (
    <>
      <Helmet>
        <title>Website Settings | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="settings-page">
        <header className="cms-page-heading">
          <div>
            <p>Settings</p>
            <h1>Website Settings</h1>
            <span>Manage website-wide configuration, branding, contact information, SEO and tracking.</span>
          </div>
        </header>

        <SettingsToolbar isDirty={isDirty} isSaving={saveMutation.isPending} onReset={resetChanges} onSave={saveSettings} />

        <form className="settings-form" noValidate>
          <CompanySettings register={register} errors={errors} />
          <BrandingSettings register={register} />
          <ContactSettings register={register} errors={errors} />
          <OfficeAddress register={register} />
          <BusinessHours register={register} />
          <SocialLinks register={register} errors={errors} />
          <SEOSettings register={register} />
          <AnalyticsSettings register={register} />
          <MaintenanceSettings register={register} />
        </form>

        <SaveBar isDirty={isDirty} isSaving={saveMutation.isPending} onReset={resetChanges} onSave={saveSettings} />
      </div>
    </>
  )
}

export default Settings
