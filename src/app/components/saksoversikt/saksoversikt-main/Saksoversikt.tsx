import React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import SaksinformasjonPanel from 'app/components/saksinformasjon-panel/SaksinformasjonPanel';
import SøkNåPanel from 'app/components/søk-nå-panel/SøkNåPanel';

import Sak from '../../../api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import SaksoversiktHeader from './SaksoversiktHeader';
import Etikett from '../../etikett/etikett';
import { harSøkt } from 'app/utils/sakerUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    søkerinfo?: Søkerinfo;
    historikkInnslagListe: HistorikkInnslag[];
    history: History;
    withHeader?: boolean;
}

const Saksoversikt: React.StatelessComponent<Props> = ({
    sak,
    historikkInnslagListe,
    withHeader = false,
    søkerinfo,
    history
}) => {
    const cls = BEMHelper('saksoversikt');
    return (
        <div className={cls.className}>
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
                />
            ) : (
                <SøkNåPanel søker={søkerinfo ? søkerinfo.person : undefined} />
            )}
        </div>
    );
};

export default Saksoversikt;
