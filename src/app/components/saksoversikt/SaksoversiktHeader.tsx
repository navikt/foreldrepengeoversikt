import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';

import Sak from '../../types/Sak';
import { erForeldrepengesak, erInfotrygdSak } from '../../utils/sakerUtils';
import { formatDate, getIntlKeyForStatus } from '../ekspanderbar-saksoversikt/util';
import BEMHelper from 'common/util/bem';
import Etikett from '../etikett/etikett';

import './saksoversikt.less';
import EtikettBase from 'nav-frontend-etiketter';

interface SaksoversiktHeaderProps {
    sak: Sak;
}

const SaksoversiktHeader = ({ sak }: SaksoversiktHeaderProps) => {
    const statusIntlKey = sak.status && getIntlKeyForStatus(sak.status);
    const cls = BEMHelper('saksoversikt-header');
    return (
        <div className={cls.className}>
            <div className={cls.element('top')}>
                <Innholdstittel>
                    <FormattedMessage
                        id={
                            erForeldrepengesak(sak)
                                ? 'saksoversikt.heading.top.foreldrepenger'
                                : 'saksoversikt.heading.top.engangsstønad'
                        }
                    />
                </Innholdstittel>
                {sak.saksnummer && (
                    <Etikett
                        etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                        value={sak.saksnummer}
                    />
                )}
            </div>

            {!erInfotrygdSak(sak) && (
                <div className={cls.element('bottom-row')}>
                    <Etikett
                        className={cls.element('mottatt')}
                        etikett={<FormattedMessage id="saksoversikt.heading.mottatt" />}
                        value={formatDate(sak.opprettet)}
                    />
                    {statusIntlKey && (
                        <div>
                            <EtikettBase
                                className={cls.element('status-etikett')}
                                type={statusIntlKey === 'saksoversikt.heading.avsluttet' ? 'suksess' : 'fokus'}>
                                <FormattedMessage id={statusIntlKey} />
                            </EtikettBase>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SaksoversiktHeader;
