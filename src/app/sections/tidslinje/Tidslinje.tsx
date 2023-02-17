import { BodyShort, Link, Loader } from '@navikt/ds-react';
import { Link as LinkInternal } from 'react-router-dom';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import { Sak } from 'app/types/Sak';
import { EngangsstønadSak } from 'app/types/EngangsstønadSak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import React from 'react';
import { useParams } from 'react-router-dom';
import DokumentHendelse from './DokumentHendelse';
import TidslinjeHendelse from './TidslinjeHendelse';
import { ExternalLink, Next } from '@navikt/ds-icons';
import {
    VENTEÅRSAKER,
    sorterTidslinjehendelser,
    getTidslinjehendelseFraBehandlingPåVent,
    getTidslinjehendelseStatus,
    getTidslinjehendelseTittel,
} from 'app/utils/tidslinjeUtils';
import './tidslinje-hendelse.css';
import { useIntl } from 'react-intl';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
interface Params {
    sak: Sak | EngangsstønadSak | SvangerskapspengeSak;
}

const Tidslinje: React.FunctionComponent<Params> = ({ sak }) => {
    const params = useParams();
    const intl = useIntl();
    const bem = bemUtils('tidslinje-hendelse');
    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    if (tidslinjeHendelserError || manglendeVedleggError) {
        return <BodyShort>Vi har problemer med å hente informasjon om hva som skjer i saken din.</BodyShort>;
    }

    if (!tidslinjeHendelserData || !manglendeVedleggData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    const åpenBehandlingPåVent =
        sak.åpenBehandling && VENTEÅRSAKER.includes(sak.åpenBehandling.tilstand) ? sak.åpenBehandling : undefined;
    const venteHendelse = åpenBehandlingPåVent
        ? getTidslinjehendelseFraBehandlingPåVent(åpenBehandlingPåVent, intl)
        : undefined;

    const alleHendelser = venteHendelse ? tidslinjeHendelserData.concat([venteHendelse]) : tidslinjeHendelserData;
    const sorterteHendelser = alleHendelser.sort(sorterTidslinjehendelser);

    return (
        <div>
            {sorterteHendelser.map((hendelse) => {
                return (
                    <TidslinjeHendelse
                        date={hendelse.opprettet}
                        type={getTidslinjehendelseStatus(hendelse.tidslinjeHendelseType, hendelse.opprettet)}
                        title={getTidslinjehendelseTittel(
                            hendelse.tidslinjeHendelseType,
                            intl,
                            hendelse.tidligstBehandlingsDato,
                            manglendeVedleggData
                        )}
                        key={guid()}
                    >
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            {hendelse.dokumenter.length > 0 &&
                                hendelse.dokumenter.map((dokument) => {
                                    return <DokumentHendelse dokument={dokument} key={dokument.url} />;
                                })}
                            {hendelse.tidslinjeHendelseType === TidslinjehendelseType.VENT_DOKUMENTASJON &&
                                manglendeVedleggData &&
                                manglendeVedleggData.length > 1 && (
                                    <ul className={bem.element('dokument_liste')}>
                                        {manglendeVedleggData.map((skjemaId) => {
                                            return <li key={guid()}>{intlUtils(intl, `ettersendelse.${skjemaId}`)}</li>;
                                        })}
                                    </ul>
                                )}
                            {hendelse.merInformasjon && <BodyShort>{hendelse.merInformasjon}</BodyShort>}
                            {hendelse.linkTittel && hendelse.eksternalUrl && (
                                <Link href={hendelse.eksternalUrl} className={bem.element('link_external')}>
                                    <BodyShort>{hendelse.linkTittel}</BodyShort>
                                    <ExternalLink></ExternalLink>
                                </Link>
                            )}
                            {hendelse.linkTittel && hendelse.internalUrl && (
                                <LinkInternal to={hendelse.internalUrl} className={bem.element('link_internal')}>
                                    <BodyShort>{hendelse.linkTittel}</BodyShort>
                                    <Next className={bem.element('link_internal_icon')}></Next>
                                </LinkInternal>
                            )}
                        </ul>
                    </TidslinjeHendelse>
                );
            })}
        </div>
    );
};

export default Tidslinje;
