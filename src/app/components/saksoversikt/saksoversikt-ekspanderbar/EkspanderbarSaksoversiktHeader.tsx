import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';

import Sak from '../../../types/Sak';
import { formatDate, getIntlKeyForStatus, getEtikettTypeForSaksstatus } from '../utils';
import BEMHelper from 'common/util/bem';
import { erForeldrepengesak } from '../../../utils/sakerUtils';

import './ekspanderbarSaksoversikt.less';

interface Props {
    sak: Sak;
}

const EkspanderbarSaksoversiktHeader: React.FunctionComponent<Props> = ({ sak }) => {
    const statusIntlKey = sak.status && getIntlKeyForStatus(sak.status);
    const cls = BEMHelper('ekspenderbar-saksoversikt-header');
    return (
        <div className={cls.className}>
            <div className={cls.element('left')}>
                <Undertittel>
                    <FormattedMessage
                        id={
                            erForeldrepengesak(sak)
                                ? 'saksoversikt.heading.top.foreldrepenger'
                                : 'saksoversikt.heading.top.engangsstønad'
                        }
                    />
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

            {statusIntlKey && (
                <EtikettBase
                    className={cls.element('status-etikett')}
                    type={getEtikettTypeForSaksstatus(sak)}>
                    <FormattedMessage id={statusIntlKey} />
                </EtikettBase>
            )}
        </div>
    );
};
export default EkspanderbarSaksoversiktHeader;
