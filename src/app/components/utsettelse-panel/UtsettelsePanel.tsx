import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { lenker } from 'app/utils/lenker';
import BEMHelper from 'common/util/bem';

import './utsettelsePanel.less';

const UtsettelsePanel = () => {
    const cls = BEMHelper('utsettelse-panel');
    return (
        <div className={cls.block}>
            <Undertittel className="blokk-xxs">
                <FormattedMessage id="utsettelsepanel.title" />
            </Undertittel>
            <Normaltekst className="blokk-xxs">
                <FormattedMessage id="utsettelsepanel.tekst" />
            </Normaltekst>

            <Lenke href={lenker.utsettelse}>
                <FormattedMessage id="utsettelsepanel.lenke" />
            </Lenke>
        </div>
    );
};

export default UtsettelsePanel;
