import React, { useEffect } from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Saksoversikt from 'app/pages/Saksoversikt';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';
import SamtalerPage from 'app/pages/samtaler/SamtalerPage';
import SeSøknadPage from 'app/pages/se-søknad-page/SeSøknadPage';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';
import DokumenterPage from 'app/pages/dokumenter-page/DokumenterPage';
import Forside from 'app/pages/forside/Forside';
import Header from 'app/components/header/Header';

import './routes-wrapper.css';

interface Props {
    søkerinfo: SøkerinfoDTO;
    foreldrepengerSaker: Sak[];
}

const getHeaderRouteInfo = (path: string) => {
    if (path.length > 1) {
        return { route: OversiktRoutes.HOVEDSIDE, label: 'Mine foreldrepenger', isExternalURL: false };
    }

    return { route: 'https://www.nav.no/no/ditt-nav', label: 'Min side', isExternalURL: true };
};

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, foreldrepengerSaker }) => {
    const bem = bemUtils('routesWrapper');
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    console.log(path);
    console.log(location);

    useEffect(() => {
        if (foreldrepengerSaker.length === 1) {
            navigate(foreldrepengerSaker[0].saksnummer);
        }

        if (foreldrepengerSaker.length === 0) {
            navigate(OversiktRoutes.HOVEDSIDE);
        }
    }, [foreldrepengerSaker]);

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
                    <Route path="/" element={<Forside saker={foreldrepengerSaker} />} />
                    <Route path={`/:saksnummer${OversiktRoutes.SAKSOVERSIKT}`} element={<SakComponent />}>
                        <Route
                            index
                            element={
                                <Saksoversikt
                                    foreldrepengerSaker={foreldrepengerSaker}
                                    navnPåSøker={søkerinfo.søker.fornavn}
                                />
                            }
                        />
                        <Route path={OversiktRoutes.SAMTALER} element={<SamtalerPage />} />
                        <Route path={OversiktRoutes.SE_SØKNAD} element={<SeSøknadPage />} />
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