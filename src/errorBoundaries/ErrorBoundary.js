import React, { Component } from "react";
import { Coffee } from "react-feather";
import PropTypes from "prop-types";

import "./ErrorBoundary.scss";
/**
 *
 * to catch any unhandeled error and stop them from corrupting other app areas
 *
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      errorInfo: "",
      hasError: false,
    };
  }

  /**
   *
   * message to display when error occurs
   *
   */
  errorMessage() {
    return (
      <div className="error">
        <Coffee size={40} />
        <span>Something went wrong...</span>
      </div>
    );
  }

  /**
   *
   * @param {Error} error - sets state has error and error properties
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   *
   * @param error - gets error object
   * @param  errorInfo - geys error info object
   * sets error info in state
   *
   */
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.errorMessage();
    }
    // next code block goes here
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ErrorBoundary;
