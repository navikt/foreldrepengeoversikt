import { BodyLong, Button, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Next } from '@navikt/ds-icons';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import Periode from './Periode';

import './din-plan.css';

const DinPlan = () => {
    const bem = bemUtils('din-plan');

    return (
        <>
            <BodyLong className={bem.element('ingress')}>
                Du har søkt om planen nedenfor. Planen er ikke vedtatt av NAV ennå.
            </BodyLong>
            <Button
                variant="secondary"
                className={bem.element('endre-knapp')}
                icon={<Edit aria-hidden />}
                iconPosition="right"
            >
                Endre perioder
            </Button>
            <Periode tidsperiode={{ fom: '2022-01-01', tom: '2022-02-01' }} navnForelder="Leah" />
            <Periode tidsperiode={{ fom: '2022-01-01', tom: '2022-02-01' }} navnForelder="Leah" ikkeUttak={true} />
            <Periode tidsperiode={{ fom: '2022-01-01', tom: '2022-02-01' }} navnForelder="Leah" />
            <div>
                <Link href="#">
                    Se hele planen <Next />
                </Link>
            </div>
        </>
    );
};

export default DinPlan;
