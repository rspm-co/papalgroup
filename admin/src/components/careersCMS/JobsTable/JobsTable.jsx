import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import StatusBadge from '../StatusBadge'

const JobsTable = ({ items, onPreview, onEdit, onDelete, onDuplicate }) => (
  <div className="gallery-table-wrap">
    <table className="gallery-table careers-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Department</th>
          <th>Location</th>
          <th>Employment Type</th>
          <th>Work Mode</th>
          <th>Vacancies</th>
          <th>Status</th>
          <th>Application Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((job) => (
          <tr key={job._id || job.id}>
            <td>
              <strong>{job.title}</strong>
              <small>{job.slug}</small>
            </td>
            <td>{job.department}</td>
            <td>{job.location}</td>
            <td>{job.employmentType}</td>
            <td>{job.workMode}</td>
            <td>{job.vacancies ?? 1}</td>
            <td><StatusBadge status={job.status} /></td>
            <td>{job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString('en-IN') : '-'}</td>
            <td>
              <div className="gallery-actions">
                <button type="button" onClick={() => onPreview(job)} aria-label={`Preview ${job.title}`}><FiEye /></button>
                <button type="button" onClick={() => onEdit(job)} aria-label={`Edit ${job.title}`}><FiEdit3 /></button>
                <button type="button" onClick={() => onDuplicate(job)} aria-label={`Duplicate ${job.title}`}><FiCopy /></button>
                <button type="button" onClick={() => onDelete(job)} aria-label={`Delete ${job.title}`}><FiTrash2 /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default JobsTable
