import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import SakBase from '../../../api/types/sak/Sak';
import { harSøkt, getNyesteBehandling } from '../../../utils/sakerUtils';
import { formatDate, getIntlKeyForStatus, getEtikettTypeForSaksstatus, getSaksoversiktTitle } from '../utils';
import BEMHelper from '../old/common/util/bem';
import Etikett from '../../etikett/etikett';

import EtikettBase from 'nav-frontend-etiketter';
import BamseIkon from '../../ikoner/BamseIkon';

import './saksoversikt.less';

interface SaksoversiktHeaderProps {
    sak: SakBase;
}

const SaksoversiktHeader: FunctionComponent<SaksoversiktHeaderProps> = ({ sak }) => {
    const statusIntlKey = sak.status && getIntlKeyForStatus(sak.status);
    const nyesteBehandling = getNyesteBehandling(sak.behandlinger);

    const cls = BEMHelper('saksoversikt-header');
    return (
        <div className={cls.block}>
            <div className={cls.element('top')}>
                <Innholdstittel>
                    <FormattedMessage id={getSaksoversiktTitle(sak)} />
                </Innholdstittel>
                {sak.saksnummer && (
                    <Etikett
                        etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                        value={sak.saksnummer}
                    />
                )}
            </div>

            {harSøkt(sak) && (
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
                        <EtikettBase className={cls.element('status-etikett')} type={getEtikettTypeForSaksstatus(sak)}>
                            <FormattedMessage id={statusIntlKey} />
                        </EtikettBase>
                    ) : (
                        <BamseIkon />
                    )}
                </div>
            )}
        </div>
    );
};

export default SaksoversiktHeader;
