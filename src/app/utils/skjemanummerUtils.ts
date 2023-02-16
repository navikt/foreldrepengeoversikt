import { Sak } from 'app/types/Sak';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Ytelse } from 'app/types/Ytelse';

export const getRelevanteSkjemanummer = (sak: Sak): Skjemanummer[] => {
    const alleSkjemanummere = Object.values(Skjemanummer);

    if (sak.ytelse === Ytelse.FORELDREPENGER) {
        return sak.kanSøkeOmEndring
            ? alleSkjemanummere.filter(isSkjemanummerForEndringssøknadForeldrepenger)
            : alleSkjemanummere.filter(skjemanummerForFørstegangssøknadForeldrepenger);
    }

    if (sak.ytelse === Ytelse.ENGANGSSTØNAD) {
        return alleSkjemanummere.filter(isSkjemanummerForEngangsstønad);
    }
    return alleSkjemanummere.filter(isSkjemanummerForSvangerskapspengesoknad);
};

export const skjemanummerForFørstegangssøknadForeldrepenger = (): boolean => {
    return true;
};

export const isSkjemanummerForEndringssøknadForeldrepenger = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:
        case Skjemanummer.BEKREFTELSE_FRA_STUDIESTED:
        case Skjemanummer.DOK_AV_ALENEOMSORG:
        case Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:
        case Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:
        case Skjemanummer.DOK_INNLEGGELSE:
        case Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM:
        case Skjemanummer.DOK_OVERFØRING_FOR_SYK:
        case Skjemanummer.OMSORGSOVERTAKELSESDATO:
        case Skjemanummer.HV_ØVELSE:
        case Skjemanummer.NAV_TILTAK:
            return true;
        default:
            return false;
    }
};

export const isSkjemanummerForSvangerskapspengesoknad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE:
        case Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:
        case Skjemanummer.TERMINBEKREFTELSE:
            return true;
        default:
            return false;
    }
};

export const isSkjemanummerForEngangsstønad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.TERMINBEKREFTELSE:
            return true;
        default:
            return false;
    }
};
