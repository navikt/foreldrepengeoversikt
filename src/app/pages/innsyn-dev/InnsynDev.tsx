import * as React from 'react';
import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';
import { Status } from '../../types/Status';
import './innsynDev.less';

interface Props {
    saker: Sak[];
}

class InnsynDev extends React.Component<Props> {
    render() {
        const saker = this.props.saker;
        return (
            <div className="innsynDev">
                <h1>Foreldrepengeoversikt</h1>
                <Saksoversikt title={'Opprettet:'} sakstatus={Status.OPPRETTET} saker={saker} />
                <Saksoversikt title={'Løpende:'} sakstatus={Status.LØPENDE} saker={saker} />
                <Saksoversikt title={'Under Behandling:'} sakstatus={Status.UNDER_BEHANDLING} saker={saker} />
                <Saksoversikt title={'Avsluttet:'} sakstatus={Status.AVSLUTTET} saker={saker} />
            </div>
        );
    }
}
export default InnsynDev;
