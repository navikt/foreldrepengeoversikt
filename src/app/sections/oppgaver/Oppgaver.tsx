import { BodyLong, BodyShort, Loader } from '@navikt/ds-react';
import { bemUtils, guid } from '@navikt/fp-common';
import { HendelseType } from 'app/types/HendelseType';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import OppgaveLenkepanel from '../oppgave-lenkepanel/OppgaveLenkepanel';
import './oppgaver.css';
interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
}
const Oppgaver: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError }) => {
    const bem = bemUtils('oppgaver');

    if (minidialogerError) {
        return <BodyShort>Vi har problemer med å hente informasjon om oppgavene i saken din.</BodyShort>;
    }

    if (!minidialogerData) {
        return <Loader size="large" aria-label="Henter status for dine oppgaver" />;
    }
    return (
        <div className={bem.block}>
            <div className={bem.element('header')}>
                <div>
                    <BodyLong>NAV kan ikke behandle søknaden din før vi har fått nødvendig informasjon:</BodyLong>
                </div>
            </div>
            <>
                {minidialogerData
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
