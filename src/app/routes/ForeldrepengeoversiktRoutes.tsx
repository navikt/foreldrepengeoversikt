import React from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import Hovedside from 'app/pages/Hovedside';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';
import SamtalerPage from 'app/pages/samtaler/SamtalerPage';
import SeSøknadPage from 'app/pages/se-søknad-page/SeSøknadPage';

import './routes-wrapper.css';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';

interface Props {
    søkerinfo: SøkerinfoDTO;
    foreldrepengerSaker: Sak[];
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo, foreldrepengerSaker }) => {
    const bem = bemUtils('routesWrapper');

    return (
        <div className={bem.block}>
            <Routes>
                <Route
                    path={OversiktRoutes.HOVEDSIDE}
                    element={
                        <Hovedside foreldrepengerSaker={foreldrepengerSaker} navnPåSøker={søkerinfo.søker.fornavn} />
                    }
                />
                <Route path={OversiktRoutes.SAMTALER} element={<SamtalerPage />} />
                <Route path={OversiktRoutes.SE_SØKNAD} element={<SeSøknadPage />} />
                <Route path={OversiktRoutes.DIN_PLAN} element={<DinPlanPage />} />
                <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
            </Routes>
        </div>
    );
};

export default ForeldrepengeoversiktRoutes;
