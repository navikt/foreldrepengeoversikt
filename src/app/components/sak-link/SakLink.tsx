import { Heading, LinkPanel, Tag } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { BehandlingTilstand } from 'app/types/BehandlingTilstand';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import React from 'react';
import { Link } from 'react-router-dom';

import './sak-link.css';

interface Props {
    sak: Sak;
}

const getHeading = (ytelse: Ytelse) => {
    switch (ytelse) {
        case Ytelse.ENGANGSSTØNAD:
            return 'Engangsstønad';
        case Ytelse.FORELDREPENGER:
            return 'Foreldrepenger';
        case Ytelse.SVANGERSKAPSPENGER:
            return 'Svangerskapspenger';
    }
};

const getTag = (sak: Sak) => {
    if (sak.åpenBehandling) {
        if (!sak.sakAvsluttet) {
            if (sak.åpenBehandling.tilstand === BehandlingTilstand.UNDER_BEHANDLING) {
                return <Tag variant="warning">Under behandling</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING) {
                return <Tag variant="warning">Venter på inntektsmelding fra arbeidsgiver</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.VENTER_PÅ_DOKUMENTASJON) {
                return <Tag variant="warning">Venter på nødvendig dokumentasjon</Tag>;
            }

            if (sak.åpenBehandling.tilstand === BehandlingTilstand.TIDLIG_SØKNAD) {
                return <Tag variant="warning">Søknaden vil bli behandlet senere</Tag>;
            }
        }
    }

    if (sak.sakAvsluttet) {
        return <Tag variant="success">Avsluttet</Tag>;
    }

    return <Tag variant="success">Aktiv</Tag>;
};

const SakLink: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = bemUtils('sak-link');

    return (
        <LinkPanel as={Link} to={`/sak/${sak.saksnummer}`} className={bem.block}>
            <div className={bem.element('content')}>
                <Heading level="3" size="medium">
                    {getHeading(sak.ytelse)}
                </Heading>
                {getTag(sak)}
            </div>
        </LinkPanel>
    );
};

export default SakLink;
