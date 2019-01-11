import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import PileOfCash from '../ikoner/PileOfCash';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { lenker } from '../../utils/lenker';

import './dineUtbetalinger.less';

const DineUtbetalinger = () => {
    const cls = BEMHelper('dine-utbetalinger');
    return (
        <Lenkepanel href={lenker.dineUtbetalinger} tittelProps={'normaltekst'}>
            <div className={cls.className}>
                <PileOfCash className={cls.element('icon')} />
                <div className={cls.element('text')}>
                    <Undertittel>Dine utbetalinger</Undertittel>
                    <Normaltekst>
                        <FormattedMessage id={'dineForeldrepenger.dineUtbetalinger'} />
                    </Normaltekst>
                </div>
            </div>
        </Lenkepanel>
    );
};

export default DineUtbetalinger;
