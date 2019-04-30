import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import Sak from '../../types/Sak';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';
import Person from '../../types/Personinfo';
import Saksoversikt from '../saksoversikt/Saksoversikt';

import './ekspanderbarSaksoversikt.less';

interface Props {
    person?: Person;
    sak: Sak;
    history: History;
}

class EkspanderbarSaksoversikt extends React.Component<Props> {
    render() {
        const { sak, person, history } = this.props;
        const cls = BEMHelper('ekspanderbar-saksoversikt');

        return (
            <div className={cls.className}>
                <EkspanderbartpanelBase
                    heading={<EkspanderbarSaksoversiktHeader sak={sak} />}
                    ariaTittel="søknad om foreldrepenger">
                    <Saksoversikt sak={sak} history={history} person={person} />
                </EkspanderbartpanelBase>
            </div>
        );
    }
}

export default EkspanderbarSaksoversikt;
