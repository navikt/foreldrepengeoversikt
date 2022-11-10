import { LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';
import ChatGroupBubble from 'assets/ChatGroupBubble';
import React from 'react';
import { Link } from 'react-router-dom';

import './samtaler.css';

const Samtaler = () => {
    const bem = bemUtils('samtaler');

    return (
        <LinkPanel as={Link} to={OversiktRoutes.SAMTALER} border={false} className={bem.element('linkPanel')}>
            <LinkPanel.Title>
                <div className={bem.block}>
                    <div className={bem.element('ikon')}>
                        <ChatGroupBubble />
                    </div>
                    Samtaler med NAV
                </div>
            </LinkPanel.Title>
        </LinkPanel>
    );
};

export default Samtaler;
