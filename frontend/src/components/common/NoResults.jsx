import EmptyState from './EmptyState'

const NoResults = ({
  title = 'No results found',
  description = 'Try adjusting your filters or search terms.',
}) => {
  return <EmptyState title={title} description={description} />
}

export default NoResults
