import * as React from 'react';
import { BotInfo, BrowserInfo, detect, NodeInfo } from 'detect-browser';
import Api from '../../../app/api/api';
import { Feature, isFeatureEnabled } from '../../../app/Feature';

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.logError = this.logError.bind(this);
    }

    componentDidCatch(error: Error | null, reactStackTrace: object) {
        if (isFeatureEnabled(Feature.logging)) {
            this.logError(error, detect(), reactStackTrace);
        }
    }

    logError(
        error: Error | null | undefined,
        browserInfo: BrowserInfo | BotInfo | NodeInfo | null | false,
        reactStackTrace?: any
    ) {
        Api.log({
            message: error ? error.message : undefined,
            trace: error ? error.stack : undefined,
            componentStack:
                reactStackTrace && reactStackTrace.componentStack ? reactStackTrace.componentStack : undefined,
            browserInfo
        });
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
