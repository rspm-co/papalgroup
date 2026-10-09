const JobSEO = ({ register }) => (
  <section className="gallery-form-section">
    <div>
      <p>Search Preview</p>
      <h3>SEO Settings</h3>
    </div>
    <label>
      Meta Title
      <input {...register('seo.metaTitle', { maxLength: 70 })} placeholder="Job opening meta title" />
    </label>
    <label>
      Meta Description
      <textarea rows="3" {...register('seo.metaDescription', { maxLength: 160 })} placeholder="Short search description" />
    </label>
    <label>
      Keywords
      <input {...register('seo.keywords')} placeholder="careers, jobs, hiring" />
    </label>
  </section>
)

export default JobSEO
