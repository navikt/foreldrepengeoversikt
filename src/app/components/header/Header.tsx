import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import SelectedRoute from 'app/types/SelectedRoute';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';
import PreviousLink from '../previous-link/PreviousLink';

import './header.css';

const getHeaderRouteInfo = (path: string, minidialogerIds: string[], selectedRoute: SelectedRoute) => {
    if (selectedRoute === SelectedRoute.DOKUMENTER) {
        const previousPage = path.split('/dokumenter')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === SelectedRoute.ETTERSEND) {
        const previousPage = path.split('/ettersend')[0];
        return { route: `${previousPage}/${OversiktRoutes.DOKUMENTER}`, label: 'Dokumenter', isExternalURL: false };
    }

    if (selectedRoute === SelectedRoute.OPPLYSNINGER) {
        const previousPage = path.split('/opplysninger')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    const currentOppgaveRoute = minidialogerIds.find((id) => path.includes(id));
    if (currentOppgaveRoute) {
        const previousPage = path.split(`/${currentOppgaveRoute}`)[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === SelectedRoute.HOVEDSIDE) {
        return { route: OversiktRoutes.HOVEDSIDE, label: 'Mine foreldrepenger', isExternalURL: false };
    }

    return { route: 'https://www.nav.no/no/ditt-nav', label: 'Min side', isExternalURL: true };
};

const renderHeaderContent = (selectedRoute: SelectedRoute) => {
    const bem = bemUtils('header');

    if (selectedRoute === SelectedRoute.HOVEDSIDE) {
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

    if (selectedRoute === SelectedRoute.SAKSOVERSIKT) {
        return (
            <div className={bem.element('content')}>
                <TåteflaskeBaby />
                <Heading size="xlarge">Foreldrepengesaken</Heading>
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

    const { route, isExternalURL, label } = headerRouteInfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={isExternalURL} linkLabel={label} />
                {renderHeaderContent(selectedRoute)}
            </div>
        </div>
    );
};

export default Header;
