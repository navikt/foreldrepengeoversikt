import React, { useState } from 'react';
import { withAttachments, AttachmentFormProps } from 'app/components/attachmentForm/AttachmentForm';
import { Textarea } from 'nav-frontend-skjema';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { MinidialogInnslag } from 'app/api/types/MinidialogInnslag';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';

interface Props {
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
}

const MinidialogSkjema: React.FunctionComponent<Props & AttachmentFormProps> = ({
    minidialog,
    attachments,
    addAttachment,
    deleteAttachment,
    editAttachment,
    onSubmit
}) => {
    const [fritekst, updateFritekst] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    vedlegg: attachments,
                    saksnummer: minidialog.saksnr,
                    type: 'foreldrepenger',
                    referanseId: minidialog.referanseId,
                    brukerTekst: {
                        dokumentType: Skjemanummer.TILBAKEBETALING,
                        overskrift: 'overskrift',
                        tekst: fritekst
                    }
                });
            }}>
            <Textarea label="Textarea-label" value={fritekst} onChange={(e: any) => updateFritekst(e.target.value)} />
            <AttachmentsUploader
                attachments={attachments}
                skjemanummer={Skjemanummer.TILBAKEBETALING}
                onFilesUploadStart={addAttachment}
                onFileUploadFinish={editAttachment}
                onFileDeleteStart={deleteAttachment}
            />
            {attachments.length > 0 && (
                <AttachmentList
                    intlKey={`ettersendelse.attachmentList.${Skjemanummer.TILBAKEBETALING}`}
                    onDelete={deleteAttachment}
                    attachments={attachments}
                />
            )}
            <Hovedknapp disabled={false} spinner={false}>
                <FormattedMessage id="miniDialog.sendButton" />
            </Hovedknapp>
        </form>
    );
};

export default withAttachments<Props>(MinidialogSkjema);
