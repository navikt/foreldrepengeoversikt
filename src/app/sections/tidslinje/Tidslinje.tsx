import { BodyShort, Loader } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';
import Api from 'app/api/api';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import React from 'react';
import { useParams } from 'react-router-dom';
import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';

const getTidslinjehendelseTittel = (hendelsetype: TidslinjehendelseType): string => {
    switch (hendelsetype) {
        case TidslinjehendelseType.FØRSTEGANGSSØKNAD:
            return 'Du har sendt oss en søknad';
        case TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY:
            return 'Du har sendt oss en ny førstegangssøknad';
        case TidslinjehendelseType.INNTEKTSMELDING:
            return 'NAV mottok inntektsmelding';
        case TidslinjehendelseType.VEDTAK:
            return 'NAV har fattet vedtak';
        case TidslinjehendelseType.ETTERSENDING:
            return 'Du har ettersendt dokumentasjon';
        case TidslinjehendelseType.UTGÅENDE_INNHENT_OPPLYSNINGER:
            return 'NAV har etterspurt opplysninger';
        default:
            return '';
    }
};

const Tidslinje: React.FunctionComponent = () => {
    const params = useParams();
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);

    if (tidslinjeHendelserError) {
        return <BodyShort>Vi har problemer med å hente informasjon om hva som skjer i saken din.</BodyShort>;
    }

    if (!tidslinjeHendelserData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
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
