import { LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { List } from '@navikt/ds-icons';
import React from 'react';
import OversiktRoutes from 'app/routes/routes';
import { Link } from 'react-router-dom';

import './se-søknad.css';

const SeSøknad = () => {
    const bem = bemUtils('se-søknad');

    return (
        <LinkPanel as={Link} to={OversiktRoutes.SE_SØKNAD} border={false} className={bem.element('linkPanel')}>
            <LinkPanel.Title>
                <div className={bem.block}>
                    <div className={bem.element('ikon')}>
                        <List />
                    </div>
                    Se og endre søknad
                </div>
            </LinkPanel.Title>
        </LinkPanel>
    );
};

export default SeSøknad;
