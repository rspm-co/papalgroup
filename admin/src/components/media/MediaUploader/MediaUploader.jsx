import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUploadCloud, FiX } from 'react-icons/fi'
import { mediaFolders } from '../../../constants/media.js'

const MediaUploader = ({ isOpen, isUploading, progress, onClose, onUpload }) => {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      folder: 'General',
      alt: '',
      tags: '',
    },
  })

  const fileNames = useMemo(() => files.map((file) => file.name).join(', '), [files])

  const addFiles = useCallback((fileList) => {
    const selectedFiles = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'))
    setFiles((currentFiles) => [...currentFiles, ...selectedFiles].slice(0, 20))
  }, [])

  const closeUploader = () => {
    if (isUploading) return
    setFiles([])
    reset()
    onClose()
  }

  const submitUpload = (values) => {
    if (!files.length) return
    onUpload(files, {
      folder: values.folder,
      alt: values.alt,
      tags: values.tags,
    })
  }

  if (!isOpen) return null

  return (
    <div className="media-modal-backdrop" role="presentation">
      <section className="media-modal media-uploader" role="dialog" aria-modal="true" aria-labelledby="media-upload-title">
        <div className="media-modal-header">
          <div>
            <p>Digital Asset Management</p>
            <h2 id="media-upload-title">Upload media</h2>
          </div>
          <button type="button" onClick={closeUploader} aria-label="Close uploader">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitUpload)}>
          <label
            className={`media-dropzone ${isDragging ? 'dragging' : ''}`}
            onDragEnter={() => setIsDragging(true)}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              addFiles(event.dataTransfer.files)
            }}
          >
            <FiUploadCloud />
            <strong>Drag images here or browse files</strong>
            <span>PNG, JPEG, WEBP or SVG. Up to 20 images per upload.</span>
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" multiple onChange={(event) => addFiles(event.target.files)} />
          </label>

          {files.length > 0 && (
            <div className="selected-files" aria-live="polite">
              <strong>{files.length} file{files.length > 1 ? 's' : ''} selected</strong>
              <span>{fileNames}</span>
            </div>
          )}

          <div className="media-form-grid">
            <label>
              Folder
              <select {...register('folder')}>
                {mediaFolders.map((folder) => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
              </select>
            </label>
            <label>
              Alt text
              <input {...register('alt')} placeholder="Describe the image" />
            </label>
            <label className="span-two">
              Tags
              <input {...register('tags')} placeholder="homepage, brand, award" />
            </label>
          </div>

          {isUploading && (
            <div className="upload-progress" aria-label="Upload progress">
              <span style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="media-modal-actions">
            <button type="button" className="secondary-button" onClick={closeUploader} disabled={isUploading}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={!files.length || isUploading}>
              {isUploading ? `Uploading ${progress}%` : 'Upload Assets'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default MediaUploader
