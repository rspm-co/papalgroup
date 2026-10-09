import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <main className="screen-loader"><section className="dashboard-state" role="alert"><h1>Unable to open this page</h1><p>Reload to get the latest version of the admin app.</p><button type="button" className="primary-button" onClick={() => window.location.reload()}>Reload page</button></section></main>
    return this.props.children
  }
}
export default ErrorBoundary
