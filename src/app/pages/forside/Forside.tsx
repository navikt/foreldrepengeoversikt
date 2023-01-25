import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import { Sak } from 'app/types/Sak';
import HarSaker from 'app/components/har-saker/HarSaker';
import { grupperSakerPåBarn } from 'app/utils/sakerUtils';

import './forside.css';
import { bemUtils } from '@navikt/fp-common';

interface Props {
    saker: Sak[];
}

const Forside: React.FunctionComponent<Props> = ({ saker }) => {
    const grupperteSaker = grupperSakerPåBarn(saker);
    const bem = bemUtils('forside');

    return (
        <div className={bem.block}>
            {saker.length > 0 ? <HarSaker grupperteSaker={grupperteSaker} /> : <HarIkkeSaker />}
        </div>
    );
};

export default Forside;
