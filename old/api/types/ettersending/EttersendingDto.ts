import { Attachment } from '../old/common/storage/attachment/types/Attachment';

export default interface EttersendingDto {
    type: EttersendingType;
    saksnummer: string;
    vedlegg: Attachment[];
    dialogId?: string;
    brukerTekst?: {
        dokumentType: string;
        tekst: string;
        overskrift: string;
    };
}

export enum EttersendingType {
    FORELDREPENGER = 'foreldrepenger',
    ENGANGSSTØNAD = 'engangsstønad',
    SVANGERSKAPSPENGER = 'svangerskapspenger',
}
