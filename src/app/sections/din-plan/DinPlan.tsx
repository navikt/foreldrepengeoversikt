import { BodyLong, Button } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import {
    finnFremtidigePerioder,
    finnNåværendePerioder,
    finnTidligerePerioder,
    getCleanedPlanForVisning,
} from 'app/utils/periodeUtils';
import './din-plan.css';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';
import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';

interface Props {
    navnPåSøker: string;
    sak: Foreldrepengesak;
    visHelePlanen: boolean;
}

const DinPlan: React.FunctionComponent<Props> = ({ sak, visHelePlanen, navnPåSøker }) => {
    const bem = bemUtils('din-plan');

    let vedtattUttaksplan = undefined;
    let søktePerioder = undefined;
    if (sak.gjeldendeVedtak) {
        vedtattUttaksplan = slåSammenLikePerioder(sak.gjeldendeVedtak.perioder);
    }

    if (sak.åpenBehandling && sak.åpenBehandling.søknadsperioder) {
        søktePerioder = slåSammenLikePerioder(sak.åpenBehandling.søknadsperioder);
    }
    const erUttaksplanVedtatt = vedtattUttaksplan ? true : false;

    const planForVisning = erUttaksplanVedtatt ? vedtattUttaksplan : søktePerioder;
    const filtrertPlan = getCleanedPlanForVisning(planForVisning);
    const planMedHull = filtrertPlan; //TODO fyllInnHull(filtrertPlan);
    const tidligerePerioder = planMedHull ? finnTidligerePerioder(planMedHull) : undefined;
    const nåværendePerioder = planMedHull ? finnNåværendePerioder(planMedHull) : undefined;
    const fremtidligePerioder = planMedHull ? finnFremtidigePerioder(planMedHull) : undefined;
    return (
        <>
            <div className={bem.element('header')}>
                <div className={bem.element('header-tekst')}>
                    <BodyLong>
                        {erUttaksplanVedtatt
                            ? 'Dine perioder med foreldrepenger'
                            : 'Du har søkt om planen nedenfor. Planen er ikke vedtatt av NAV ennå.'}
                    </BodyLong>
                </div>
                <Button variant="secondary" icon={<Edit aria-hidden />} iconPosition="right">
                    Endre perioder
                </Button>
            </div>
            <PeriodeOversikt
                tidligerePerioder={tidligerePerioder}
                nåværendePerioder={nåværendePerioder}
                fremtidigePerioder={fremtidligePerioder}
                sak={sak}
                visHelePlanen={visHelePlanen}
                navnPåSøker={navnPåSøker}
            />
        </>
    );
};

export default DinPlan;
