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

export enum Skjemanummer {
    ANNET = 'I000060',
}
