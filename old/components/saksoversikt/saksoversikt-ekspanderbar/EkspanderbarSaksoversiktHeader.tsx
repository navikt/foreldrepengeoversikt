import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';

import SakBase from '../../../api/types/sak/Sak';
import { formatDate, getIntlKeyForStatus, getEtikettTypeForSaksstatus, getSaksoversiktTitle } from '../utils';
import BEMHelper from '../old/common/util/bem';

import './ekspanderbarSaksoversikt.less';
import { harSøkt } from 'app/utils/sakerUtils';

interface Props {
    sak: SakBase;
}

const EkspanderbarSaksoversiktHeader: React.FunctionComponent<Props> = ({ sak }) => {
    const statusIntlKey = sak.status && getIntlKeyForStatus(sak.status);
    const cls = BEMHelper('ekspenderbar-saksoversikt-header');
    return (
        <div className={cls.block}>
            <div className={cls.element('left')}>
                <Undertittel>
                    <FormattedMessage id={getSaksoversiktTitle(sak)} />
                </Undertittel>

                {sak.opprettet && (
                    <Normaltekst>
                        <FormattedMessage
                            id="saksoversikt.heading.ekspanderbar.mottatt"
                            values={{ date: formatDate(sak.opprettet) }}
                        />
                    </Normaltekst>
                )}
            </div>

            {statusIntlKey && harSøkt(sak) && (
                <EtikettBase className={cls.element('status-etikett')} type={getEtikettTypeForSaksstatus(sak)}>
                    <FormattedMessage id={statusIntlKey} />
                </EtikettBase>
            )}
        </div>
    );
};
export default EkspanderbarSaksoversiktHeader;
