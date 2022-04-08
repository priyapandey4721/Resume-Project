import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import "./ErrorBoundary.css";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <Alert variant="danger" className="alert">
            Login is Required !
          </Alert>
          <a href="/login">
            <button className="button">Go Back {"<<"} </button>
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
