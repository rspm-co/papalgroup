const LeadNotes = ({ register }) => (
  <section className="lead-panel">
    <div>
      <p>Internal Notes</p>
      <h3>Sales Team Notes</h3>
    </div>
    <label>
      Notes
      <textarea rows="5" {...register('internalNotes')} placeholder="Add follow-up notes, meeting summary or next action." />
    </label>
  </section>
)

export default LeadNotes
