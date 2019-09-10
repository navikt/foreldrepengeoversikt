import { Skjemanummer } from "./types/Skjemanummer";

export const skjemanummerForSvangerskapspengesoknad = (skjemanummer: Skjemanummer) => {
    switch (skjemanummer) {
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.TILRETTELEGGING_FOR_ARBEIDSTAKERE:
        case Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG:
            return true;
        default:
            return false;
    }
};

export const skjemanummerForForeldrepengesoknad = (skjemanummer: Skjemanummer) => {
    switch (skjemanummer) {
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.TILRETTELEGGING_FOR_ARBEIDSTAKERE:
        case Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG:
            return true;
        default:
            return false;
    }
};

export const skjemanummerForEngangsstønad = (skjemanummer: Skjemanummer) =>
    skjemanummer === Skjemanummer.ANNET ||
    skjemanummer === Skjemanummer.TERMINBEKREFTELSE ||
    skjemanummer === Skjemanummer.FØDSELSATTEST;

export const skjemanummerForEndringssøknad = (skjemanummer: Skjemanummer) =>
    skjemanummer === Skjemanummer.BEKREFTELSE_FRA_ARBEIDSGIVER ||
    skjemanummer === Skjemanummer.OMSORGSOVERTAKELSESDATO ||
    skjemanummer === Skjemanummer.ANNET ||
    skjemanummer === Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM ||
    skjemanummer === Skjemanummer.DOK_INNLEGGELSE ||
    skjemanummer === Skjemanummer.DOK_OVERFØRING_FOR_SYK ||
    skjemanummer === Skjemanummer.BEKREFTELSE_FRA_STUDIESTED ||
    skjemanummer === Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM ||
    skjemanummer === Skjemanummer.BEKREFTELSE_PÅ_AVTALT_FERIE ||
    skjemanummer === Skjemanummer.DOK_AV_ALENEOMSORG ||
    skjemanummer === Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID ||
    skjemanummer === Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET;
