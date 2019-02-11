import * as React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { formaterDatoForHendelse } from './util';

import './historikk.less';

export interface Hendelse {
    dato: string;
    beskrivelse: string;
    brukerInitiertHendelse: boolean;
}

interface HistorikkElementProps {
    hendelse: Hendelse;
}

type Props = HistorikkElementProps;
class HistorikkElement extends React.Component<Props> {
    // TODO sette brukers initialer her
    //  componentDidMount(): void {
    //      if ((document as any) !== undefined) {
    //          const list = (document as any).getElementsByClassName('bruker');
    //          for (const item of list) {
    //              item.innerHTML = '';
    //          }
    //      }
    //  }

    render() {
        const { hendelse } = this.props;

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
}

export default HistorikkElement;
