import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';
import PreviousLink from '../previous-link/PreviousLink';

import './header.css';

const getHeaderRouteInfo = (path: string) => {
    if (path.includes('dokumenter')) {
        const previousPage = path.split('/dokumenter')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (path.includes('opplysninger')) {
        const previousPage = path.split('/opplysninger')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (path.length > 1) {
        return { route: OversiktRoutes.HOVEDSIDE, label: 'Mine foreldrepenger', isExternalURL: false };
    }

    return { route: 'https://www.nav.no/no/ditt-nav', label: 'Min side', isExternalURL: true };
};

const Header: React.FunctionComponent = () => {
    const bem = bemUtils('header');
    const path = location.pathname;
    const headerRouteInfo = getHeaderRouteInfo(path);
    const { route, isExternalURL, label } = headerRouteInfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={isExternalURL} linkLabel={label} />
                <div className={bem.element('content')}>
                    <TåteflaskeBaby />
                    <div className={bem.element('title-container')}>
                        <Heading size="xlarge">Foreldrepengene mine</Heading>
                        <BodyShort>PENGESTØTTE</BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
