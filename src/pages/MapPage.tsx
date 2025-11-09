import { Component, ErrorInfo, ReactNode } from "react";
import MapView from "../components/MapView";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("MapView Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: "calc(100vh - 64px)", 
          width: "100%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "20px",
          textAlign: "center"
        }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#dc2626" }}>
              Error loading map
            </h3>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function MapPage() {
  return (
    <div style={{ height: "calc(100vh - 64px)", width: "100%", position: "relative" }}>
      <ErrorBoundary>
        <MapView />
      </ErrorBoundary>
    </div>
  );
}

