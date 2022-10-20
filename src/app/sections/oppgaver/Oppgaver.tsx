import { BodyLong, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';

import './oppgaver.css';

const Oppgaver = () => {
    const bem = bemUtils('oppgaver');

    return (
        <div className={bem.block}>
            <div className={bem.element('tekst')}>
                <BodyLong>NAV kan ikke behandle søknaden din før vi har fått nødvendig dokumentasjon</BodyLong>
            </div>
            <LinkPanel className={bem.element('linkPanel')} href="#">
                <LinkPanel.Title>Last opp terminbrekreftelse</LinkPanel.Title>
            </LinkPanel>
            <LinkPanel className={bem.element('linkPanel')} href="#">
                <LinkPanel.Title>Send meldekort</LinkPanel.Title>
                <LinkPanel.Description>Noe beskrivelse</LinkPanel.Description>
            </LinkPanel>
            <LinkPanel className={bem.element('linkPanel')} href="#">
                <LinkPanel.Title>Send info til arbeidsgiver om inntektsmelding</LinkPanel.Title>
                <LinkPanel.Description>Noe beskrivelse</LinkPanel.Description>
            </LinkPanel>
        </div>
    );
};

export default Oppgaver;
