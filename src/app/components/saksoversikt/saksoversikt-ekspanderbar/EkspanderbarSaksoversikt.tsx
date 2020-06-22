import * as React from 'react';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import BEMHelper from 'common/util/bem';
import SakBase from '../../../api/types/sak/Sak';
import Saksoversikt from '../saksoversikt-main/Saksoversikt';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';

import './ekspanderbarSaksoversikt.less';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';
import EkspanderbarSaksoversiktHeader from './EkspanderbarSaksoversiktHeader';

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
    manglendeVedlegg,
}) => {
    const [open, setOpen] = React.useState(false);
    const cls = BEMHelper('ekspanderbar-saksoversikt');

    return (
        <div className={cls.block}>
            <EkspanderbartpanelBase
                tittel={<EkspanderbarSaksoversiktHeader sak={sak} />}
                apen={open}
                onClick={() => setOpen(!open)}
            >
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
