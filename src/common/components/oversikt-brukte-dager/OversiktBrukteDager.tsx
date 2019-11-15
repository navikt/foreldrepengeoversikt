import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { getSituasjonForelderSvg } from '../foreldrepar/foreldreparUtils';

import TilesList from '../tiles-list/TilesList';
import Personkort from '../personkort/Personkort';
import ForelderIkon from '../foreldrepar/ForelderIkon';
import { getVarighetString } from 'app/utils/periodeUtils';
import Uttaksoppsummering from '../uttaksoppsummering/Uttaksoppsummering';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { ForeldreparSituasjon } from '../foreldrepar/foreldreparTypes';

import './oversiktBrukteDager.less';

export interface NavnPåForeldre {
    mor: string;
    farMedmor: string;
}

interface Props {
    erDeltUttak: boolean;
    erFarMedmor: boolean;
    resterendeStønadskonter: TilgjengeligStønadskonto[];
    brukteStønadskontoer: {
        mor: number;
        farMedmor: number;
    };
    navnPåForeldre: NavnPåForeldre;
}


const OversiktBrukteDager: React.StatelessComponent<Props & InjectedIntlProps> = ({
    resterendeStønadskonter,
    brukteStønadskontoer,
    navnPåForeldre,
    erDeltUttak,
    erFarMedmor,
    intl
}) => {
    // TODO utled situasjon
    const situasjon = ForeldreparSituasjon.farOgMor;
    const info = getSituasjonForelderSvg(situasjon);
    const bem = BEMHelper('oversiktBrukteDager');
    return (
        <div className={bem.block}>
            <div className={bem.element('brukteDager')}>
                <Undertittel tag="h2" className="blokk-xs">
                    <FormattedMessage
                        id="oversiktBrukteDager.tittel.foreldre"
                        values={{ antall: erDeltUttak ? 2 : 1 }}
                    />
                </Undertittel>
                <TilesList columns={'flex'}>
                    {(erDeltUttak || !erFarMedmor) && (
                        <Personkort ikon={<ForelderIkon forelder={info.mor} />} tittel={navnPåForeldre.mor}>
                            <strong>{getVarighetString(brukteStønadskontoer.mor, intl)}</strong>
                        </Personkort>
                    )}
                    {(erDeltUttak || erFarMedmor) && (
                        <Personkort ikon={<ForelderIkon forelder={info.farMedmor} />} tittel={navnPåForeldre.farMedmor}>
                            <strong>{getVarighetString(brukteStønadskontoer.farMedmor, intl)}</strong>
                        </Personkort>
                    )}
                </TilesList>
            </div>
            <div className={bem.element('ikkeBrukteDager')}>
                <Uttaksoppsummering
                    navnPåForeldre={navnPåForeldre}
                    resterendeStønadskonter={resterendeStønadskonter}
                    erDeltUttak={erDeltUttak}
                />
            </div>
        </div>
    );
};

export default injectIntl(OversiktBrukteDager);
