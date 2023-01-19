import { Loader } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';
import Api from 'app/api/api';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import React from 'react';
import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';

interface Props {
    saksnummer: string;
}

const getTidslinjehendelseTittel = (hendelsetype: TidslinjehendelseType): string => {
    switch (hendelsetype) {
        case TidslinjehendelseType.FØRSTEGANGSSØKNAD:
            return 'Søknad om foreldrepenger';
        default:
            return '';
    }
};

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
            {tidslinjeHendelserData.map((hendelse) => {
                return (
                    <TidslinjeHendelse
                        date={hendelse.opprettet}
                        type="completed"
                        title={getTidslinjehendelseTittel(hendelse.tidslinjeHendelseType)}
                        key={guid()}
                    >
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            {hendelse.dokumenter.length > 0 &&
                                hendelse.dokumenter.map((dokument) => {
                                    return <DokumentHendelse dokument={dokument} key={dokument.url} />;
                                })}
                        </ul>
                    </TidslinjeHendelse>
                );
            })}
        </div>
    );
};

export default Tidslinje;
