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
    vedtattUttaksplan: Periode[];
    navnPåSøker: string;
}

const DinPlan: React.FunctionComponent<Props> = ({ vedtattUttaksplan, navnPåSøker }) => {
    const bem = bemUtils('din-plan');

    return (
        <>
            <div className={bem.element('header')}>
                <div className={bem.element('header-tekst')}>
                    <BodyLong>Du har søkt om planen nedenfor. Planen er ikke vedtatt av NAV ennå.</BodyLong>
                </div>
                <Button variant="secondary" icon={<Edit aria-hidden />} iconPosition="right">
                    Endre perioder
                </Button>
            </div>
            {vedtattUttaksplan.map((periode) => {
                let ikkeUttak = false;

                if (isUtsettelsesperiode(periode) && periode.utsettelseÅrsak === UtsettelseÅrsakType.Fri) {
                    ikkeUttak = true;
                }

                return <PeriodeComponent periode={periode} navnForelder={navnPåSøker} ikkeUttak={ikkeUttak} />;
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
