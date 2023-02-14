import React from 'react';
import { bemUtils, intlUtils } from '@navikt/fp-common';

import './snarveier.css';
import { useIntl } from 'react-intl';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { NavRoutes } from 'app/routes/routes';
import { Link } from 'react-router-dom';

const Snarveier: React.FunctionComponent = () => {
    const bem = bemUtils('snarveier');
    const intl = useIntl();
    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <div className={bem.element('title')}>
                    <Heading size="medium">{intlUtils(intl, 'saksoversikt.snarveier')}</Heading>
                </div>
                <div className={bem.element('content')}>
                    <LinkPanel
                        as={Link}
                        to={NavRoutes.SAKSBEHANDLINGSTIDER}
                        border={false}
                        className={bem.element('linkPanel_left')}
                    >
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>Saksbehandlingstider</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                    <LinkPanel
                        as={Link}
                        to={NavRoutes.KLAG_PÅ_VEDTAK}
                        border={false}
                        className={bem.element('linkPanel_right')}
                    >
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>Send klage på vedtak</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                </div>
            </div>
        </div>
    );
};

export default Snarveier;
