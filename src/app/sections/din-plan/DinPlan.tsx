import { BodyLong, Button, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Next } from '@navikt/ds-icons';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import { default as PeriodeComponent } from './Periode';
import { Periode } from 'app/types/Periode';

import './din-plan.css';
import { isUtsettelsesperiode } from 'app/utils/periodeUtils';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';

interface Props {
    vedtattUttaksplan: Periode[];
}

const DinPlan: React.FunctionComponent<Props> = ({ vedtattUttaksplan }) => {
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

                return <PeriodeComponent periode={periode} navnForelder="Leah" ikkeUttak={ikkeUttak} />;
            })}
            <div>
                <Link href="#">
                    Se hele planen <Next />
                </Link>
            </div>
        </>
    );
};

export default DinPlan;
