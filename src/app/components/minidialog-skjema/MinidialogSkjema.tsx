import React, { useState } from 'react';
import { withAttachments, AttachmentFormProps } from 'app/components/attachmentForm/AttachmentForm';
import { Textarea, RadioPanelGruppe } from 'nav-frontend-skjema';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import { getEttersendingType as getSakstype } from '../../pages/ettersendelse/util';
import SakBase from 'app/api/types/sak/Sak';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { formaterDatoForHendelse } from 'app/components/historikk/util';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'common/components/veileder/VeilederNormalSvg';

import './minidialogSkjema.less';

interface Props {
    sak: SakBase;
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
}

export enum JaNeiSpørsmål {
    JA = 'JA',
    NEI = 'NEI'
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
    const [svar, update] = useState('');
    const cls = BEMHelper('minidialog-skjema');
    const brukerØnskerIkkeÅUttaleSeg = svar === JaNeiSpørsmål.NEI;
    return (
        <form
            className={cls.block}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    vedlegg: brukerØnskerIkkeÅUttaleSeg ? [] : attachments,
                    saksnummer: minidialog.saksnr,
                    type: getSakstype(sak),
                    dialogId: minidialog.dialogId,
                    brukerTekst: {
                        dokumentType: Skjemanummer.TILBAKEBETALING,
                        overskrift: 'Svar på tilbakebetalingen',
                        tekst: brukerØnskerIkkeÅUttaleSeg ? 'Bruker ønsker ikke å uttale seg' : fritekst
                    }
                });
            }}>
            <Snakkeboble topp={formaterDatoForHendelse(minidialog.opprettet)} pilHoyre={false} ikonClass={'nav'}>
                <Normaltekst tag="p">
                    <FormattedMessage id="miniDialog.tilbakekreving" values={{ sakstype: getSakstype(sak) }} />
                </Normaltekst>
            </Snakkeboble>
            <Undertittel className="blokk-xs">Svar på spørsmål</Undertittel>
            <RadioPanelGruppe
                name="name"
                className="blokk-xs"
                radios={[{ label: 'Ja', value: JaNeiSpørsmål.JA }, { label: 'Nei', value: JaNeiSpørsmål.NEI }]}
                legend="Ønsker du å uttale deg i saken før vi behandler den?"
                checked={svar}
                onChange={(e: any, value: string) => update(value)}
            />
            {svar === JaNeiSpørsmål.NEI && (
                <div className="blokk-xs">
                    <Veilederpanel svg={<VeilederNormal />}>
                        Saken vil bli behandlet med de opplysningene vi har tilgjengelig.
                    </Veilederpanel>
                </div>
            )}
            {svar === JaNeiSpørsmål.JA && (
                <>
                    <div className={cls.element('fritekstfelt')}>
                        <Textarea
                            label="Svar på tilbakebetalingen:"
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
                            intlKey={`ettersendelse.${Skjemanummer.TILBAKEBETALING}`}
                            onDelete={deleteAttachment}
                            attachments={attachments}
                        />
                    )}
                </>
            )}
            {svar !== '' && (
                <div className={cls.element('btn')}>
                    <Hovedknapp disabled={false} spinner={false}>
                        <FormattedMessage id="miniDialog.sendButton" />
                    </Hovedknapp>
                </div>
            )}
        </form>
    );
};

export default withAttachments<Props>(MinidialogSkjema);
