import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Skjemanummer } from '../types/Skjemanummer';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (file: File, skjemanummer: Skjemanummer): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    pending: false,
    skjemanummer
});

export const isAttachmentWithError = ({ pending, url, error, filesize }: Attachment) => error || (!pending && url === undefined) || filesize === 0;
