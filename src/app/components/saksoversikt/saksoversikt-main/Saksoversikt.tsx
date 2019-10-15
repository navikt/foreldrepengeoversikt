import React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import SaksinformasjonPanel from 'app/components/saksinformasjon-panel/SaksinformasjonPanel';
import SøkNåPanel from 'app/components/søk-nå-panel/SøkNåPanel';

import Sak from '../../../api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import Person from '../../../api/types/personinfo/Personinfo';
import SaksoversiktHeader from './SaksoversiktHeader';
import Etikett from '../../etikett/etikett';
import { harSøkt } from 'app/utils/sakerUtils';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    søker?: Person;
    historikkInnslagListe?: HistorikkInnslag[];
    history: History;
    withHeader?: boolean;
}

const Saksoversikt: React.StatelessComponent<Props> = ({
    sak,
    historikkInnslagListe,
    withHeader = false,
    søker,
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
                    søker={søker}
                    sak={sak}
                    historikkInnslagListe={historikkInnslagListe}
                    history={history}
                />
            ) : (
                <SøkNåPanel søker={søker} />
            )}

        </div>
    );
};

export default Saksoversikt;
