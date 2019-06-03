import * as React from 'react';
import Tabs from 'nav-frontend-tabs';
import { Systemtittel } from 'nav-frontend-typografi';

import Sak from '../../types/Sak';
import { FormattedMessage } from 'react-intl';
import Historikk from '../historikk/Historikk';
import Person from '../../types/Personinfo';
import Dokumentoversikt from '../dokumentoversikt/Dokumentoversikt';
import { utledHendelser } from '../historikk/util';

import './oversikt.less';
import BEMHelper from 'common/util/bem';

interface OversiktProps {
    person?: Person;
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
        const { sak } = this.props;
        const hendelser = utledHendelser(sak.behandlinger);

        const cls = BEMHelper('oversikt');
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
                {this.state.aktivTab === 0 && <Historikk person={this.props.person} hendelser={hendelser} />}
                {this.state.aktivTab === 1 && <Dokumentoversikt />}
            </div>
        );
    }
}
export default Oversikt;
