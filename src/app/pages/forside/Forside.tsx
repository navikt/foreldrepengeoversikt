import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import { Sak } from 'app/types/Sak';
import HarSaker from 'app/components/har-saker/HarSaker';
import { grupperSakerPåBarn } from 'app/utils/sakerUtils';

interface Props {
    saker: Sak[];
}

const Forside: React.FunctionComponent<Props> = ({ saker }) => {
    const grupperteSaker = grupperSakerPåBarn(saker);
    console.log(grupperteSaker);

    return <div>{saker.length > 0 ? <HarSaker grupperteSaker={grupperteSaker} /> : <HarIkkeSaker />}</div>;
};

export default Forside;
