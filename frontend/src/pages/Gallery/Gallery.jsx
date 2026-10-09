import { useCallback, useMemo, useState } from 'react'
import {
  GalleryCTA,
  GalleryFilter,
  GalleryGrid,
  GalleryModal,
  GalleryPagination,
  galleryCategories,
  galleryItems,
} from '../../components/gallery'

const INITIAL_VISIBLE_COUNT = 8
const LOAD_MORE_COUNT = 4

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [activeItemId, setActiveItemId] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryItems
    }

    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  )

  const activeItem = useMemo(
    () => filteredItems.find((item) => item.id === activeItemId),
    [activeItemId, filteredItems],
  )

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    setActiveItemId(null)
  }

  const handleLoadMore = () => {
    setVisibleCount((currentCount) => currentCount + LOAD_MORE_COUNT)
  }

  const closeModal = useCallback(() => {
    setActiveItemId(null)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveItemId((currentId) => {
      const currentIndex = filteredItems.findIndex((item) => item.id === currentId)
      const nextIndex =
        currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1

      return filteredItems[nextIndex]?.id || null
    })
  }, [filteredItems])

  const showNext = useCallback(() => {
    setActiveItemId((currentId) => {
      const currentIndex = filteredItems.findIndex((item) => item.id === currentId)
      const nextIndex =
        currentIndex >= filteredItems.length - 1 ? 0 : currentIndex + 1

      return filteredItems[nextIndex]?.id || null
    })
  }, [filteredItems])

  return (
    <>
      <GalleryFilter
        categories={galleryCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <GalleryGrid items={visibleItems} onOpen={setActiveItemId} />
      <GalleryPagination
        visibleCount={visibleItems.length}
        totalCount={filteredItems.length}
        onLoadMore={handleLoadMore}
      />
      <GalleryCTA />
      <GalleryModal
        item={activeItem}
        isOpen={Boolean(activeItem)}
        onClose={closeModal}
        onPrevious={showPrevious}
        onNext={showNext}
        canNavigate={filteredItems.length > 1}
      />
    </>
  )
}

export default Gallery
