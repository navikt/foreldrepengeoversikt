import * as React from 'react';
import Tabs from 'nav-frontend-tabs';
import { FormattedMessage } from 'react-intl';
import Historikk from '../historikk/Historikk';
import Person from '../../types/Personinfo';
import Dokumentoversikt from '../dokumentoversikt/Dokumentoversikt';
import SectionSeparator from '../section-separator/SectionSeparator';
import { Hendelse } from '../historikk/HistorikkElement';

import './oversikt.less';

interface OversiktProps {
    person?: Person;
    hendelser: Hendelse[];
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
        return (
            <SectionSeparator title={<FormattedMessage id="oversikt" />}>
                <Tabs
                    tabs={[{ label: 'Historikk' }, { label: 'Dokumenter' }]}
                    kompakt={true}
                    onChange={this.handleTabOnClick}
                />
                {this.state.aktivTab === 0 && <Historikk person={this.props.person} hendelser={this.props.hendelser} />}
                {this.state.aktivTab === 1 && <Dokumentoversikt />}
            </SectionSeparator>
        );
    }
}
export default Oversikt;
