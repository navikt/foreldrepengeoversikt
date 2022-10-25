import { Link } from '@navikt/ds-react';
import React from 'react';
import TidslinjeHendelse from './TidslinjeHendelse';

const Tidslinje = () => {
    return (
        <>
            <TidslinjeHendelse type="incomplete" title="Du vil få et vedtak" date={new Date()}>
                NAV bruker vanligvis ca 4 uker på å behandle søknaden.
            </TidslinjeHendelse>
            <TidslinjeHendelse type="warning" title="Søknad sendt" date={new Date()}>
                NAV venter på <Link href="#">inntektsmelding</Link> fra din arbeidsgiver
            </TidslinjeHendelse>
            <TidslinjeHendelse type="completed" title="Søknad sendt" date={new Date()}>
                <Link href="#">Se hva du har søkt om</Link>
            </TidslinjeHendelse>
        </>
    );
};

export default Tidslinje;
