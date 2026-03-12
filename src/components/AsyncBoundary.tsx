import React, { Suspense } from "react";

type AsyncBoundaryProps = {
    fallback?: React.ReactNode;
    children: React.ReactNode; // ✅ Tell TS we accept children
};

// Simple ErrorBoundary
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: any }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return <div>Error: {this.state.error.message}</div>;
        }
        return this.props.children;
    }
}

// Suspense + ErrorBoundary wrapper
const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
                                                         fallback = <div>Loading...</div>,
                                                         children,
                                                     }) => (
    <ErrorBoundary>
        <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
);

export default AsyncBoundary;