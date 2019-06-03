import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import Sak from '../../../types/Sak';
import { finnNyesteBehandling } from '../../../utils/sakerUtils';
import { formatDate, getIntlKeyForStatus, getEtikettTypeForSaksstatus, getSaksoversiktTitle } from '../utils';
import BEMHelper from 'common/util/bem';
import Etikett from '../../etikett/etikett';

import EtikettBase from 'nav-frontend-etiketter';
import BamseIkon from '../../ikoner/BamseIkon';

import './saksoversikt.less';

interface SaksoversiktHeaderProps {
    sak: Sak;
}

const SaksoversiktHeader: FunctionComponent<SaksoversiktHeaderProps> = ({ sak }) => {
    const statusIntlKey = sak.status && getIntlKeyForStatus(sak.status);
    const nyesteBehandling = finnNyesteBehandling(sak);

    const cls = BEMHelper('saksoversikt-header');
    return (
        <div className={cls.className}>
            <div className={cls.element('top')}>
                <Innholdstittel>
                    <FormattedMessage
                        id={getSaksoversiktTitle(sak)}
                    />
                </Innholdstittel>
                {sak.saksnummer && (
                    <Etikett
                        etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                        value={sak.saksnummer}
                    />
                )}
            </div>

            <div className={cls.element('bottom-row')}>
                <Etikett
                    className={cls.element('timestamp')}
                    etikett={
                        <FormattedMessage
                            id={
                                nyesteBehandling === undefined
                                    ? 'saksoversikt.heading.mottatt'
                                    : 'saksoversikt.heading.sisteEndring'
                            }
                        />
                    }
                    value={
                        nyesteBehandling === undefined
                            ? formatDate(sak.opprettet)
                            : formatDate(nyesteBehandling.endretTidspunkt)
                    }
                />
                {statusIntlKey ? (
                    <EtikettBase
                        className={cls.element('status-etikett')}
                        type={getEtikettTypeForSaksstatus(sak)}>
                        <FormattedMessage id={statusIntlKey} />
                    </EtikettBase>
                ) : (
                    <BamseIkon />
                )}
            </div>
        </div>
    );
};

export default SaksoversiktHeader;
