import { Skjemanummer } from "common/storage/attachment/types/Skjemanummer";

export enum HistorikkInnslagType {
    "søknad" = "søknad",
    "inntekt" = "inntekt",
    "minidialog" = "minidialog"
}

export interface HistorikkInnslagBase {
    type: HistorikkInnslagType;
    aktørId: string;
    saksnr: string;
    journalpostId: string;
    opprettet: string;
    fnr: string;
}

export interface Innsendingsinnslag extends HistorikkInnslagBase {
    type: HistorikkInnslagType.søknad,
    hendelse: HendelseType;
    vedlegg?: Skjemanummer[];
    behandlingsdato: string;
    referanseId: string;
    dialogId?: string;
}

export interface InntektsmeldingInnslag extends HistorikkInnslagBase {
    arbeidsgiver: object;
    referanseId: string;
    dialogId: string;
}


export interface MinidialogInnslag extends HistorikkInnslagBase {
    type: HistorikkInnslagType.minidialog;
    gyldigTil: string;
    tekst: string;
    aktiv: boolean;
    hendelse: HendelseType;
    dialogId: string;
}


export enum HendelseType {
    TILBAKEKREVING_SPM = "TILBAKEKREVING_SPM ",
    TILBAKEKREVING_SVAR = "TILBAKEKREVING_SVAR",
    VEDTAK = "VEDTAK",
    INNTEKTSMELDING = "INNTEKTSMELDING",
    INITIELL_ENGANGSSTØNAD = "INITIELL_ENGANGSSTØNAD",
    INITIELL_FORELDREPENGER = "INITIELL_FORELDREPENGER",
    INITIELL_SVANGERSKAPSPENGER = "INITIELL_SVANGERSKAPSPENGER",
    ETTERSENDING_FORELDREPENGER = "ETTERSENDING_FORELDREPENGER",
    ETTERSENDING_ENGANGSSTØNAD = "ETTERSENDING_ENGANGSSTØNAD",
    ETTERSENDING_SVANGERSKAPSPENGER = "ETTERSENDING_SVANGERSKAPSPENGER",
    ENDRING_FORELDREPENGER = "ENDRING_FORELDREPENGER",
    ENDRING_SVANGERSKAPSPENGER = "ENDRING_SVANGERSKAPSPENGER",
    UKJENT = "UKJENT"
}
