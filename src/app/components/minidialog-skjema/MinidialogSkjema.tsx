import React, { useState } from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Textarea, RadioPanelGruppe } from 'nav-frontend-skjema';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { withAttachments, AttachmentFormProps } from 'app/components/attachmentForm/AttachmentForm';
import SakBase from 'app/api/types/sak/Sak';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import { formaterDatoForHendelse } from 'app/components/historikk/util';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import BEMHelper from 'common/util/bem';
import { getEttersendingType as getSakstype } from '../../pages/ettersendelse/util';
import VeilederNormal from 'common/components/veileder/VeilederNormalSvg';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import getMessage from 'common/util/i18nUtils';

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

const MinidialogSkjema: React.FunctionComponent<Props & AttachmentFormProps & InjectedIntlProps> = ({
    sak,
    minidialog,
    attachments,
    addAttachment,
    deleteAttachment,
    editAttachment,
    onSubmit,
    intl
}) => {
    const [fritekst, updateFritekst] = useState('');
    const [svar, update] = useState<string | undefined>(undefined);
    const brukerØnskerÅUttaleSeg = svar === JaNeiSpørsmål.JA;

    const cls = BEMHelper('minidialog-skjema');
    return (
        <form className={cls.block}>
            <Snakkeboble topp={formaterDatoForHendelse(minidialog.opprettet)} pilHoyre={false} ikonClass={'nav'}>
                <Normaltekst tag="p">
                    <FormattedMessage id="miniDialog.tilbakekreving.tittel" values={{ sakstype: getSakstype(sak) }} />
                </Normaltekst>
            </Snakkeboble>
            <Undertittel className="blokk-xs">
                <FormattedMessage id="miniDialog.tilbakekreving.undertittel" />
            </Undertittel>
            <RadioPanelGruppe
                name="name"
                className="blokk-xs"
                radios={[
                    { label: getMessage(intl, 'ja'), value: JaNeiSpørsmål.JA },
                    { label: getMessage(intl, 'nei'), value: JaNeiSpørsmål.NEI }
                ]}
                legend={getMessage(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                checked={svar}
                onChange={(e: any, value: string) => update(value)}
            />
            {svar === JaNeiSpørsmål.NEI && (
                <div className="blokk-xs">
                    <Veilederpanel svg={<VeilederNormal />}>
                        <FormattedMessage id="minidialog.tilbakekreving.veilederpanel" />
                    </Veilederpanel>
                </div>
            )}
            {svar === JaNeiSpørsmål.JA && (
                <>
                    <div className={cls.element('fritekstfelt')}>
                        <Textarea
                            label={getMessage(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
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
            {svar !== undefined && (
                <div className={cls.element('btn')}>
                    <Hovedknapp
                        onClick={() =>
                            onSubmit({
                                vedlegg: brukerØnskerÅUttaleSeg
                                    ? attachments.filter((a: Attachment) => !isAttachmentWithError(a))
                                    : [],
                                saksnummer: minidialog.saksnr,
                                type: getSakstype(sak),
                                dialogId: minidialog.dialogId,
                                brukerTekst: {
                                    dokumentType: Skjemanummer.TILBAKEBETALING,
                                    overskrift: 'Svar på tilbakebetalingen',
                                    tekst: brukerØnskerÅUttaleSeg ? fritekst : 'Bruker ønsker ikke å uttale seg'
                                }
                            })
                        }
                        disabled={false}
                        spinner={false}>
                        <FormattedMessage id="miniDialog.tilbakekreving.sendButton" />
                    </Hovedknapp>
                </div>
            )}
        </form>
    );
};

export default withAttachments<Props>(injectIntl(MinidialogSkjema));
