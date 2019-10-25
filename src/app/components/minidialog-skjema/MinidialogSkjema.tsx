import React, { useState } from 'react';
import { withAttachments, AttachmentFormProps } from 'app/components/attachmentForm/AttachmentForm';
import { Textarea } from 'nav-frontend-skjema';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import { getEttersendingType } from '../../pages/ettersendelse/util';
import SakBase from 'app/api/types/sak/Sak';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { formaterDatoForHendelse } from 'app/components/historikk/util';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import './minidialogSkjema.less';

interface Props {
    sak: SakBase;
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
}

const MinidialogSkjema: React.FunctionComponent<Props & AttachmentFormProps> = ({
    sak,
    minidialog,
    attachments,
    addAttachment,
    deleteAttachment,
    editAttachment,
    onSubmit
}) => {
    const [fritekst, updateFritekst] = useState('');
    const cls = BEMHelper('minidialog-skjema');
    return (
        <form
            className={cls.className}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    vedlegg: attachments,
                    saksnummer: minidialog.saksnr,
                    type: getEttersendingType(sak),
                    dialogId: minidialog.dialogId,
                    brukerTekst: {
                        dokumentType: Skjemanummer.TILBAKEBETALING,
                        overskrift: 'overskrift',
                        tekst: fritekst
                    }
                });
            }}>
            <Snakkeboble topp={formaterDatoForHendelse(minidialog.opprettet)} pilHoyre={false} ikonClass={'nav'}>
                <Normaltekst tag="p">{minidialog.tekst}</Normaltekst>
            </Snakkeboble>

            <Undertittel>Svar på spørsmål</Undertittel>

            <div className={cls.element('fritekstfelt')}>
                <Textarea
                    label="[Overskrift på spørsmålet]"
                    value={fritekst}
                    onChange={(e: any) => updateFritekst(e.target.value)}
                />
            </div>
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
