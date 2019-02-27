import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import HistorikkElement, { Hendelse } from './HistorikkElement';
import Sak from '../../types/Sak';
import { utledHendelser } from './util';
import Person from '../../types/Person';
import AlertStripe from 'nav-frontend-alertstriper';

import './historikk.less';

interface HistorikkProps {
    person?: Person;
    sak: Sak;
}

class Historikk extends React.Component<HistorikkProps> {
    //componentDidMount(): void {
    //    const { person } = this.props;
    //    if ((document as any) !== undefined && person) {
    //        const list = (document as any).getElementsByClassName('bruker');
    //        for (const item of list) {
    //            item.innerHTML = person.fornavn.substr(0, 1) + person.etternavn.substr(0, 1);
    //        }
    //    }
    //}

    render() {
        const cls = BEMHelper('historikk');

        const { sak } = this.props;
        return (
            <div className={cls.className}>
                <ol className={cls.element('liste')}>
                    {utledHendelser(sak.behandlinger).map((h: Hendelse) => (
                        <HistorikkElement key={guid()} hendelse={h} />
                    ))}
                </ol>

                <div className={cls.element('alert-stripe')}>
                    <AlertStripe type={'info'}>Ettersendelse av dokumentasjon vil ikke vises her</AlertStripe>
                </div>
            </div>
        );
    }
}

export default Historikk;
