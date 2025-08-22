import { Suspense } from 'react';
import { Component } from 'react';

type Props = {
    children: React.ReactNode;
    fallback: React.ComponentProps<typeof Suspense>['fallback'];
    renderError: React.ComponentProps<typeof ErrorBoundary>['renderFallback'];
};


import type { ErrorInfo } from 'react';

const logger = console;

type ErrorProps = {
    children: React.ReactNode;
    renderFallback: (error: Error) => React.ReactNode;
};

type State = {
    error: Error | null;
};

export class ErrorBoundary extends Component<ErrorProps, State> {
    constructor(props: ErrorProps) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        logger.error(error.message, { info });
    }

    render() {
        const { error } = this.state;
        const { children, renderFallback } = this.props;

        return error ? renderFallback(error) : children;
    }
}


export const LoadingBoundary = ({ children, fallback, renderError }: Props) => (
    <ErrorBoundary renderFallback={renderError}>
        <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
);
