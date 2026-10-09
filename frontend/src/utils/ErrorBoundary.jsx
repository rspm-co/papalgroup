import { Component } from 'react'
import ErrorState from '../components/common/ErrorState'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Unable to render this page"
          description="Please refresh the page or return later."
          actionLabel="Try Again"
          onAction={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
