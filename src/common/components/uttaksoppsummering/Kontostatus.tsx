import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import BEMHelper from 'common/util/bem';

import { Normaltekst } from 'nav-frontend-typografi';
import { StønadskontoType } from 'app/api/types/UttaksplanDto';
import { getVarighetString } from 'app/utils/periodeUtils';

import { NavnPåForeldre } from '../oversikt-brukte-dager/OversiktBrukteDager';
import StønadskontoIkon from 'app/components/ikoner/uttaksplanIkon/StønadskontoIkon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

import './kontostatus.less';

export interface Props {
    uttak: TilgjengeligStønadskonto;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
}

const BEM = BEMHelper('kontostatus');

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb') {
        return navn;
    }
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
};

export const getStønadskontoNavn = (intl: IntlShape, konto: StønadskontoType, navnPåForeldre: NavnPåForeldre) => {
    let navn;
    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }
    if (navn) {
        return intl.formatMessage(
            { id: `stønadskontotype.foreldernavn.kvote` },
            { navn: getNavnGenitivEierform(navn, intl.locale) }
        );
    }
    return intl.formatMessage({ id: `stønadskontotype.${konto}` });
};

const Kontostatus: React.FunctionComponent<Props> = ({ uttak, navnPåForeldre, erEndringssøknad }) => {
    const intl = useIntl();

    if (erEndringssøknad && uttak.konto === StønadskontoType.ForeldrepengerFørFødsel) {
        uttak.dager = 0;
    }

    const varighetString = getVarighetString(uttak.dager, intl);
    const kontoErOvertrukket = uttak.dager < 0;

    return (
        <Normaltekst className={BEM.block} tag="div">
            <div className={BEM.element('ikon')} aria-hidden={true} role="presentation">
                <StønadskontoIkon konto={uttak.konto} navnPåForeldre={navnPåForeldre} />
            </div>
            <div className={BEM.element('content')}>
                <div className={kontoErOvertrukket ? BEM.element('kontoOvertrukket') : BEM.element('konto')}>
                    {getStønadskontoNavn(intl, uttak.konto, navnPåForeldre)}
                </div>
                <strong
                    className={kontoErOvertrukket ? BEM.element('dagerOvertrukket') : BEM.element('dager')}
                    data-name={uttak.konto}
                >
                    {kontoErOvertrukket ? `- ${varighetString}` : varighetString}
                </strong>
            </div>
        </Normaltekst>
    );
};

export default Kontostatus;
