import { Alert, Link } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { getNavnPåForeldre } from 'app/utils/personUtils';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { RettighetType } from 'app/types/RettighetType';
import PeriodeListe from '../periode-liste/PeriodeListe';
import { Next } from '@navikt/ds-icons';
import { Link as RouterLink } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';

interface Props {
    fremtidigePerioder?: Periode[];
    navnPåSøker: string;
    nåværendePerioder?: Periode[];
    sak: Foreldrepengesak;
    tidligerePerioder?: Periode[];
    visHelePlanen: boolean;
}

const PeriodeOversikt: React.FunctionComponent<Props> = ({
    tidligerePerioder = [],
    nåværendePerioder = [],
    fremtidigePerioder = [],
    navnPåSøker,
    sak,
    visHelePlanen,
}) => {
    const intl = useIntl();
    const erFarEllerMedmor = !sak.sakTilhørerMor;
    const erAleneOmOmsorg = sak.rettighetType === RettighetType.ALENEOMSORG;
    const navnPåForeldre = getNavnPåForeldre(sak, navnPåSøker);
    return (
        <>
            {[...nåværendePerioder, ...fremtidigePerioder].length === 0 && !visHelePlanen && (
                <Alert variant="info">{intlUtils(intl, 'periodeOversikt.ingenPerioder.visKunNåværendeOgNeste')}</Alert>
            )}

            {[...tidligerePerioder, ...nåværendePerioder, ...fremtidigePerioder].length === 0 && visHelePlanen && (
                <Alert variant="info">{intlUtils(intl, 'periodeOversikt.ingenPerioder.visHelePlanen')}</Alert>
            )}

            {tidligerePerioder.length > 0 && visHelePlanen && (
                <PeriodeListe
                    tittel={'Tidligere perioder'}
                    periodeListe={tidligerePerioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            )}
            {nåværendePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Nåværende periode'}
                    periodeListe={nåværendePerioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            )}
            {fremtidigePerioder.length > 0 && (
                <PeriodeListe
                    tittel={visHelePlanen ? 'Fremtidige perioder' : 'Neste periode'}
                    periodeListe={visHelePlanen ? fremtidigePerioder : [fremtidigePerioder[0]]}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            )}
            {!visHelePlanen && (
                <Link as={RouterLink} to={OversiktRoutes.DIN_PLAN}>
                    Se hele planen <Next />
                </Link>
            )}
        </>
    );
};
export default PeriodeOversikt;
