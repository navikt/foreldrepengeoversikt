import { BodyLong } from '@navikt/ds-react';
import { bemUtils, guid } from '@navikt/fp-common';
import { HendelseType } from 'app/types/HendelseType';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import dayjs from 'dayjs';
import React from 'react';
import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';
import './oppgaver.css';
interface Props {
    minidialoger: MinidialogInnslag[];
}
const Oppgaver: React.FunctionComponent<Props> = ({ minidialoger }) => {
    const bem = bemUtils('oppgaver');
    return (
        <div className={bem.block}>
            <div className={bem.element('header')}>
                <div>
                    <BodyLong>NAV kan ikke behandle søknaden din før vi har fått nødvendig informasjon:</BodyLong>
                </div>
            </div>
            <>
                {minidialoger
                    .filter(
                        ({ gyldigTil, aktiv, hendelse }) =>
                            aktiv &&
                            dayjs(gyldigTil).isSameOrAfter(new Date(), 'days') &&
                            hendelse !== HendelseType.TILBAKEKREVING_FATTET_VEDTAK
                    )
                    .map((minidialog) => (
                        <OppgaveLenkepanel
                            key={guid()}
                            tittel="Svar på varsel om tilbakebetaling"
                            minidialogInnslag={minidialog}
                        />
                    ))}
            </>
        </div>
    );
};

export default Oppgaver;
