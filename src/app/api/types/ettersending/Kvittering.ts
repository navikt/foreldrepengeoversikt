export interface Kvittering {
    referanseId: string;
    mottattDato: string;
    leveranseStatus: LeveransesStatus;
    journalId: string;
    saksNr: string;
}

export enum LeveransesStatus {
    PÅ_VENT = "PÅ_VENT",
    AVSLÅTT = "AVSLÅTT",
    PÅGÅR = "PÅGÅR",
    INNVILGET = "INNVILGET",
    SENDT_OG_FORSØKT_BEHANDLET_FPSAK = "SENDT_OG_FORSØKT_BEHANDLET_FPSAK",
    IKKE_SENDT_FPSAK = "IKKE_SENDT_FPSAK",
    FP_FORDEL_MESSED_UP = "FP_FORDEL_MESSED_UP",
    GOSYS = "GOSYS"
}
