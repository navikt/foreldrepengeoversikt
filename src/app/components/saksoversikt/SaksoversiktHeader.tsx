import React from 'react';
import Sak from '../../types/Sak';
import { Normaltekst, Undertittel, Undertekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { erForeldrepengesak } from '../../utils/sakerUtils';
import { formatDate } from '../ekspanderbar-saksoversikt/util';
import BEMHelper from 'common/util/bem';

import './saksoversikt.less';

interface SaksoversiktHeaderProps {
    sak: Sak;
}

const SaksoversiktHeader = ({ sak }: SaksoversiktHeaderProps) => {
    const cls = BEMHelper('saksoversikt-header');
    return (
        <div className={cls.className}>
            <div className={cls.element('top')}>
                <Undertittel>
                    <FormattedMessage
                        id={
                            erForeldrepengesak(sak)
                                ? 'saksoversikt.heading.top.foreldrepenger'
                                : 'saksoversikt.heading.top.engangsstønad'
                        }
                    />
                </Undertittel>
                {sak.saksnummer && <Undertekst>{sak.saksnummer}</Undertekst>}
            </div>

            {sak.opprettet && (
                <Normaltekst>
                    <FormattedMessage id="saksoversikt.heading.bottom.mottatt" values={{ date: formatDate(sak.opprettet) }} />
                </Normaltekst>
            )}
        </div>
    );
};

export default SaksoversiktHeader;
