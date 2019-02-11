import * as React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { formaterDatoForHendelse } from './util';
import Person from '../../types/Person';

import './historikk.less';

export interface Hendelse {
    dato: string;
    beskrivelse: string;
    brukerInitiertHendelse: boolean;
}

interface HistorikkElementProps {
    person?: Person;
    hendelse: Hendelse;
}

type Props = HistorikkElementProps;

function HistorikkElement(props: Props) {
    const { hendelse } = props;

    const cls = BEMHelper('historikk-element');
    return (
        <li className={cls.className}>
            <Snakkeboble
                dato={formaterDatoForHendelse(hendelse.dato)}
                pilHoyre={!hendelse.brukerInitiertHendelse}
                ikonClass={hendelse.brukerInitiertHendelse ? 'bruker' : 'nav'}>
                <Element>{hendelse.beskrivelse}</Element>
            </Snakkeboble>
        </li>
    );
}

export default HistorikkElement;
