import { Heading } from '@navikt/ds-react';
import { bemUtils, formatDate } from '@navikt/fp-common';
import { GruppertSak } from 'app/types/GruppertSak';
import EtBarn from 'assets/EtBarn';
import React from 'react';
import SakLink from '../sak-link/SakLink';

import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const bem = bemUtils('har-saker');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="medium" level="2" className={bem.element('tittel')}>
                            <EtBarn />{' '}
                            {`${gruppering.antallBarn} barn med termin ${formatDate(gruppering.familiehendelsedato)}`}
                        </Heading>
                        {gruppering.saker.map((sak) => {
                            return <SakLink sak={sak} />;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;