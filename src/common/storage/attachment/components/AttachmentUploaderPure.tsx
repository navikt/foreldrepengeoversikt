import * as React from 'react';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    skjemanummer: Skjemanummer;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

export default class AttachmentsUploaderPure extends React.Component<AttachmentsUploaderProps> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { onFilesSelect } = this.props;
        onFilesSelect(files);
    }

    onFileDelete(file: Attachment) {
        const { onFileDelete } = this.props;
        onFileDelete(file);
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
