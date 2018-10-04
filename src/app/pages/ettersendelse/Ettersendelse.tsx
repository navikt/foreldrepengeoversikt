import * as React from 'react';
import Sak from '../../types/Sak';
import { History } from 'history';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import BEMHelper from '../../../common/util/bem';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import './ettersendelse.less';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';

interface Props {
    history: History;
}

interface State {
    sak: Sak;
    attachments: Attachment[];
}

enum Operation {
    'EDIT' = 'edit',
    'DELETE' = 'delete'
}

class Ettersendelse extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...this.props.history.location.state,
            attachments: []
        };

        this.addAttachment = this.addAttachment.bind(this);
        this.editAttachment = this.editAttachment.bind(this);
        this.deleteAttachemnt = this.deleteAttachemnt.bind(this);
    }

    addAttachment(attachments: Attachment[]) {
        this.setState({ attachments: this.state.attachments.concat(attachments) });
    }

    editAttachment(attachment: Attachment) {
        this.setState({ attachments: this.updateAttachmentList(this.state.attachments, attachment, Operation.EDIT) });
    }

    deleteAttachemnt(attachment: Attachment) {
        const newAttachmentList = [...this.state.attachments];
        newAttachmentList.splice(newAttachmentList.indexOf(attachment), 1);
        this.setState({ attachments: newAttachmentList });
    }

    updateAttachmentList(attachments: Attachment[], attachment: Attachment, operation: Operation): Attachment[] {
        if (operation === Operation.EDIT) {
            attachments[attachments.indexOf(attachment)] = attachment;
        } else if (operation === Operation.DELETE) {
            attachments.splice(attachments.indexOf(attachment), 1);
        }
        return attachments;
    }

    handleSendOnClick() {
        console.log('handleSendOnClick');
    }

    render() {
        const cls = BEMHelper('ettersendelse');
        return (
            <div className={cls.className}>
                <Søknadstittel>Ettersending av vedlegg</Søknadstittel>
                <div className={cls.element('content')}>
                    <Innholdstittel className={cls.element('title')}>
                        Last opp dokumentasjon til sak {this.state.sak.saksnummer}
                    </Innholdstittel>
                    <div className={cls.element('uploader')}>
                        <AttachmentsUploader
                            attachments={this.state.attachments}
                            attachmentType={AttachmentType.ALENEOMSORG}
                            skjemanummer={Skjemanummer.ANNET}
                            onFilesUploadStart={this.addAttachment}
                            onFileUploadFinish={this.editAttachment}
                            onFileDeleteStart={this.editAttachment}
                            onFileDeleteFinish={this.deleteAttachemnt}
                        />
                    </div>
                    <Hovedknapp className={cls.element('sendButton')} onClick={this.handleSendOnClick}>
                        Ettersend vedlegg
                    </Hovedknapp>
                </div>
            </div>
        );
    }
}
export default Ettersendelse;
