import { BodyShort, Heading, Tag } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import { getFamiliehendelseDato, utledFamiliesituasjon } from 'app/utils/sakerUtils';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';
import { getHeading } from '../har-saker/HarSaker';
import PreviousLink from '../previous-link/PreviousLink';

import './header.css';

const getHeaderRouteInfo = (path: string, minidialogerIds: string[], selectedRoute: OversiktRoutes) => {
    if (selectedRoute === OversiktRoutes.DOKUMENTER) {
        const previousPage = path.split('/dokumenter')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.ETTERSEND) {
        const previousPage = path.split('/ettersend')[0];
        return { route: `${previousPage}/${OversiktRoutes.DOKUMENTER}`, label: 'Dokumenter', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.OPPLYSNINGER) {
        const previousPage = path.split('/opplysninger')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    const currentOppgaveRoute = minidialogerIds.find((id) => path.includes(id));
    if (currentOppgaveRoute) {
        const previousPage = path.split(`/${currentOppgaveRoute}`)[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.SAKSOVERSIKT) {
        return { route: OversiktRoutes.HOVEDSIDE, label: 'Mine foreldrepenger', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.DIN_PLAN) {
        const previousPage = path.split('/din-plan')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    return { route: 'https://www.nav.no/no/ditt-nav', label: 'Min side', isExternalURL: true };
};

const getSaksoversiktHeading = (ytelse: Ytelse) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Engangsstønadsak';
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Svangerskapspengesak';
    }

    return 'Foreldrepengesak';
};

const renderTag = (sak: Sak) => {
    if (sak.åpenBehandling) {
        if (!sak.sakAvsluttet) {
            if (sak.åpenBehandling.tilstand === BehandlingTilstand.UNDER_BEHANDLING) {
                return <Tag variant="warning">Under behandling</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
                return <Tag variant="warning">Venter på inntektsmelding fra arbeidsgiver</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON) {
                return <Tag variant="warning">Venter på nødvendig dokumentasjon</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD) {
                return <Tag variant="warning">Søknaden vil bli behandlet senere</Tag>;
            }
        }
    }

    return null;
};

const renderHeaderContent = (selectedRoute: OversiktRoutes, sak: Sak | undefined) => {
    const bem = bemUtils('header');

    if (selectedRoute === OversiktRoutes.HOVEDSIDE) {
        return (
            <div className={bem.element('content')}>
                <TåteflaskeBaby />
                <div className={bem.element('title-container')}>
                    <Heading size="xlarge">Foreldrepengene mine</Heading>
                    <BodyShort>PENGESTØTTE</BodyShort>
                </div>
            </div>
        );
    }

    if (selectedRoute === OversiktRoutes.SAKSOVERSIKT && sak) {
        const situasjon = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
        const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
        const beskrivelse = getHeading(situasjon, sak.familiehendelse.antallBarn, familiehendelsedato);

        return (
            <div className={bem.element('content')}>
                <TåteflaskeBaby />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                    <Heading size="xlarge">{getSaksoversiktHeading(sak.ytelse)}</Heading>
                    <BodyShort>{beskrivelse}</BodyShort>
                    {renderTag(sak)}
                </div>
            </div>
        );
    }

    return (
        <div className={bem.element('content')}>
            <TåteflaskeBaby />
            <div className={bem.element('title-container')}>
                <Heading size="xlarge">Foreldrepengene mine</Heading>
                <BodyShort>PENGESTØTTE</BodyShort>
            </div>
        </div>
    );
};

interface Props {
    minidialogerIds: string[];
}

const Header: React.FunctionComponent<Props> = ({ minidialogerIds }) => {
    const bem = bemUtils('header');
    const path = location.pathname;
    const selectedRoute = useGetSelectedRoute();
    const headerRouteInfo = getHeaderRouteInfo(path, minidialogerIds, selectedRoute);
    const sak = useGetSelectedSak();

    const { route, isExternalURL, label } = headerRouteInfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={isExternalURL} linkLabel={label} />
                {renderHeaderContent(selectedRoute, sak)}
            </div>
        </div>
    );
};

export default Header;
