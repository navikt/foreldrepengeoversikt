import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { History } from 'history';
import BEMHelper from 'common/util/bem';
import ResponsiveWrapper from '../ResponsiveWrapper';
import SimpleIllustration from 'common/components/simple-illustration/SimpleIllustration';

export interface Props {
    history: History;
}

export interface State {
    errorStatusCode?: number;
    timeout?: boolean;
}

class ErrorPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...this.props.history.location.state
        };
    }

    componentWillMount(): void {
        if (!this.state.errorStatusCode && !this.state.timeout) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errorStatusCode, timeout } = this.state;
        if (!errorStatusCode && !timeout) {
            return null;
        }

        const cls = BEMHelper('error-page');
        return (
            <div id={cls.className}>
                <SimpleIllustration
                    dialog={{
                        title: 'tittel',
                        text: (
                            <div>
                                <div>text</div>
                            </div>
                        )
                    }}
                />
                <ResponsiveWrapper>
                    <Innholdstittel className={cls.element('title')}>
                        <FormattedMessage id={'errorPage.title'} />
                    </Innholdstittel>
                    <Ingress className={cls.element('message')}>
                        <FormattedMessage id={'errorPage.message'} />
                    </Ingress>
                </ResponsiveWrapper>
            </div>
        );
    }
}

export default ErrorPage;
