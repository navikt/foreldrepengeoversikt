import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import PeriodeListe from './PeriodeList/PeriodeList';
import Periode from 'app/types/uttaksplan/Periode';
import AlertStripe from 'nav-frontend-alertstriper';
import Person from 'app/types/Person';
import { getNavnPåForeldre } from 'app/utils/søkerinfoUtils';
import Sak from 'app/api/types/sak/Sak';

interface Props {
    søker: Person;
    sak: Sak;
    tidligerePerioder?: Periode[];
    nåværendePerioder?: Periode[];
    fremtidigePerioder?: Periode[];
}

const PeriodeOversikt: React.StatelessComponent<Props> = ({
    tidligerePerioder = [],
    nåværendePerioder = [],
    fremtidigePerioder = [],
    søker,
    sak
}) => {
    return (
        <>
            {[...tidligerePerioder, ...nåværendePerioder, ...fremtidigePerioder].length === 0 && (
                <AlertStripe type="info">
                    <FormattedMessage id="periodeOversikt.ingenPerioder" />
                </AlertStripe>
            )}

            {tidligerePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Tidligere perioder'}
                    perioder={tidligerePerioder}
                    navnPåForeldre={getNavnPåForeldre(sak, søker)}
                />
            )}
            {nåværendePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Nåværende periode'}
                    perioder={nåværendePerioder}
                    navnPåForeldre={getNavnPåForeldre(sak, søker)}
                />
            )}
            {fremtidigePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Fremtidige perioder'}
                    perioder={fremtidigePerioder}
                    navnPåForeldre={getNavnPåForeldre(sak, søker)}
                />
            )}
        </>
    );
};

export default PeriodeOversikt;
