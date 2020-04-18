import React from "react";

import "./error-boundary.styles.scss";

import { ReactComponent as ErrorImage } from "../../assets/error.svg";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    return this.state.hasErrored ? (
      <div className="error">
        <div className="error-image">
          <ErrorImage />
        </div>
        <span>Oops! Something went wrong. Please try again.</span>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
