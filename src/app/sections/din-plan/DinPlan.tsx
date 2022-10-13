import { BodyLong, Button, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Next } from '@navikt/ds-icons';
import React from 'react';

import './din-plan.css';

const DinPlan = () => {
    const bem = bemUtils('din-plan');

    return (
        <>
            <BodyLong className={bem.element('ingress')}>
                Du har søkt om planen nedenfor. Planen er ikke vedtatt av NAV ennå.
            </BodyLong>
            <Button variant="secondary" className={bem.element('endre-knapp')}>
                Endre perioder
            </Button>
            <div>
                <Link>
                    Se hele planen <Next />
                </Link>
            </div>
        </>
    );
};

export default DinPlan;
