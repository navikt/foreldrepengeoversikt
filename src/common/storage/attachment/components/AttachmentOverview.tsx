import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';

import VedleggInput from './AttachmentInput';
import { isAttachmentWithError, mapFileToAttachment } from './util';

import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Block from 'common/components/block/Block';
import AlertstripeWithCloseButton from 'common/components/alertstripe-content/AlertstripeWithCloseButton';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (files: Attachment[]) => void;
}

type Props = AttachmentOverviewProps;
class AttachmentOverview extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.deleteFailedAttachments = this.deleteFailedAttachments.bind(this);
    }

    createErrorMessagesForFailedAttachments(attachments: Attachment[]): React.ReactNode[] {
        const errorMessages: React.ReactNode[] = [];
        const attachmentsWithError = attachments.filter(isAttachmentWithError);
        const multipleErrors = attachmentsWithError.length > 1;
        attachmentsWithError.forEach((a: Attachment) => {
            const error = a.error;
            if (error && error.response !== undefined && error.response.status === 413) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.forStort.flereFeil' : 'vedlegg.forStort'}
                        values={{ filename: a.filename }}
                    />
                );
            } else {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.feilmelding.flereFeil' : 'vedlegg.feilmelding'}
                        values={{ filename: a.filename }}
                    />
                );
            }
        });
        return errorMessages;
    }

    deleteFailedAttachments(): void {
        this.props.onFileDelete(this.props.attachments.filter(isAttachmentWithError));
    }

    render() {
        const { inputId = guid(), skjemanummer, onFilesSelect } = this.props;
        const showErrorMessage: boolean = this.props.attachments.filter(isAttachmentWithError).length > 0;

        return (
            <React.Fragment>
                <Block margin={'xs'}>
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(files.map((f) => mapFileToAttachment(f, skjemanummer)));
                        }}
                        onClick={this.deleteFailedAttachments}
                    />
                </Block>
                <CSSTransition classNames="transitionFade" timeout={150} in={showErrorMessage} unmountOnExit={true}>
                    <>
                        {showErrorMessage && (
                            <Block margin="xs" visible={showErrorMessage} animated={false}>
                                <AlertstripeWithCloseButton
                                    lukknappProps={{
                                        hvit: true,
                                        type: 'button'
                                    }}
                                    errorMessages={this.createErrorMessagesForFailedAttachments(
                                        this.props.attachments.filter(isAttachmentWithError)
                                    )}
                                    onClose={this.deleteFailedAttachments}
                                />
                            </Block>
                        )}
                    </>
                </CSSTransition>
            </React.Fragment>
        );
    }
}
export default AttachmentOverview;
