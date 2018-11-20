import { guid } from 'nav-frontend-js-utils';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (file: File, skjemanummer: Skjemanummer): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    uploaded: false,
    pending: false,
    skjemanummer
});

export const isAttachmentWithError = ({ pending, uploaded }: Attachment) => pending === false && uploaded === false;
