import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import HistorikkElement, { Hendelse } from './HistorikkElement';
import Sak from '../../types/Sak';
import { utledHendelser } from './util';

import './historikk.less';

interface HistorikkProps {
    sak: Sak;
}

const Historikk = (props: HistorikkProps) => {
    const cls = BEMHelper('historikk');

    const { sak } = props;
    return (
        <div className={cls.className}>
            <ol className={cls.element('liste')}>
                {utledHendelser(sak).map((h: Hendelse) => (
                    <HistorikkElement key={guid()} hendelse={h} />
                ))}
            </ol>
        </div>
    );
};
export default Historikk;
