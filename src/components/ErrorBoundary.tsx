import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("VEIL App Error uncaught:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = "/";
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-[#EDEAE2] flex flex-col items-center justify-center p-6 font-sans selection:bg-[#7D4BE3] selection:text-white">
          <div className="max-w-md w-full bg-[#0E0E10] border border-[rgba(237,234,226,0.06)] rounded-2xl p-8 md:p-10 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#7D4BE3] opacity-20 blur-[100px] pointer-events-none" />
            
            {/* Veil Emblem Graphic Accent */}
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full border border-[rgba(237,234,226,0.1)] bg-[rgba(255,255,255,0.02)]">
              <svg className="w-6 h-6 text-[#7D4BE3] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
            </div>

            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#EDEAE2] mb-3">
              Execution Suspended
            </h1>
            
            <p className="text-sm text-[#8E8B82] leading-relaxed mb-6">
              An unexpected runtime error halted the UI thread. The cryptographic state remains secure.
            </p>

            {this.state.error && (
              <div className="bg-[#050505] border border-[rgba(237,234,226,0.04)] rounded-xl p-4 text-left font-mono text-[11px] text-[#A6A296] overflow-x-auto max-h-36 mb-6 custom-scrollbar leading-relaxed">
                <span className="text-[#DE5E5E] font-semibold">Error:</span> {this.state.error.message || "Unknown error"}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 px-5 rounded-full bg-[#7D4BE3] hover:bg-[#8C5CEF] active:bg-[#6C3CD3] text-[#EDEAE2] font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(125,75,227,0.35)]"
            >
              Restart Terminal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
