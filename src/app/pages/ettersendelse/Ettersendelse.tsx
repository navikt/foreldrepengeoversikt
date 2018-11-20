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
import { Kvittering as EttersendelseKvittering } from 'app/api/types/Kvittering';
import Kvittering from '../../components/kvittering-page/Kvittering';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import Ettersending from '../../api/types/Ettersending';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import BackButton from 'common/components/back-button/BackButton';
import LetterIcon from '../../components/ikoner/LetterIcon';
import { getAttachmentTypeSelectOptions } from './util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import Block from 'common/components/block/Block';

import './ettersendelse.less';

interface EttersendelseProps {
    history: History;
}

interface State {
    sak: Sak;
    attachments: Attachment[];
    attachmentSkjemanummer?: Skjemanummer;
    sendingEttersendelse: boolean;
    kvittering: EttersendelseKvittering;
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

    deleteAttachment(attachment: Attachment): void {
        const newAttachmentList = [...this.state.attachments];
        newAttachmentList.splice(newAttachmentList.indexOf(attachment), 1);
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
        if (this.state.attachments.length > 0) {
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
                this.setState({ kvittering: response.data, sendingEttersendelse: false });
            })
            .catch((error: AxiosError) => {
                this.setState({ sendingEttersendelse: false }, () => {
                    error.response
                        ? this.props.history.push('/feil', {
                              errorStatusCode: error.response.status,
                              errorMessage: error.response.data.messages
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
            attachmentsWithoutUploadError.every((a: Attachment) => a.uploaded)
        );
    }

    render() {
        if (!this.state.sak) {
            return null;
        }

        const { intl } = this.props;
        const { sak, attachments, attachmentSkjemanummer, sendingEttersendelse, kvittering } = this.state;
        const cls = BEMHelper('ettersendelse');

        return (
            <div className={cls.className}>
                <Søknadstittel>Ettersending av vedlegg</Søknadstittel>
                <ResponsiveWrapper>
                    <div className={cls.modifier(`content`)}>
                        <BackButton hidden={false} onClick={() => this.handleBackClick()} />
                        {kvittering ? (
                            <Kvittering
                                attachments={attachments.filter((a: Attachment) => !isAttachmentWithError(a))}
                                kvittering={kvittering}
                            />
                        ) : (
                            <>
                                <LetterIcon className={cls.element('letter-icon')} />

                                <Innholdstittel className={cls.element('title')}>
                                    <FormattedMessage
                                        id={'ettersendelse.title'}
                                        values={{ saksnummer: sak.saksnummer }}
                                    />
                                </Innholdstittel>

                                <Select
                                    className={cls.element('attachment-type-select')}
                                    label=""
                                    onChange={this.handleAttachmentTypeSelectChange}>
                                    {getAttachmentTypeSelectOptions(intl)}
                                </Select>

                                {this.isReadyToUploadAttachments() && (
                                    <div className={cls.element('uploader')}>
                                        <AttachmentsUploader
                                            attachments={attachments}
                                            attachmentType={AttachmentType.ETTERSENDELSE}
                                            skjemanummer={
                                                attachmentSkjemanummer ? attachmentSkjemanummer : Skjemanummer.ANNET
                                            }
                                            onFilesUploadStart={this.addAttachment}
                                            onFileUploadFinish={this.editAttachment}
                                            onFileDeleteStart={this.deleteAttachment}
                                            renderAttachmentList={false}
                                        />
                                    </div>
                                )}

                                {attachments
                                    .map((a: Attachment) => a.skjemanummer)
                                    .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index)
                                    .map((s: Skjemanummer) => {
                                        return (
                                            <Block margin={'m'} key={s}>
                                                <AttachmentList
                                                    attachments={attachments.filter(
                                                        (a: Attachment) => a.skjemanummer === s
                                                    )}
                                                    onDelete={this.deleteAttachment}
                                                    intlKey={`ettersendelse.attachmentList.${s}`}
                                                />
                                            </Block>
                                        );
                                    })}

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
                            </>
                        )}
                    </div>
                </ResponsiveWrapper>
            </div>
        );
    }
}
export default injectIntl(Ettersendelse);
