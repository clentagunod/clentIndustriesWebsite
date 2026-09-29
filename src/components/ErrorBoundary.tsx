import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State { failed: boolean }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="container page">
          <h1>Something went wrong</h1>
          <p>Reload the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
