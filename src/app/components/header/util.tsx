import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';

import Familie1 from '../ikoner/familier/Familie1';
import Familie2 from '../ikoner/familier/Familie2';
import Familie3 from '../ikoner/familier/Familie3';
import Familie4 from '../ikoner/familier/Familie4';
import Familie5 from '../ikoner/familier/Familie5';

import SakBase from 'app/api/types/sak/Sak';
import { FagsakStatus } from 'app/api/types/sak/FagsakStatus';
import { erForeldrepengesak, erEngangsstønad, erSvangerskapepengesak } from 'app/utils/sakerUtils';
import BEMHelper from 'common/util/bem';

export const getRandomIcon = () => {
    const cls = BEMHelper('header');
    const ikoner = [
        <Familie1 key={guid()} className={cls.element('icon')} />,
        <Familie2 key={guid()} className={cls.element('icon')} />,
        <Familie3 key={guid()} className={cls.element('icon')} />,
        <Familie4 key={guid()} className={cls.element('icon')} />,
        <Familie5 key={guid()} className={cls.element('icon')} />
    ];

    const randomIconIndex = Math.floor(Math.random() * Math.floor(ikoner.length));
    return ikoner[randomIconIndex];
};

export const getHeaderTitleIntlKey = (saker: SakBase[]): string => {
    const aktiveSaker = saker.filter((s) => s.status !== FagsakStatus.AVSLUTTET);
    const keys = [];
    if (aktiveSaker.some((s) => erForeldrepengesak(s))) {
        keys.push('FP');
    }

    if (aktiveSaker.some((s) => erEngangsstønad(s))) {
        keys.push('ES');
    }

    if (aktiveSaker.some((s) => erSvangerskapepengesak(s))) {
        keys.push('SVP');
    }

    return aktiveSaker.length > 0 && keys.length > 0
        ? 'header.title.'.concat(keys.sort().join('.'))
        : 'header.title.default';
};
