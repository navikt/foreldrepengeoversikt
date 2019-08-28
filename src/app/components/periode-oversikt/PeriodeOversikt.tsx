import React from 'react';
import PeriodeListe from './PeriodeList/PeriodeList';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { finnNåværendePerioder, finnFremtidigePerioder, finnTidligerePerioder } from './periodeUtils';

interface Props {
    perioder: Uttaksperiode[];
}

const PeriodeOversikt: React.StatelessComponent<Props> = ({ perioder }) => {
    const tidligerPerioder = finnTidligerePerioder(perioder);
    const nåværendePerioder = finnNåværendePerioder(perioder);
    const fremtidigePerioder = finnFremtidigePerioder(perioder);
    return (
        <>
            {tidligerPerioder.length > 0 && <PeriodeListe tittel={'Tidligere perioder'} perioder={tidligerPerioder} />}
            {nåværendePerioder.length > 0 && <PeriodeListe tittel={'Nåværende periode'} perioder={nåværendePerioder} />}
            {fremtidigePerioder.length > 0 && (
                <PeriodeListe tittel={'Fremtidige perioder'} perioder={fremtidigePerioder} />
            )}
        </>
    );
};

export default PeriodeOversikt;
