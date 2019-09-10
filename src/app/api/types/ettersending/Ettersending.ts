import { Attachment } from 'common/storage/attachment/types/Attachment';

export default interface Ettersending {
    type: string;
    saksnummer: string,
    vedlegg: Attachment[]
}