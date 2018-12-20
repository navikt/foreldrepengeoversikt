import * as React from 'react';
import MediaQuery from 'react-responsive';
import BEMHelper from 'common/util/bem';

import LightbulbIcon from '../ikoner/LightbulbIcon';
import { Normaltekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';

import CashIcon from '../ikoner/CashIcon';
import CashInHandIcon from '../ikoner/CashInHandIcon';

import './infoPanel.less';

const InfoPanel = () => {
    const cls = BEMHelper('info-panel');
    return (
        <aside className={cls.className}>
            <div className={cls.element('element')}>
                <LightbulbIcon className={cls.element('lightbulb-icon')} />
                <MediaQuery maxWidth={1114}>
                    <Undertittel>Greit for deg å vite</Undertittel>
                </MediaQuery>
                <MediaQuery minWidth={1114}>
                    <UndertekstBold className={cls.element('title')}>Greit for deg å vite</UndertekstBold>
                </MediaQuery>
            </div>
            <div className={cls.element('element')}>
                <CashIcon className={cls.element('icon')} />
                <Normaltekst>Utbetales den 25. i måneden</Normaltekst>
            </div>
            <div className={cls.element('element')}>
                <CashInHandIcon className={cls.element('icon')} />
                <Normaltekst>Svar tidligst fire uker før</Normaltekst>
            </div>
        </aside>
    );
};

export default InfoPanel;
