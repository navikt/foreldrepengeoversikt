import * as React from 'react';
import { Attachment } from '../old/common/storage/attachment/types/Attachment';
import AttachmentOverview from '../old/common/storage/attachment/components/AttachmentOverview';
import AttachmentApi from '../old/common/storage/api/attachmentApi';
import { Skjemanummer } from '../types/Skjemanummer';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    skjemanummer: Skjemanummer;
    onFilesUploadStart: (attachments: Attachment[]) => void;
    onFileUploadFinish: (attachment: Attachment) => void;
    onFileDeleteStart: (attachments: Attachment[]) => void;
}

export default class AttachmentsUploader extends React.Component<AttachmentsUploaderProps> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFilesSelect = this.onFilesSelect.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { onFilesUploadStart, onFileUploadFinish } = this.props;
        files.forEach((file: Attachment) => {
            file.pending = true;
        });
        onFilesUploadStart(files);
        files.forEach((file: Attachment) =>
            AttachmentApi.saveAttachment(file)
                .then((response: any) => {
                    file.pending = false;
                    file.url = response.headers.location;
                    file.uuid = response.data;
                    onFileUploadFinish(file);
                })
                .catch((error) => {
                    file.pending = false;
                    file.error = error;
                    onFileUploadFinish(file);
                })
        );
    }

    onFileDelete(files: Attachment[]) {
        this.props.onFileDeleteStart(files);
    }

    render() {
        const { attachments, skjemanummer } = this.props;
        return (
            <AttachmentOverview
                attachments={attachments}
                skjemanummer={skjemanummer}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}
