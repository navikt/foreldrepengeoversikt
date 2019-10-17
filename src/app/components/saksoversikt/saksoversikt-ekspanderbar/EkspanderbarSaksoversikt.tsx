import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import Sak from '../../../api/types/sak/Sak';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';
import Saksoversikt from '../saksoversikt-main/Saksoversikt';
import { getSaksoversiktTitle } from '../utils';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';

import './ekspanderbarSaksoversikt.less';

interface Props {
    søkerinfo?: Søkerinfo;
    sak: Sak;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
}

const EkspanderbarSaksoversikt: React.StatelessComponent<Props> = ({ sak, søkerinfo, history, historikkInnslagListe }) => {
    const cls = BEMHelper('ekspanderbar-saksoversikt');
    return (
        <div className={cls.className}>
            <EkspanderbartpanelBase
                heading={<EkspanderbarSaksoversiktHeader sak={sak} />}
                ariaTittel={getSaksoversiktTitle(sak)}>
                <Saksoversikt sak={sak} history={history} søkerinfo={søkerinfo} historikkInnslagListe={historikkInnslagListe} />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbarSaksoversikt;
