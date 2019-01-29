import * as React from 'react';
import Tabs from 'nav-frontend-tabs';
import { Systemtittel } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import Sak from '../../types/Sak';
import { FormattedMessage } from 'react-intl';
import Historikk from '../historikk/Historikk';

import './oversikt.less';

interface OversiktProps {
    sak: Sak;
}

interface State {
    aktivTab: number;
}

type Props = OversiktProps;
class Oversikt extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            aktivTab: 0
        };

        this.handleTabOnClick = this.handleTabOnClick.bind(this);
    }

    handleTabOnClick(e: any, index: number) {
        this.setState({ aktivTab: index });
    }

    render() {
        const cls = BEMHelper('oversikt');

        const { sak } = this.props;
        return (
            <div className={cls.className}>
                <Systemtittel className={cls.element('title')}>
                    <FormattedMessage id="oversikt" />
                </Systemtittel>
                <Tabs
                    tabs={[{ label: 'Historikk' }, { label: 'Dokumenter' }]}
                    kompakt={true}
                    onChange={this.handleTabOnClick}
                />
                {this.state.aktivTab === 0 && <Historikk sak={sak || []} />}
                {this.state.aktivTab === 1 && <p>Ikke implementert</p>}
            </div>
        );
    }
}
export default Oversikt;
