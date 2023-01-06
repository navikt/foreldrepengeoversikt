import { LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Sak } from 'app/types/Sak';
import React from 'react';

import './har-saker.css';

interface Props {
    saker: Sak[];
}

const HarSaker: React.FunctionComponent<Props> = ({ saker }) => {
    const bem = bemUtils('har-saker');

    return (
        <>
            {saker.map((sak) => {
                return (
                    <div className={bem.block} key={sak.saksnummer}>
                        <LinkPanel href={`${sak.saksnummer}`}>{sak.saksnummer}</LinkPanel>
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;
