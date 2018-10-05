import { Attachment } from 'common/storage/attachment/types/Attachment';

export default interface Ettersending {
    saksnummer: string,
    vedlegg: Attachment[]
}