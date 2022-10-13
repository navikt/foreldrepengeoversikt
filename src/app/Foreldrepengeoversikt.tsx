import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ForeldrepengesøknadRoutes from './routes/ForeldrepengeoversiktRoutes';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <ForeldrepengesøknadRoutes />
        </BrowserRouter>
    );
};

export default Foreldrepengeoversikt;
