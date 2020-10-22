import React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import SaksinformasjonPanel from 'app/components/saksinformasjon-panel/SaksinformasjonPanel';
import SøkNåPanel from 'app/components/søk-nå-panel/SøkNåPanel';

import SakBase from '../../../api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import SaksoversiktHeader from './SaksoversiktHeader';
import Etikett from '../../etikett/etikett';
import { harSøkt } from 'app/utils/sakerUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

import './saksoversikt.less';

interface Props {
    sak: SakBase;
    søkerinfo?: Søkerinfo;
    historikkInnslagListe: HistorikkInnslag[];
    history: History;
    withHeader?: boolean;
    manglendeVedlegg: ManglendeVedlegg[];
}

const Saksoversikt: React.FunctionComponent<Props> = ({
    sak,
    historikkInnslagListe,
    withHeader = false,
    søkerinfo,
    manglendeVedlegg,
    history,
}) => {
    const cls = BEMHelper('saksoversikt');
    return (
        <div className={cls.block}>
            {withHeader ? (
                <SaksoversiktHeader sak={sak} />
            ) : (
                <Etikett
                    className="blokk-xs"
                    etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                    value={sak.saksnummer}
                />
            )}

            {harSøkt(sak) ? (
                <SaksinformasjonPanel
                    søkerinfo={søkerinfo}
                    sak={sak}
                    historikkInnslagListe={historikkInnslagListe}
                    history={history}
                    manglendeVedlegg={manglendeVedlegg}
                />
            ) : (
                <SøkNåPanel søker={søkerinfo ? søkerinfo.person : undefined} />
            )}
        </div>
    );
};

export default Saksoversikt;
