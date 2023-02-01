import React, { useEffect, useRef } from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Saksoversikt from 'app/pages/saksoversikt/Saksoversikt';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';
import Forside from 'app/pages/forside/Forside';
import Header from 'app/components/header/Header';
import DokumenterPage from 'app/pages/dokumenter-page/DokumenterPage';
import Opplysninger from 'app/pages/opplysninger/Opplysninger';
import { SakOppslag } from 'app/types/SakOppslag';

import './routes-wrapper.css';
import { getAntallSaker } from 'app/utils/sakerUtils';

interface Props {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

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

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, saker }) => {
    const bem = bemUtils('routesWrapper');
    const hasNavigated = useRef(false);
    const navigate = useNavigate();
    const path = location.pathname;

    useEffect(() => {
        if (!hasNavigated.current) {
            hasNavigated.current = true;
            const antallSaker = getAntallSaker(saker);
            const { foreldrepenger, engangsstønad, svangerskapspenger } = saker;

            if (antallSaker === 1) {
                if (foreldrepenger.length === 1) {
                    navigate(foreldrepenger[0].saksnummer);
                }

                if (engangsstønad.length === 1) {
                    navigate(engangsstønad[0].saksnummer);
                }

                if (svangerskapspenger.length === 1) {
                    navigate(svangerskapspenger[0].saksnummer);
                }
            }
        }
    }, [navigate, saker]);

    const headerRouteInfo = getHeaderRouteInfo(path);

    return (
        <>
            <Header
                route={headerRouteInfo.route}
                linkLabel={headerRouteInfo.label}
                externalURL={headerRouteInfo.isExternalURL}
            />
            <div className={bem.block}>
                <Routes>
                    <Route path="/" element={<Forside saker={saker} />} />
                    <Route path="/:saksnummer" element={<SakComponent />}>
                        <Route index element={<Saksoversikt saker={saker} navnPåSøker={søkerinfo.søker.fornavn} />} />
                        <Route path={OversiktRoutes.OPPLYSNINGER} element={<Opplysninger />} />
                        <Route path={OversiktRoutes.DIN_PLAN} element={<DinPlanPage />} />
                        <Route path={OversiktRoutes.DOKUMENTER} element={<DokumenterPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
                </Routes>
            </div>
        </>
    );
};

export default ForeldrepengeoversiktRoutes;
