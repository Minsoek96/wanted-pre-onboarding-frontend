import React, { Component, ReactNode } from "react";

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>; // 여기에 fallback UI를 추가하세요.
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
