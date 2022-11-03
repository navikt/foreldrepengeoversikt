import React from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import Hovedside from 'app/pages/Hovedside';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';

import './routes-wrapper.css';

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
                    element={<Hovedside foreldrepengerSaker={foreldrepengerSaker} />}
                />
                <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
            </Routes>
        </div>
    );
};

export default ForeldrepengeoversiktRoutes;
