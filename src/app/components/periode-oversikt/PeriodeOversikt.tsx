import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import PeriodeListe from './PeriodeList/PeriodeList';
import Periode from 'app/types/uttaksplan/Periode';
import AnnenPart from 'app/api/types/sak/AnnenPart';
import AlertStripe from 'nav-frontend-alertstriper';
import Person from 'app/types/Person';

interface Props {
    søker: Person;
    annenPart?: AnnenPart;
    tidligerePerioder?: Periode[];
    nåværendePerioder?: Periode[];
    fremtidigePerioder?: Periode[];
}

const PeriodeOversikt: React.StatelessComponent<Props> = ({
    tidligerePerioder = [],
    nåværendePerioder = [],
    fremtidigePerioder = [],
    søker,
    annenPart
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
                    søker={søker}
                    annenPart={annenPart}
                />
            )}
            {nåværendePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Nåværende periode'}
                    perioder={nåværendePerioder}
                    søker={søker}
                    annenPart={annenPart}
                />
            )}
            {fremtidigePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Fremtidige perioder'}
                    perioder={fremtidigePerioder}
                    søker={søker}
                    annenPart={annenPart}
                />
            )}
        </>
    );
};

export default PeriodeOversikt;
