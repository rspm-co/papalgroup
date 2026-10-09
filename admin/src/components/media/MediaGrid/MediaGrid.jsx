import MediaCard from '../MediaCard'

const MediaGrid = ({ items, onPreview, onEdit, onDelete, onCopy }) => (
  <section className="media-grid" aria-label="Media grid">
    {items.map((media) => (
      <MediaCard
        key={media._id || media.id}
        media={media}
        onPreview={onPreview}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
      />
    ))}
  </section>
)

export default MediaGrid
