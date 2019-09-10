export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    error?: any;
    skjemanummer: Skjemanummer;
    beskrivelse?: string;
}

export enum Skjemanummer {
    ANNET = 'I000060',
    BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM = 'I000051',
    BEKREFTELSE_FRA_ARBEIDSGIVER = 'I000065',
    BEKREFTELSE_FRA_STUDIESTED = 'I000061',
    BEKREFTELSE_PÅ_AVTALT_FERIE = 'I000036',
    DOK_AV_ALENEOMSORG = 'I000110',
    DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID = 'I000111',
    DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET = 'I000112',
    DOK_INNLEGGELSE = 'I000037',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    DOK_MORS_UTDANNING_ARBEID_SYKDOM = 'I000038',
    DOK_OVERFØRING_FOR_SYK = 'I000023',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    FØDSELSATTEST = 'I000063', // will be required once we start fetching data from TPS about registered children.
    INNTEKTSOPPLYSNINGER = 'I000026',
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING = 'I000109',
    TERMINBEKREFTELSE = 'I000062',
    TILRETTELEGGING_FOR_ARBEIDSTAKERE = 'I000049',
    TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG = 'I000001'
}

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
