import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import SakBase from '../../../api/types/sak/Sak';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';
import Saksoversikt from '../saksoversikt-main/Saksoversikt';
import { getSaksoversiktTitle } from '../utils';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';

import './ekspanderbarSaksoversikt.less';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

interface Props {
    søkerinfo?: Søkerinfo;
    sak: SakBase;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
    manglendeVedlegg: ManglendeVedlegg[];
}

const EkspanderbarSaksoversikt: React.StatelessComponent<Props> = ({
    sak,
    søkerinfo,
    history,
    historikkInnslagListe,
    manglendeVedlegg
}) => {
    const cls = BEMHelper('ekspanderbar-saksoversikt');
    return (
        <div className={cls.block}>
            <EkspanderbartpanelBase
                heading={<EkspanderbarSaksoversiktHeader sak={sak} />}
                ariaTittel={getSaksoversiktTitle(sak)}>
                <Saksoversikt
                    sak={sak}
                    history={history}
                    søkerinfo={søkerinfo}
                    historikkInnslagListe={historikkInnslagListe}
                    manglendeVedlegg={manglendeVedlegg}
                />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbarSaksoversikt;
