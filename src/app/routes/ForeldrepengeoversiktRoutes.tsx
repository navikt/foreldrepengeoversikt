import React, { useEffect } from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Saksoversikt from 'app/pages/Saksoversikt';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';
import SamtalerPage from 'app/pages/samtaler/SamtalerPage';
import SeSøknadPage from 'app/pages/se-søknad-page/SeSøknadPage';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';

import './routes-wrapper.css';

interface Props {
    søkerinfo: SøkerinfoDTO;
    foreldrepengerSaker: Sak[];
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, foreldrepengerSaker }) => {
    const bem = bemUtils('routesWrapper');
    const navigate = useNavigate();

    useEffect(() => {
        if (foreldrepengerSaker.length === 1) {
            navigate(foreldrepengerSaker[0].saksnummer);
        }
    }, [foreldrepengerSaker]);

    return (
        <div className={bem.block}>
            <Routes>
                <Route path={OversiktRoutes.SAKSOVERSIKT} element={<SakComponent />}>
                    <Route
                        path={OversiktRoutes.SAKSOVERSIKT}
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
                </Route>
                <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
            </Routes>
        </div>
    );
};

export default ForeldrepengeoversiktRoutes;
