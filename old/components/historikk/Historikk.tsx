import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import AlertStripe from 'nav-frontend-alertstriper';
import moment from 'moment';

import HistorikkElement, { Hendelse } from './HistorikkElement';
import BEMHelper from '../old/common/util/bem';
import Person from 'app/types/Person';
import { HendelseType } from 'app/api/types/historikk/HistorikkInnslag';

import './historikk.less';

interface HistorikkProps {
    søker?: Person;
    hendelser: Hendelse[];
}

const Historikk: React.FunctionComponent<HistorikkProps> = ({ søker, hendelser }) => {
    useEffect(() => {
        if ((document as any) !== undefined && søker) {
            const list = (document as any).getElementsByClassName('bruker');
            for (const item of list) {
                item.innerHTML = søker.fornavn.substr(0, 1) + søker.etternavn.substr(0, 1);
            }
        }
    });

    const cls = BEMHelper('historikk');
    const sendtSøknadHendelse = hendelser.find(
        (h) => h.type === HendelseType.INITIELL_FORELDREPENGER || h.type === 'søknad-sendt'
    );
    const harSendtSøknadFørSeptember2019 =
        sendtSøknadHendelse !== undefined ? moment(sendtSøknadHendelse.dato).isBefore('2019-09-01') : false;

    return (
        <div className={cls.block}>
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
                    {harSendtSøknadFørSeptember2019 && (
                        <div className={cls.element('ettersendelse-info')}>
                            <AlertStripe type="info">
                                <FormattedMessage id="historikk.ettersendelse.info" />
                            </AlertStripe>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Historikk;
