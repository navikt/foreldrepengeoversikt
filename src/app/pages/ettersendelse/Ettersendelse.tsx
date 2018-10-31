import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import Sak from '../../types/Sak';
import BEMHelper from '../../../common/util/bem';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import ResponsiveWrapper from '../ResponsiveWrapper';
import { AxiosError } from '../../../../node_modules/axios';
import Api from '../../api/api';
import { Kvittering as EttersendelseKvittering } from 'app/api/types/Kvittering';
import Kvittering from '../../components/kvittering-page/Kvittering';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import Ettersending from '../../api/types/Ettersending';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

import './ettersendelse.less';
import BackButton from 'common/components/back-button/BackButton';

interface Props {
    history: History;
}

interface State {
    sak: Sak;
    attachments: Attachment[];
    sendingEttersendelse: boolean;
    kvittering: EttersendelseKvittering;
}

class Ettersendelse extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...this.props.history.location.state,
            sendingEttersendelse: false,
            attachments: []
        };

        if (!this.state.sak) {
            this.props.history.push('/');
        }

        this.addAttachment = this.addAttachment.bind(this);
        this.editAttachment = this.editAttachment.bind(this);
        this.deleteAttachment = this.deleteAttachment.bind(this);
        this.handleSendEttersendelseOnClick = this.handleSendEttersendelseOnClick.bind(this);
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

    deleteAttachment(attachment: Attachment): void {
        const newAttachmentList = [...this.state.attachments];
        newAttachmentList.splice(newAttachmentList.indexOf(attachment), 1);
        this.setState({ attachments: newAttachmentList });
    }

    handleBackClick(): void {
        this.props.history.push('/');
    }

    handleSendEttersendelseOnClick(): void {
        if (this.state.attachments.length > 0) {
            this.setState({ sendingEttersendelse: true }, this.sendEttersendelse);
        }
    }

    sendEttersendelse() {
        const ettersending: Ettersending = {
            saksnummer: this.state.sak.saksnummer,
            vedlegg: this.state.attachments.filter((a: Attachment) => !isAttachmentWithError(a))
        };

        Api.sendEttersending(ettersending)
            .then((response) => {
                this.setState({ kvittering: response.data, sendingEttersendelse: false });
            })
            .catch((error: AxiosError) => {
                this.setState({ sendingEttersendelse: false }, () => {
                    error.response
                        ? this.props.history.push('/feil', { errorStatusCode: error.response.status })
                        : this.props.history.push('/feil', { timeout: true });
                });
            });
    }

    isReadyToSendAttachments(): boolean {
        const attachmentsWithoutUploadError: Attachment[] = this.state.attachments.filter(
            (a: Attachment) => !isAttachmentWithError(a)
        );
        return (
            attachmentsWithoutUploadError.length > 0 &&
            attachmentsWithoutUploadError.every((a: Attachment) => a.uploaded)
        );
    }

    render() {
        if (!this.state.sak) {
            return null;
        }

        const cls = BEMHelper('ettersendelse');
        return (
            <div className={cls.className}>
                <Søknadstittel>Ettersending av vedlegg</Søknadstittel>
                <ResponsiveWrapper>
                    <div className={cls.modifier(`content`)}>
                        <BackButton hidden={false} onClick={() => this.handleBackClick()} />
                        {this.state.kvittering ? (
                            <Kvittering attachments={this.state.attachments} kvittering={this.state.kvittering} />
                        ) : (
                            <>
                                <Innholdstittel className={cls.element('title')}>
                                    <FormattedMessage
                                        id={'ettersendelse.title'}
                                        values={{ saksnummer: this.state.sak.saksnummer }}
                                    />
                                </Innholdstittel>
                                <div className={cls.element('uploader')}>
                                    <AttachmentsUploader
                                        attachments={this.state.attachments.slice()}
                                        attachmentType={AttachmentType.ETTERSENDELSE}
                                        skjemanummer={Skjemanummer.ANNET}
                                        onFilesUploadStart={this.addAttachment}
                                        onFileUploadFinish={this.editAttachment}
                                        onFileDeleteStart={this.editAttachment}
                                        onFileDeleteFinish={this.deleteAttachment}
                                    />
                                </div>
                                {this.isReadyToSendAttachments() && (
                                    <div className={cls.element('send-button')}>
                                        <Hovedknapp
                                            onClick={this.handleSendEttersendelseOnClick}
                                            disabled={this.state.sendingEttersendelse}
                                            spinner={this.state.sendingEttersendelse}>
                                            <FormattedMessage id={'ettersendelse.sendButton'} />
                                        </Hovedknapp>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </ResponsiveWrapper>
            </div>
        );
    }
}
export default Ettersendelse;
