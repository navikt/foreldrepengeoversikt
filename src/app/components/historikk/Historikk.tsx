import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import AlertStripe from 'nav-frontend-alertstriper';

import HistorikkElement, { Hendelse } from './HistorikkElement';
import Person from '../../types/Personinfo';
import BEMHelper from 'common/util/bem';

import './historikk.less';

interface HistorikkProps {
    person?: Person;
    hendelser: Hendelse[];
}

class Historikk extends React.Component<HistorikkProps> {
    componentDidMount(): void {
        const { person } = this.props;
        if ((document as any) !== undefined && person) {
            const list = (document as any).getElementsByClassName('bruker');
            for (const item of list) {
                item.innerHTML = person.fornavn.substr(0, 1) + person.etternavn.substr(0, 1);
            }
        }
    }

    render() {
        const cls = BEMHelper('historikk');
        const { hendelser } = this.props;

        return (
            <div className={cls.className}>
                {hendelser.length === 0 && (
                    <div className={cls.element('ingen-hendelser')}>
                        <AlertStripe type="info">
                            <FormattedMessage id="historikk.ingenHendelser" />
                        </AlertStripe>
                    </div>
                )}

                {hendelser.length > 0 && (
                    <>
                        <ol className={cls.element('liste')}>
                            {hendelser.map((h: Hendelse) => (
                                <HistorikkElement key={guid()} hendelse={h} />
                            ))}
                        </ol>
                        <div className={cls.element('ettersendelse-info')}>
                            <AlertStripe type="info">
                                <FormattedMessage id="historikk.ettersendelse.info" />
                            </AlertStripe>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Historikk;
