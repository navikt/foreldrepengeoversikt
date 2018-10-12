import * as React from 'react';
import Sak from '../../types/Sak';
import { History } from 'history';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import BEMHelper from '../../../common/util/bem';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import ResponsiveWrapper from '../ResponsiveWrapper';

import { AxiosError } from '../../../../node_modules/axios';
import Api from '../../api/api';
import './ettersendelse.less';

interface Props {
    history: History;
}

interface State {
    sak: Sak;
    attachments: Attachment[];
    error?: AxiosError;
}

class Ettersendelse extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...this.props.history.location.state,
            attachments: []
        };

        if (!this.state.sak) {
            this.props.history.push('/');
        }

        this.addAttachment = this.addAttachment.bind(this);
        this.editAttachment = this.editAttachment.bind(this);
        this.deleteAttachemnt = this.deleteAttachemnt.bind(this);
        this.handleSendOnClick = this.handleSendOnClick.bind(this);
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

    deleteAttachemnt(attachment: Attachment): void {
        const newAttachmentList = [...this.state.attachments];
        newAttachmentList.splice(newAttachmentList.indexOf(attachment), 1);
        this.setState({ attachments: newAttachmentList });
    }

    handleSendOnClick() {
        Api.sendEttersending({
            saksnummer: this.state.sak.saksnummer,
            vedlegg: this.state.attachments
        })
            .then((response) => alert(response))
            .catch((error: AxiosError) => {
                if (error.response) {
                    this.setState({ error });
                }
            });
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
                    <div className={cls.modifier('content')}>
                        <Innholdstittel className={cls.element('title')}>
                            Last opp dokumentasjon til sak {this.state.sak.saksnummer}
                        </Innholdstittel>
                        <div className={cls.element('uploader')}>
                            <AttachmentsUploader
                                attachments={this.state.attachments.slice()}
                                attachmentType={AttachmentType.ETTERSENDELSE}
                                skjemanummer={Skjemanummer.ANNET}
                                onFilesUploadStart={this.addAttachment}
                                onFileUploadFinish={this.editAttachment}
                                onFileDeleteStart={this.editAttachment}
                                onFileDeleteFinish={this.deleteAttachemnt}
                            />
                        </div>
                        <div className={cls.element('sendButton')}>
                            <Hovedknapp onClick={this.handleSendOnClick}>Ettersend vedlegg</Hovedknapp>
                        </div>
                    </div>
                </ResponsiveWrapper>
            </div>
        );
    }
}
export default Ettersendelse;
