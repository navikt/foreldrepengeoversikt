import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

import { lenker } from '../../utils/lenker';
import BEMHelper from 'common/util/bem';

import './dokuentoversikt.less';

const Dokumentoversikt = () => {
    const cls = BEMHelper('dokumentoversikt');
    return (
        <div className={cls.className}>
            <AlertStripe className={cls.element('alertstripe')} type="info" solid={true}>
                <FormattedMessage
                    id="dokumentoversikt.info"
                    values={{
                        lenke: (
                            <Lenke href={lenker.saksoversikt}>
                                <FormattedMessage id="dokumentoversikt.info.lenke" />
                            </Lenke>
                        )
                    }}
                />
            </AlertStripe>
        </div>
    );
};
export default Dokumentoversikt;
