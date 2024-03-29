import React, { useState, FormEvent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Textarea, RadioPanelGruppe } from 'nav-frontend-skjema';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { withAttachments, AttachmentFormProps } from '../old/components/attachmentForm/AttachmentForm';
import SakBase from 'app/api/types/sak/Sak';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import { formaterDatoForHendelse } from '../old/components/historikk/util';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import AttachmentsUploader from '../old/common/storage/attachment/components/AttachmentUploader';
import { Skjemanummer } from '../old/common/storage/attachment/types/Skjemanummer';
import AttachmentList from '../old/common/storage/attachment/components/AttachmentList';
import BEMHelper from '../old/common/util/bem';
import { getEttersendingType as getSakstype } from '../../pages/ettersendelse/util';
import VeilederNormal from '../old/common/components/veileder/VeilederNormalSvg';
import { isAttachmentWithError } from '../old/common/storage/attachment/components/util';
import { Attachment } from '../old/common/storage/attachment/types/Attachment';
import getMessage from '../old/common/util/i18nUtils';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';

import './minidialogSkjema.less';

interface Props {
    sak: SakBase;
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
    isSendingEttersendelse: boolean;
}

export enum JaNeiSpørsmål {
    JA = 'JA',
    NEI = 'NEI',
}

const MinidialogSkjema: React.FunctionComponent<Props & AttachmentFormProps> = ({
    sak,
    minidialog,
    attachments,
    addAttachment,
    deleteAttachment,
    editAttachment,
    onSubmit,
    isSendingEttersendelse,
}) => {
    const intl = useIntl();
    const [fritekst, updateFritekst] = useState('');
    const [svar, update] = useState<string | undefined>(undefined);
    const brukerØnskerÅUttaleSeg = svar === JaNeiSpørsmål.JA;
    const submitData: EttersendingDto = {
        vedlegg: brukerØnskerÅUttaleSeg ? attachments.filter((a: Attachment) => !isAttachmentWithError(a)) : [],
        saksnummer: minidialog.saksnr,
        type: getSakstype(sak),
        dialogId: minidialog.dialogId,
        brukerTekst: {
            dokumentType: Skjemanummer.TILBAKEBETALING,
            overskrift: 'Svar på tilbakebetalingen',
            tekst: brukerØnskerÅUttaleSeg
                ? fritekst
                : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som NAV har tilgjengelig.',
        },
    };

    const cls = BEMHelper('minidialog-skjema');
    return (
        <form
            className={cls.block}
            onSubmit={(event: FormEvent) => {
                event.stopPropagation();
                event.preventDefault();

                return onSubmit(submitData);
            }}
        >
            <Snakkeboble topp={formaterDatoForHendelse(minidialog.opprettet)} pilHoyre={false} ikonClass={'nav'}>
                <Normaltekst tag="p">
                    <FormattedMessage id="miniDialog.tilbakekreving.tittel" values={{ sakstype: getSakstype(sak) }} />
                </Normaltekst>
            </Snakkeboble>
            <Undertittel className="blokk-xs">
                <FormattedMessage id="miniDialog.tilbakekreving.undertittel" />
            </Undertittel>
            <HvaLeggerNAVVektPå />
            <RadioPanelGruppe
                name="name"
                className="blokk-xs"
                radios={[
                    { label: getMessage(intl, 'ja'), value: JaNeiSpørsmål.JA },
                    { label: getMessage(intl, 'nei'), value: JaNeiSpørsmål.NEI },
                ]}
                legend={getMessage(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                checked={svar}
                onChange={(_e: any, value: string) => update(value)}
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
                    <Hovedknapp disabled={isSendingEttersendelse} spinner={isSendingEttersendelse}>
                        <FormattedMessage id="miniDialog.tilbakekreving.sendButton" />
                    </Hovedknapp>
                </div>
            )}
        </form>
    );
};

export default withAttachments<Props>(MinidialogSkjema);
