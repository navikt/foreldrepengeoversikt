import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Block from 'common/components/block/Block';
import AlertstripeWithCloseButton from 'common/components/alertstripe-content/AlertstripeWithCloseButton';

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

interface State {
    errorMessages: string[];
    failedAttachments: Attachment[];
}

type Props = AttachmentOverviewProps;
class AttachmentOverview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { errorMessages: [], failedAttachments: props.attachments.filter(isAttachmentWithError) };

        this.hideErrorMessage = this.hideErrorMessage.bind(this);
    }

    componentDidUpdate() {
        const attachmentsWithPossibleNewErrors = this.props.attachments.filter(
            (a: Attachment) => !this.state.failedAttachments.includes(a)
        );

        if (attachmentsWithPossibleNewErrors.some(isAttachmentWithError)) {
            this.showErrorMessages(attachmentsWithPossibleNewErrors);
            this.updateListOfKnownFailedAttachments(attachmentsWithPossibleNewErrors);
        }
    }

    updateListOfKnownFailedAttachments(attachmentsWithPossibleNewErrors: Attachment[]) {
        this.setState({
            failedAttachments: this.state.failedAttachments.concat(
                attachmentsWithPossibleNewErrors.filter(isAttachmentWithError)
            )
        });
    }

    createErrorMessageForFailedAttachment(attachment: Attachment): string {
        const error = attachment.error;
        if (error && error.response !== undefined && error.response.status === 413) {
            return 'vedlegg.forStort';
        }
        return 'vedlegg.feilmelding';
    }

    showErrorMessages(attachmentsWithPossibleNewErrors: Attachment[]) {
        this.setState({
            errorMessages: attachmentsWithPossibleNewErrors
                .filter(isAttachmentWithError)
                .map((a: Attachment) => this.createErrorMessageForFailedAttachment(a))
        });
    }

    hideErrorMessage() {
        this.setState(
            {
                errorMessages: []
            },
        );
    }

    createErrorMessage() {
        return this.state.errorMessages.map((message: string) => <FormattedMessage key={guid()} id={message} />);
    }

    render() {
        const { inputId = guid(), skjemanummer, onFilesSelect } = this.props;
        const { errorMessages } = this.state;
        const showErrorMessage = errorMessages.length > 0;

        return (
            <React.Fragment>
                <Block margin={'xs'}>
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(files.map((f) => mapFileToAttachment(f, skjemanummer)));
                        }}
                        onClick={this.hideErrorMessage}
                    />
                </Block>
                <CSSTransition classNames="transitionFade" timeout={150} in={showErrorMessage} unmountOnExit={true}>
                    <>
                        {showErrorMessage && (
                            <>
                                <Block margin="xs" visible={showErrorMessage} animated={false}>
                                    <AlertstripeWithCloseButton
                                        alertStripeProps={{
                                            type: 'advarsel',
                                            solid: true,
                                            children: <>{this.createErrorMessage()}</>
                                        }}
                                        lukknappProps={{
                                            hvit: true,
                                            type: 'button'
                                        }}
                                        onClose={this.hideErrorMessage}
                                    />
                                </Block>
                            </>
                        )}
                    </>
                </CSSTransition>
            </React.Fragment>
        );
    }
}
export default AttachmentOverview;
