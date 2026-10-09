import { classNames } from '../../utils/classNames'
import { containerClasses } from '../../styles/theme'

const Container = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={classNames(containerClasses, className)}>
      {children}
    </Component>
  )
}

export default Container
