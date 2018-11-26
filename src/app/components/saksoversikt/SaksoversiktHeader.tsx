import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';

import Sak from '../../types/Sak';
import { formatDate, getIntlKeyForStatus } from './util';
import BEMHelper from 'common/util/bem';

import './saksoversikt.less';

interface Props {
    sak: Sak;
}

const SaksoversiktHeader = ({ sak }: Props) => {
    const cls = BEMHelper('saksoversikt-header');
    return (
        <div className={cls.className}>
            <div className={cls.element('left')}>
                <Undertittel>
                    <FormattedMessage id={'saksoversikt.heading.top'} />
                </Undertittel>

                {sak.opprettet && (
                    <Normaltekst>
                        <FormattedMessage
                            id={'saksoversikt.heading.bottom'}
                            values={{ date: formatDate(sak.opprettet) }}
                        />
                    </Normaltekst>
                )}
            </div>

            {sak.status && (
                <EtikettBase className={cls.element('status-etikett')} type="fokus">
                    <FormattedMessage id={getIntlKeyForStatus(sak.status)} />
                </EtikettBase>
            )}
        </div>
    );
};
export default SaksoversiktHeader;
