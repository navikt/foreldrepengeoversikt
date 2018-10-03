import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
}

// TODO remove redundant skjemanummer when we know more about which to use
export enum Skjemanummer {
    DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL = 'I000041',
    BEKREFTELSE_FRA_ARBEIDSGIVER = 'I000065',
    INNTEKTSOPPLYSNINGER = 'I000026',
    ARBEIDSFORHOLD = 'I000043',
    ETTERLØNN_ELLER_SLUTTVEDERLAG = 'I000044',
    TERMINDATO_ELLER_OMSORGSOVERTAKELSESDATO = 'I000041',
    OMSORGSOVERTAKELSESDATO = 'I000042',
    ANNET = 'I000060',
    FØDSELSATTEST = 'I000063',
    TERMINBEKREFTELSE = 'I000062',
    DOK_ETTERLØNN = 'I000044',
    DOK_MILITÆR_SILVIL_TJENESTE = 'I000039',
    INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG = 'I000007',
    DOK_MORS_UTDANNING_ARBEID_SYKDOM = 'I000038',
    DOK_INNLEGGELSE = 'I000037',
    DOK_OVERFØRING_FOR_SYK = 'I000045'
}
