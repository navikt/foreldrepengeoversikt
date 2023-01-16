import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import { Success, Warning, Clock } from '@navikt/ds-icons';
import React from 'react';

import './tidslinje-hendelse.css';

type TidslinjeHendelseType = 'completed' | 'incomplete' | 'warning';

interface Props {
    type: TidslinjeHendelseType;
    title: string;
    date: Date;
    children: React.ReactNode;
}

const bem = bemUtils('tidslinje-hendelse');

const getIkon = (type: TidslinjeHendelseType) => {
    switch (type) {
        case 'completed':
            return <Success height="32" width="32" className={bem.element('ikon', 'completed')} />;
        case 'warning':
            return <Warning height="32" width="32" className={bem.element('ikon', 'warning')} />;
        case 'incomplete':
            return <Clock height="32" width="32" className={bem.element('ikon', 'incomplete')} />;
        default:
            return null;
    }
};

const TidslinjeHendelse: React.FunctionComponent<Props> = ({ type, date, title, children }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>{getIkon(type)}</div>
            <div>
                <Heading level="3" size="small">
                    {title}
                </Heading>
                <BodyShort size="small">{formatDateExtended(date)}</BodyShort>
                {children}
            </div>
        </div>
    );
};

export default TidslinjeHendelse;
