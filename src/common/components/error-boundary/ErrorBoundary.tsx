import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Feilsidemelding from '../feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import { lenker } from 'app/utils/lenker';
import * as Sentry from '@sentry/browser';

interface State {
    eventId: string | null;
    hasError: boolean;
}

type Props = InjectedIntlProps;
class ErrorBoundary extends React.Component<InjectedIntlProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            eventId: null,
            hasError: false
        };
    }

    componentDidCatch(error: Error | null, errorInfo: object) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });

        this.setState({ hasError: true });
    }

    render() {
        const { intl } = this.props;
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <Feilsidemelding
                illustrasjon={{
                    tittel: getMessage(intl, 'feilside.bobletittel'),
                    tekst: getMessage(intl, 'feilside.bobletekst')
                }}
                tittel={getMessage(intl, 'feilside.tittel')}
                ingress={
                    <FormattedMessage
                        id="feilside.ingress"
                        values={{
                            lenke: (
                                <Lenke href={lenker.brukerstøtte}>{getMessage(intl, 'feilside.ingress.lenke')}</Lenke>
                            )
                        }}
                    />
                }
            />
        );
    }
}
export default injectIntl(ErrorBoundary);
