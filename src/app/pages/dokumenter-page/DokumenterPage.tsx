import { bemUtils } from '@navikt/fp-common';
import React from 'react';

import './dokumenter-page.css';

const DokumenterPage: React.FunctionComponent = () => {
    const bem = bemUtils('dokumenter-page');

    return <div className={bem.block}>Oversikt over dokumenter</div>;
};

export default DokumenterPage;
