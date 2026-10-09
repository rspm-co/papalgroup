import { mediaFolders } from '../../../constants/media.js'

const MediaFolderTree = ({ activeFolder, onSelect }) => (
  <aside className="media-folder-tree" aria-label="Media folders">
    <p>Folders</p>
    <button type="button" className={!activeFolder ? 'active' : ''} onClick={() => onSelect('')}>
      All Media
    </button>
    {mediaFolders.map((folder) => (
      <button
        type="button"
        key={folder}
        className={activeFolder === folder ? 'active' : ''}
        onClick={() => onSelect(folder)}
      >
        {folder}
      </button>
    ))}
  </aside>
)

export default MediaFolderTree
