import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { History } from 'history';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';

import Sak from '../../types/Sak';
import BEMHelper from '../../../common/util/bem';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import ResponsiveWrapper from '../ResponsiveWrapper';
import { AxiosError } from '../../../../node_modules/axios';
import Api from '../../api/api';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import Ettersending from '../../api/types/Ettersending';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import BackButton from 'common/components/back-button/BackButton';
import LetterIcon from '../../components/ikoner/LetterIcon';
import { getAttachmentTypeSelectOptions, getListOfUniqueSkjemanummer } from './util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';

import './ettersendelse.less';

interface EttersendelseProps {
    history: History;
}

interface State {
    sak: Sak;
    attachments: Attachment[];
    attachmentSkjemanummer?: Skjemanummer;
    sendingEttersendelse: boolean;
}

type Props = EttersendelseProps & InjectedIntlProps;

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
        this.handleAttachmentTypeSelectChange = this.handleAttachmentTypeSelectChange.bind(this);
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

    deleteAttachment(attachments: Attachment[]): void {
        const newAttachmentList = [...this.state.attachments];
        attachments.forEach((a) => newAttachmentList.splice(newAttachmentList.indexOf(a), 1));
        this.setState({ attachments: newAttachmentList });
    }

    handleBackClick(): void {
        this.props.history.push('/');
    }

    handleAttachmentTypeSelectChange(e: any): void {
        const selectedValue = e.target.value;
        this.setState({ attachmentSkjemanummer: selectedValue !== '' ? selectedValue : undefined });
    }

    handleSendEttersendelseOnClick(): void {
        if (this.isReadyToUploadAttachments()) {
            this.setState({ sendingEttersendelse: true }, this.sendEttersendelse);
        }
    }

    sendEttersendelse(): void {
        const ettersending: Ettersending = {
            saksnummer: this.state.sak.saksnummer,
            vedlegg: this.state.attachments.filter((a: Attachment) => !isAttachmentWithError(a))
        };

        Api.sendEttersending(ettersending)
            .then((response) => {
                this.setState({ sendingEttersendelse: false }, () => {
                    this.props.history.push('/kvittering', {
                        kvittering: response.data,
                        attachments: ettersending.vedlegg
                    });
                });
            })
            .catch((error: AxiosError) => {
                this.setState({ sendingEttersendelse: false }, () => {
                    error.response
                        ? this.props.history.push('/feil', {
                              errorStatusCode: error.response.status,
                              errorMessage: error.response.data.message
                          })
                        : this.props.history.push('/feil', { timeout: true });
                });
            });
    }

    isReadyToUploadAttachments(): boolean {
        const { attachmentSkjemanummer } = this.state;
        return attachmentSkjemanummer !== undefined;
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
        if (!this.state.sak) {
            return null;
        }

        const { intl } = this.props;
        const { sak, attachments, attachmentSkjemanummer, sendingEttersendelse } = this.state;
        const uploadedAttachments = attachments.filter((a: Attachment) => !isAttachmentWithError(a));
        const cls = BEMHelper('ettersendelse');

        return (
            <div className={cls.className}>
                <Søknadstittel>Ettersending av vedlegg</Søknadstittel>
                <ResponsiveWrapper>
                    <BackButton hidden={false} onClick={() => this.handleBackClick()} />
                    <LetterIcon className={cls.element('letter-icon')} />
                    <Innholdstittel className={cls.element('title')}>
                        <FormattedMessage id={'ettersendelse.title'} values={{ saksnummer: sak.saksnummer }} />
                    </Innholdstittel>
                    <Select
                        className={cls.element('attachment-type-select')}
                        label=""
                        onChange={this.handleAttachmentTypeSelectChange}
                        defaultValue={'default'}>
                        {getAttachmentTypeSelectOptions(intl, sak)}
                    </Select>
                    {this.isReadyToUploadAttachments() && (
                        <div className={cls.element('uploader')}>
                            <AttachmentsUploader
                                attachments={attachments}
                                skjemanummer={attachmentSkjemanummer ? attachmentSkjemanummer : Skjemanummer.ANNET}
                                onFilesUploadStart={this.addAttachment}
                                onFileUploadFinish={this.editAttachment}
                                onFileDeleteStart={this.deleteAttachment}
                            />
                        </div>
                    )}
                    {getListOfUniqueSkjemanummer(uploadedAttachments).map((skjemanummer: Skjemanummer) => (
                        <AttachmentList
                            key={skjemanummer}
                            intlKey={`ettersendelse.attachmentList.${skjemanummer}`}
                            onDelete={this.deleteAttachment}
                            attachments={uploadedAttachments.filter((a: Attachment) => a.skjemanummer === skjemanummer)}
                        />
                    ))}
                    {this.isReadyToSendAttachments() && (
                        <div className={cls.element('send-button')}>
                            <Hovedknapp
                                onClick={this.handleSendEttersendelseOnClick}
                                disabled={sendingEttersendelse}
                                spinner={sendingEttersendelse}>
                                <FormattedMessage id={'ettersendelse.sendButton'} />
                            </Hovedknapp>
                        </div>
                    )}
                </ResponsiveWrapper>
            </div>
        );
    }
}
export default injectIntl(Ettersendelse);
