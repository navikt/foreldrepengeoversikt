import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import Sak from '../../../api/types/sak/Sak';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';
import Person from '../../../api/types/personinfo/Personinfo';
import Saksoversikt from '../saksoversikt-main/Saksoversikt';
import { getSaksoversiktTitle } from '../utils';

import './ekspanderbarSaksoversikt.less';

interface Props {
    søker?: Person;
    sak: Sak;
    history: History;
}

const EkspanderbarSaksoversikt: React.FunctionComponent<Props> = (props) => {
    const { sak, søker, history } = props;
    const cls = BEMHelper('ekspanderbar-saksoversikt');
    return (
        <div className={cls.className}>
            <EkspanderbartpanelBase
                heading={<EkspanderbarSaksoversiktHeader sak={sak} />}
                ariaTittel={getSaksoversiktTitle(sak)}>
                <Saksoversikt sak={sak} history={history} søker={søker} />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbarSaksoversikt;
