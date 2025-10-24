/**
 * Production Logger for Vercel Deployment
 * Provides structured logging for debugging in production
 */

export interface LogLevel {
    DEBUG: 'debug';
    INFO: 'info';
    WARN: 'warn';
    ERROR: 'error';
}

export interface LogEntry {
    timestamp: string;
    level: keyof LogLevel;
    message: string;
    data?: any;
    source?: string;
    userId?: string;
    sessionId?: string;
}

class ProductionLogger {
    private isDebugEnabled: boolean;
    private isProduction: boolean;
    private sessionId: string;

    constructor() {
        this.isDebugEnabled = import.meta.env.VITE_ENABLE_DEBUG === 'true';
        this.isProduction = import.meta.env.PROD;
        this.sessionId = this.generateSessionId();
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private formatLogEntry(level: keyof LogLevel, message: string, data?: any, source?: string): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
            source: source || 'unknown',
            sessionId: this.sessionId
        };
    }

    private shouldLog(level: keyof LogLevel): boolean {
        if (level === 'DEBUG') {
            return this.isDebugEnabled;
        }
        return true; // Always log INFO, WARN, ERROR
    }

    private log(level: keyof LogLevel, message: string, data?: any, source?: string): void {
        if (!this.shouldLog(level)) return;

        const logEntry = this.formatLogEntry(level, message, data, source);

        // Console logging
        const consoleMethod = level === 'ERROR' ? 'error' :
            level === 'WARN' ? 'warn' :
                level === 'DEBUG' ? 'log' : 'log';

        console[consoleMethod](`[${level}] ${message}`, data ? { ...logEntry, data } : logEntry);

        // In production, you might want to send logs to an external service
        if (this.isProduction && level === 'ERROR') {
            this.sendToExternalService(logEntry);
        }
    }

    private async sendToExternalService(logEntry: LogEntry): Promise<void> {
        try {
            // Example: Send to Vercel Analytics or external logging service
            if (typeof window !== 'undefined' && (window as any).va) {
                (window as any).va('track', 'error', {
                    message: logEntry.message,
                    data: logEntry.data,
                    sessionId: logEntry.sessionId
                });
            }
        } catch (error) {
            console.error('Failed to send log to external service:', error);
        }
    }

    // Public logging methods
    debug(message: string, data?: any, source?: string): void {
        this.log('DEBUG', message, data, source);
    }

    info(message: string, data?: any, source?: string): void {
        this.log('INFO', message, data, source);
    }

    warn(message: string, data?: any, source?: string): void {
        this.log('WARN', message, data, source);
    }

    error(message: string, error?: Error, source?: string): void {
        const errorData = error ? {
            name: error.name,
            message: error.message,
            stack: error.stack
        } : undefined;

        this.log('ERROR', message, errorData, source);
    }

    // Performance logging
    performance(action: string, startTime: number, data?: any): void {
        const duration = Date.now() - startTime;
        this.info(`Performance: ${action}`, { duration, ...data }, 'performance');
    }

    // User action logging
    userAction(action: string, data?: any): void {
        this.info(`User Action: ${action}`, data, 'user-action');
    }

    // Theme transition logging
    themeTransition(from: string, to: string, duration: number): void {
        this.info('Theme Transition', { from, to, duration }, 'theme-transition');
    }

    // Page transition logging
    pageTransition(from: string, to: string, duration: number): void {
        this.info('Page Transition', { from, to, duration }, 'page-transition');
    }

    // Wallet connection logging
    walletConnection(action: string, data?: any): void {
        this.info(`Wallet ${action}`, data, 'wallet');
    }

    // API call logging
    apiCall(method: string, url: string, status: number, duration: number): void {
        this.info(`API ${method} ${url}`, { status, duration }, 'api');
    }
}

// Export singleton instance
export const logger = new ProductionLogger();
