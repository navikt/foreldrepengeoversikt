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
            <div className={bem.element('header')}>
                <div className={bem.element('header-tekst')}>
                    <BodyLong>Du har søkt om planen nedenfor. Planen er ikke vedtatt av NAV ennå.</BodyLong>
                </div>
                <Button variant="secondary" icon={<Edit aria-hidden />} iconPosition="right">
                    Endre perioder
                </Button>
            </div>
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
