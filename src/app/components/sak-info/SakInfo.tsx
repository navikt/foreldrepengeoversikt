import * as React from 'react';
import BEMHelper from 'common/util/bem';

import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import InfoBlock from 'common/components/info-block/InfoBlock';

import BamseIkon from '../../../app/components/ikoner/BamseIkon';
import Sak from '../../../app/types/Sak';
import { StorageKvittering } from '../../types/StorageKvittering';

import './sakInfo.less';

interface Props {
    sak: Sak;
    storageKvittering: StorageKvittering;
}

const SakInfo = ({ sak }: Props) => {
    const bem = BEMHelper('sak-info');
    return (
        <InfoBlock padding="none">
            <div className={bem.className}>
                <div className={bem.element('text')}>
                    <Element className="blokk-xxxs">
                        <FormattedMessage id="sakInfo.tittel" />
                    </Element>
                    <Normaltekst className="blokk-xxs">
                        <FormattedMessage
                            id="sakInfo.sistEndret"
                            values={{
                                date: moment(sak.opprettet).format('LL')
                            }}
                        />
                    </Normaltekst>
                </div>
                <div className={bem.element('icon')}>
                    <BamseIkon />
                </div>
            </div>
        </InfoBlock>
    );
};
export default SakInfo;
