import React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

export interface AttachmentFormProps extends AttachmentFormState {
    addAttachment: (attachments: Attachment[]) => void;
    editAttachment: (attachment: Attachment) => void;
    deleteAttachment: (attachments: Attachment[]) => void;
    isReadyToSendAttachments: boolean;
}

interface AttachmentFormState {
    attachments: Attachment[]
}

export function withAttachments<T>(WrappedComponent: React.ComponentType<T>) {
    class AttachmentForm extends React.Component<T, AttachmentFormState> {
        constructor(props: any) {
            super(props);
            this.state = {
                attachments: []
            };
            this.addAttachment = this.addAttachment.bind(this);
            this.editAttachment = this.editAttachment.bind(this);
            this.deleteAttachment = this.deleteAttachment.bind(this);
        }

        addAttachment(attachments: Attachment[]): void {
            this.setState({ attachments: this.state.attachments.concat(attachments) });
        }

        editAttachment(attachment: Attachment): void {
            const attachmentsCopy = this.state.attachments.slice();
            const index = this.state.attachments.indexOf(attachment);
            attachmentsCopy[index] = attachment;
            this.setState({ attachments: attachmentsCopy });
        }

        deleteAttachment(attachments: Attachment[]): void {
            const newAttachmentList = [...this.state.attachments];
            attachments.forEach((a) => newAttachmentList.splice(newAttachmentList.indexOf(a), 1));
            this.setState({ attachments: newAttachmentList });
        }

        isReadyToSendAttachments(): boolean {
            const attachmentsWithoutUploadError: Attachment[] = this.state.attachments.filter(
                (a: Attachment) => !isAttachmentWithError(a)
            );
            return (
                attachmentsWithoutUploadError.length > 0 &&
                attachmentsWithoutUploadError.every((a: Attachment) => a.url !== undefined)
            );
        }

        render() {
            const { ...otherProps } = this.props;
            return (
                <WrappedComponent
                    attachments={this.state.attachments}
                    addAttachment={this.addAttachment}
                    editAttachment={this.editAttachment}
                    deleteAttachment={this.deleteAttachment}
                    isReadyToSendAttachments={this.isReadyToSendAttachments()}
                    {...otherProps as T}
                />
            );
        }
    }

    return AttachmentForm;
}
