import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import { Sak } from 'app/types/Sak';
import HarSaker from 'app/components/har-saker/HarSaker';

interface Props {
    saker: Sak[];
}

const Forside: React.FunctionComponent<Props> = ({ saker }) => {
    return <div>{saker.length > 0 ? <HarSaker saker={saker} /> : <HarIkkeSaker />}</div>;
};

export default Forside;
