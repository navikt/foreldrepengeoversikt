import { BodyLong, Button, Link } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import { bemUtils } from '@navikt/fp-common';
import { Next } from '@navikt/ds-icons';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import { default as PeriodeComponent } from './Periode';
import { Periode } from 'app/types/Periode';
import { isUtsettelsesperiode } from 'app/utils/periodeUtils';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import OversiktRoutes from 'app/routes/routes';

import './din-plan.css';

interface Props {
    ikkeVedtattUttaksplan?: Periode[];
    navnPåSøker: string;
    vedtattUttaksplan?: Periode[];
}

const DinPlan: React.FunctionComponent<Props> = ({ vedtattUttaksplan, ikkeVedtattUttaksplan, navnPåSøker }) => {
    const bem = bemUtils('din-plan');
    const erUttaksplanVedtatt = vedtattUttaksplan ? true : false;

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
            {vedtattUttaksplan &&
                vedtattUttaksplan.map((periode, index) => {
                    let ikkeUttak = false;

                    if (isUtsettelsesperiode(periode) && periode.utsettelseÅrsak === UtsettelseÅrsakType.Fri) {
                        ikkeUttak = true;
                    }

                    return (
                        <PeriodeComponent
                            key={index}
                            periode={periode}
                            navnForelder={navnPåSøker}
                            ikkeUttak={ikkeUttak}
                        />
                    );
                })}
            {ikkeVedtattUttaksplan &&
                ikkeVedtattUttaksplan.length > 0 &&
                ikkeVedtattUttaksplan.map((periode, index) => {
                    let ikkeUttak = false;

                    if (isUtsettelsesperiode(periode) && periode.utsettelseÅrsak === UtsettelseÅrsakType.Fri) {
                        ikkeUttak = true;
                    }

                    return (
                        <PeriodeComponent
                            key={index}
                            periode={periode}
                            navnForelder={navnPåSøker}
                            ikkeUttak={ikkeUttak}
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
