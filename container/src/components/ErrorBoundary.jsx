import React, { Component } from "react";
import server from "../../public/assets/server.gif"
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
         return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
         console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
             return <>
             <div className="d-flex justify-content-center">
             <img src={server} width="500px" height="500px"/></div></>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;