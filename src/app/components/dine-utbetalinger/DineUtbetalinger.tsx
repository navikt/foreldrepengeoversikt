import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import PileOfCash from '../ikoner/PileOfCash';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';

import './dineUtbetalinger.less';
import { lenker } from '../../utils/lenker';

const DineUtbetalinger = () => {
    const cls = BEMHelper('dine-utbetalinger');
    return (
        <Lenkepanel href={lenker.dineUtbetalinger.href} tittelProps={'normaltekst'}>
            <div className={cls.className}>
                <PileOfCash className={cls.element('icon')} />
                <div className={cls.element('text')}>
                    <Undertittel>Dine utbetalinger</Undertittel>
                    <Normaltekst>
                        Her finner du alle dine utbetalinger fra NAV. Får du utbetalt foreldrepenger fra arbeidsgiver
                        vil disse ikke vises her.
                    </Normaltekst>
                </div>
            </div>
        </Lenkepanel>
    );
};

export default DineUtbetalinger;
