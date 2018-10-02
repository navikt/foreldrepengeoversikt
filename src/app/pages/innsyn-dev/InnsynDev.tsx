import * as React from 'react';
import Sak from '../../types/Sak';
import SaksoversiktDev from '../../components/saksoversikt-dev/SaksoversiktDev';
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
                <SaksoversiktDev title={'Opprettet:'} sakstatus={Status.OPPRETTET} saker={saker} />
                <SaksoversiktDev title={'Løpende:'} sakstatus={Status.LØPENDE} saker={saker} />
                <SaksoversiktDev title={'Under Behandling:'} sakstatus={Status.UNDER_BEHANDLING} saker={saker} />
                <SaksoversiktDev title={'Avsluttet:'} sakstatus={Status.AVSLUTTET} saker={saker} />
            </div>
        );
    }
}
export default InnsynDev;
