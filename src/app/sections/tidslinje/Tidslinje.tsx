import { Link, Loader } from '@navikt/ds-react';
import Api from 'app/api/api';
import React from 'react';
import TidslinjeHendelse from './TidslinjeHendelse';

interface Props {
    saksnummer: string;
}

const Tidslinje: React.FunctionComponent<Props> = ({ saksnummer }) => {
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(saksnummer);

    if (!tidslinjeHendelserData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    if (tidslinjeHendelserError) {
        return <div>Klarte ikke å hente status for din søknad</div>;
    }

    return (
        <div>
            <TidslinjeHendelse type="incomplete" title="Du vil få et vedtak" date={new Date()}>
                NAV bruker vanligvis ca 4 uker på å behandle søknaden.
            </TidslinjeHendelse>
            <TidslinjeHendelse type="warning" title="Søknad sendt" date={new Date()}>
                NAV venter på <Link href="#">inntektsmelding</Link> fra din arbeidsgiver
            </TidslinjeHendelse>
            <TidslinjeHendelse type="completed" title="Søknad sendt" date={new Date()}>
                <Link href="#">Se hva du har søkt om</Link>
            </TidslinjeHendelse>
        </div>
    );
};

export default Tidslinje;
