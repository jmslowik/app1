import React from "react";

interface ErrorBoundaryState {
    hasError?: boolean
}

class ErrorBoundary extends React.Component<{},ErrorBoundaryState> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Zaktualizuj stan, aby następny render pokazał zastępcze UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Możesz wyrenderować dowolny interfejs zastępczy.
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary