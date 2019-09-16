import { Attachment } from 'common/storage/attachment/types/Attachment';

export default interface EttersendingDto {
    type: string;
    saksnummer: string,
    vedlegg: Attachment[]
}