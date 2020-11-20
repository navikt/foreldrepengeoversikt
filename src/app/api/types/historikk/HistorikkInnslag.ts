import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';

export enum HistorikkInnslagType {
    'søknad' = 'søknad',
    'inntekt' = 'inntekt',
    'minidialog' = 'minidialog',
}

export interface HistorikkInnslag {
    type: HistorikkInnslagType;
    aktørId: string;
    saksnr: string;
    journalpostId: string;
    opprettet: string;
    fnr: string;
}

export interface Innsendingsinnslag extends HistorikkInnslag {
    type: HistorikkInnslagType.søknad;
    hendelse: HendelseType;
    ikkeOpplastedeVedlegg?: Skjemanummer[];
    opplastedeVedlegg?: Skjemanummer[];
    behandlingsdato: string;
    referanseId: string;
    dialogId?: string;
}

export interface InntektsmeldingInnslag extends HistorikkInnslag {
    arbeidsgiver: {
        navn: string;
    };
    referanseId: string;
    dialogId: string;
}

export interface MinidialogInnslag extends HistorikkInnslag {
    type: HistorikkInnslagType.minidialog;
    gyldigTil: string;
    tekst: string;
    aktiv: boolean;
    hendelse: HendelseType;
    dialogId: string;
}

export const isMinidialogInnslag = (historikkInnslag: HistorikkInnslag): historikkInnslag is MinidialogInnslag =>
    historikkInnslag.type === HistorikkInnslagType.minidialog;

export const isInnsendingInnslag = (historikkInnslag: HistorikkInnslag): historikkInnslag is Innsendingsinnslag =>
    historikkInnslag.type === HistorikkInnslagType.søknad;

export const isInntektsmeldingInnslag = (
    historikkInnslag: HistorikkInnslag
): historikkInnslag is InntektsmeldingInnslag => historikkInnslag.type === HistorikkInnslagType.inntekt;

export enum HendelseType {
    TILBAKEKREVING_SPM = 'TILBAKEKREVING_SPM ',
    TILBAKEKREVING_SVAR = 'TILBAKEKREVING_SVAR',
    TILBAKEKREVING_FATTET_VEDTAK = 'TILBAKEKREVING_FATTET_VEDTAK',
    VEDTAK = 'VEDTAK',
    INNTEKTSMELDING = 'INNTEKTSMELDING',
    INITIELL_ENGANGSSTØNAD = 'INITIELL_ENGANGSSTØNAD',
    INITIELL_FORELDREPENGER = 'INITIELL_FORELDREPENGER',
    INITIELL_SVANGERSKAPSPENGER = 'INITIELL_SVANGERSKAPSPENGER',
    ETTERSENDING_FORELDREPENGER = 'ETTERSENDING_FORELDREPENGER',
    ETTERSENDING_ENGANGSSTØNAD = 'ETTERSENDING_ENGANGSSTØNAD',
    ETTERSENDING_SVANGERSKAPSPENGER = 'ETTERSENDING_SVANGERSKAPSPENGER',
    ENDRING_FORELDREPENGER = 'ENDRING_FORELDREPENGER',
    ENDRING_SVANGERSKAPSPENGER = 'ENDRING_SVANGERSKAPSPENGER',
    UKJENT = 'UKJENT',
}
