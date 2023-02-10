import { Attachment } from 'app/types/Attachment';

export const isAttachmentWithError = ({ pending, url, error, filesize }: Attachment) =>
    error || (!pending && url === undefined) || filesize === 0;
