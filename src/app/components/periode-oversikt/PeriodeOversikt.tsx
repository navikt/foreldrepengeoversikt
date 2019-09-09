import React from 'react';
import PeriodeListe from './PeriodeList/PeriodeList';
import { finnNåværendePerioder, finnFremtidigePerioder, finnTidligerePerioder } from './periodeUtils';
import Periode from 'app/types/uttaksplan/Periode';
import Personinfo from 'app/types/Personinfo';
import AnnenPart from 'app/types/sak/AnnenPart';

interface Props {
    perioder: Periode[];
    søker: Personinfo;
    annenPart?: AnnenPart;
}

const PeriodeOversikt: React.StatelessComponent<Props> = ({ perioder, søker, annenPart }) => {
    const tidligerPerioder = finnTidligerePerioder(perioder);
    const nåværendePerioder = finnNåværendePerioder(perioder);
    const fremtidigePerioder = finnFremtidigePerioder(perioder);
    return (
        <>
            {tidligerPerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Tidligere perioder'}
                    perioder={tidligerPerioder}
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
