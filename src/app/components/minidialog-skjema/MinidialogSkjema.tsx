import React, { FormEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import './minidialogSkjema.css';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { JaNeiSpørsmål } from 'app/types/JaNeiSpørsmål';
import { Button, Chat, GuidePanel, Radio, RadioGroup, Textarea } from '@navikt/ds-react';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Attachment } from 'app/types/Attachment';
import { isAttachmentWithError } from 'app/utils/attachementUtils';
import { Block } from '@navikt/fp-common';
import { Skjemanummer } from 'app/types/Skjemanummer';
interface Props {
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
    sakstype: Ytelse;
}

const MinidialogSkjema: React.FunctionComponent<Props> = ({ sakstype, minidialog, onSubmit }) => {
    const intl = useIntl();
    const [fritekst, updateFritekst] = useState('');
    const [svar, setSvar] = useState<string | undefined>(undefined);
    const brukerØnskerÅUttaleSeg = svar === JaNeiSpørsmål.JA;
    const attachments = [] as Attachment[]; //TODO;
    const submitData: EttersendingDto = {
        vedlegg: brukerØnskerÅUttaleSeg ? attachments.filter((a: Attachment) => !isAttachmentWithError(a)) : [],
        saksnummer: minidialog.saksnr,
        type: sakstype,
        dialogId: minidialog.dialogId,
        brukerTekst: {
            dokumentType: Skjemanummer.TILBAKEBETALING,
            overskrift: 'Svar på tilbakebetalingen',
            tekst: brukerØnskerÅUttaleSeg
                ? fritekst
                : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som NAV har tilgjengelig.',
        },
    };

    const bem = bemUtils('minidialogSkjema');
    return (
        <form
            className={bem.block}
            onSubmit={(event: FormEvent) => {
                event.stopPropagation();
                event.preventDefault();
                return onSubmit(submitData);
            }}
        >
            <Block padBottom="l">
                <Chat
                    avatar="NAV"
                    name="MAV"
                    avatarBgColor="rgba(255, 236, 204, 1)"
                    backgroundColor="rgba(255, 249, 240, 1)"
                    timestamp={formatDate(minidialog.opprettet)}
                    // classNames={bem.element('snakkeBoble')}
                >
                    <Chat.Bubble>{intlUtils(intl, 'miniDialog.tilbakekreving.tittel', { sakstype })}</Chat.Bubble>
                </Chat>
            </Block>
            <Block padBottom="l">
                <HvaLeggerNAVVektPå />
            </Block>

            <Block padBottom="l">
                <RadioGroup
                    name="name"
                    className="blokk-xs"
                    onChange={(value: string) => setSvar(value)}
                    legend={intlUtils(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                >
                    <Radio value={JaNeiSpørsmål.JA}>{intlUtils(intl, 'Ja')}</Radio>
                    <Radio value={JaNeiSpørsmål.NEI}>{intlUtils(intl, 'Nei')}</Radio>
                </RadioGroup>
            </Block>
            {svar === JaNeiSpørsmål.JA && (
                <Block padBottom="l">
                    <div className={bem.element('fritekstfelt')}>
                        <Textarea
                            label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                            value={fritekst}
                            onChange={(e: any) => updateFritekst(e.target.value)}
                        />
                    </div>
                </Block>
            )}
            {svar === JaNeiSpørsmål.NEI && (
                <Block padBottom="l">
                    <div className="blokk-xs">
                        <GuidePanel>{intlUtils(intl, 'minidialog.tilbakekreving.veilederpanel')}</GuidePanel>
                    </div>
                </Block>
            )}
            {svar !== undefined && (
                <Block padBottom="l">
                    <div className={bem.element('btn')}>
                        {/* <Button disabled={isSendingEttersendelse}> */}
                        <Button>{intlUtils(intl, 'miniDialog.tilbakekreving.sendButton')}</Button>
                    </div>
                </Block>
            )}
        </form>
    );
};

//TODO: Legg på spinner når sender inn
export default MinidialogSkjema;
