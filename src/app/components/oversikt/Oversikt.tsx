import * as React from 'react';
import Tabs from 'nav-frontend-tabs';

import Sak from '../../types/Sak';
import { FormattedMessage } from 'react-intl';
import Historikk from '../historikk/Historikk';
import Person from '../../types/Personinfo';
import Dokumentoversikt from '../dokumentoversikt/Dokumentoversikt';
import { utledHendelser } from '../historikk/util';
import SectionSeparator from '../section-separator/SectionSeparator';

import './oversikt.less';

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
        return (
            <SectionSeparator title={<FormattedMessage id="oversikt" />}>
                <Tabs
                    tabs={[{ label: 'Historikk' }, { label: 'Dokumenter' }]}
                    kompakt={true}
                    onChange={this.handleTabOnClick}
                />
                {this.state.aktivTab === 0 && <Historikk person={this.props.person} hendelser={hendelser} />}
                {this.state.aktivTab === 1 && <Dokumentoversikt />}
            </SectionSeparator>
        );
    }
}
export default Oversikt;
