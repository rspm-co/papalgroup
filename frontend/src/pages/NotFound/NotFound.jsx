import NotFoundState from '../../components/common/NotFoundState'
import { pageMeta } from '../../constants/site'

const NotFound = () => {
  return (
    <NotFoundState
      title={pageMeta.notFound.title}
      description={pageMeta.notFound.description}
    />
  )
}

export default NotFound
