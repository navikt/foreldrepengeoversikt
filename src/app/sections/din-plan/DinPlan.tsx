import { BodyLong, Button, Link } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import { bemUtils, Kjønn } from '@navikt/fp-common';
import { Next } from '@navikt/ds-icons';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import { getPerioderForVisning, isUtsettelsesperiode, normaliserPerioder } from 'app/utils/periodeUtils';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import OversiktRoutes from 'app/routes/routes';

import './din-plan.css';
import PeriodeFelt from './PeriodeFelt';
import { Periode, PeriodeForVisning } from 'app/types/Periode';
import dayjs from 'dayjs';

interface Props {
    annenPartsPerioder: Periode[] | undefined;
    kjønnPåAnnenPart: Kjønn | undefined;
    kjønnPåSøker: Kjønn;
    navnPåAnnenPart: string | undefined;
    navnPåSøker: string;
    søktePerioder?: Periode[];
    vedtattUttaksplan?: Periode[];
}

const DinPlan: React.FunctionComponent<Props> = ({
    annenPartsPerioder,
    vedtattUttaksplan,
    søktePerioder,
    kjønnPåSøker,
    kjønnPåAnnenPart,
    navnPåSøker,
    navnPåAnnenPart,
}) => {
    const bem = bemUtils('din-plan');
    const erUttaksplanVedtatt = vedtattUttaksplan ? true : false;

    const annenPartsPerioderForVisning =
        annenPartsPerioder !== undefined
            ? getPerioderForVisning(
                  annenPartsPerioder.filter((p) => p.resultat.innvilget === true),
                  true,
                  true
              )
            : undefined;
    const vedtattUttaksplanForVisning = vedtattUttaksplan
        ? getPerioderForVisning(vedtattUttaksplan, false, true)
        : undefined;
    const søktePerioderForVisning = søktePerioder ? getPerioderForVisning(søktePerioder, false, false) : undefined;
    const navnPåAnnenPartForVisning = navnPåAnnenPart ? navnPåAnnenPart : 'Annen forelder';
    let perioderForVisning;
    let annenPartsPlan: PeriodeForVisning[] = [];

    if (erUttaksplanVedtatt && vedtattUttaksplanForVisning) {
        perioderForVisning = vedtattUttaksplanForVisning;
    } else if (søktePerioderForVisning && søktePerioderForVisning.length > 0) {
        perioderForVisning = søktePerioderForVisning;
    }

    if (perioderForVisning && annenPartsPerioderForVisning) {
        const { normaliserteEgnePerioder, normaliserteAnnenPartsPerioder } = normaliserPerioder(
            perioderForVisning,
            annenPartsPerioderForVisning
        );
        perioderForVisning = normaliserteEgnePerioder;
        annenPartsPlan = normaliserteAnnenPartsPerioder;
    }

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
            {perioderForVisning &&
                perioderForVisning.map((periode, index) => {
                    let ikkeUttak = false;

                    if (
                        (isUtsettelsesperiode(periode) && periode.utsettelseÅrsak === UtsettelseÅrsakType.Fri) ||
                        periode.gjelderAnnenPart
                    ) {
                        ikkeUttak = true;
                    }
                    const navnPåPerioden = periode.gjelderAnnenPart ? navnPåAnnenPartForVisning : navnPåSøker;
                    const kjønn = periode.gjelderAnnenPart ? kjønnPåAnnenPart : kjønnPåSøker;
                    const overlappendePeriodeAnnenPart = annenPartsPlan
                        ? annenPartsPlan.find(
                              (p) =>
                                  dayjs(p.tidsperiode.fom).isSame(periode.tidsperiode.fom, 'd') &&
                                  dayjs(p.tidsperiode.tom).isSame(periode.tidsperiode.tom, 'd')
                          )
                        : undefined;
                    const erSamtidigUttak = overlappendePeriodeAnnenPart !== undefined;
                    return (
                        <PeriodeFelt
                            key={index}
                            periode={periode}
                            navnForelder={navnPåPerioden}
                            ikkeUttak={ikkeUttak}
                            kjønn={kjønn!}
                            gjelderAnnenPart={periode.gjelderAnnenPart}
                            erSamtidigUttak={erSamtidigUttak}
                        />
                    );
                })}
            <div>
                <Link as={RouterLink} to={OversiktRoutes.DIN_PLAN}>
                    Se hele planen <Next />
                </Link>
            </div>
        </>
    );
};

export default DinPlan;
