import React from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import Hovedside from 'app/pages/Hovedside';
import { bemUtils } from '@navikt/fp-common';

import './routes-wrapper.css';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

interface Props {
    søkerinfo: SøkerinfoDTO;
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({ søkerinfo }) => {
    const bem = bemUtils('routesWrapper');

    return (
        <div className={bem.block}>
            <Routes>
                <Route path={OversiktRoutes.HOVEDSIDE} element={<Hovedside />} />
                <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
            </Routes>
        </div>
    );
};

export default ForeldrepengeoversiktRoutes;
