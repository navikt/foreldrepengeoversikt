import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import './minidialogSkjema.css';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { JaNeiSpørsmål } from 'app/types/JaNeiSpørsmål';
import { Alert, Button, Chat, GuidePanel, Radio, RadioGroup, Textarea } from '@navikt/ds-react';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Block } from '@navikt/fp-common';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Link } from 'react-router-dom';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { MinidialogFormComponents, MinidialogFormField } from './minidialogSkjemaConfig';
import { mapMinidialogInputTilDTO } from './minidialogskjemaUtils';

interface Props {
    ettersendelseErSendt: boolean;
    isSendingEttersendelse: boolean;
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
    sakstype: Ytelse;
}

const MinidialogSkjema: React.FunctionComponent<Props> = ({
    ettersendelseErSendt,
    isSendingEttersendelse,
    sakstype,
    minidialog,
    onSubmit,
}) => {
    const intl = useIntl();
    const [fritekst, updateFritekst] = useState('');
    const [svar, setSvar] = useState<string | undefined>(undefined);

    const handleSubmit = (values: any) => {
        const submitData = mapMinidialogInputTilDTO(values, minidialog.saksnr, sakstype, minidialog.dialogId);
        onSubmit(submitData);
    };

    const bem = bemUtils('minidialogSkjema');
    if (ettersendelseErSendt) {
        return (
            <div>
                <Block padBottom="l">
                    <Alert variant="success">Svaret ditt er sendt.</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/${minidialog.saksnr}`} className={bem.element('linkPanel')}>
                        Gå tilbake til saken
                    </Link>
                </Block>
            </div>
        );
    }
    return (
        <MinidialogFormComponents.FormikWrapper
            initialValues={{ tilbakemelding: '', vedleggType: '', vedlegg: [] }}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                return (
                    <MinidialogFormComponents.Form includeButtons={false}>
                        <Block padBottom="l">
                            <Chat
                                avatar="NAV"
                                name="NAV"
                                avatarBgColor="rgba(255, 236, 204, 1)"
                                backgroundColor="rgba(255, 249, 240, 1)"
                                timestamp={formatDate(minidialog.opprettet)}
                                className={bem.element('snakkeBoble')}
                            >
                                <Chat.Bubble>
                                    {intlUtils(intl, 'miniDialog.tilbakekreving.tittel', { sakstype })}
                                </Chat.Bubble>
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
                                        name={MinidialogFormField.tilbakemelding}
                                        label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                                        value={fritekst}
                                        onChange={(e: any) => updateFritekst(e.target.value)}
                                    />
                                    <FormikFileUploader
                                        name={MinidialogFormField.vedlegg}
                                        attachments={values.vedlegg || []}
                                        label="Last opp dokumentasjon"
                                        attachmentType={AttachmentType.TILBAKEBETALING}
                                        skjemanummer={Skjemanummer.TILBAKEBETALING}
                                        legend=""
                                        buttonLabel="Last opp dokumentasajon"
                                    />
                                </div>
                            </Block>
                        )}
                        {svar === JaNeiSpørsmål.NEI && (
                            <Block padBottom="l">
                                <div className="blokk-xs">
                                    <GuidePanel>
                                        {intlUtils(intl, 'minidialog.tilbakekreving.veilederpanel')}
                                    </GuidePanel>
                                </div>
                            </Block>
                        )}
                        {svar !== undefined && (
                            <Block padBottom="l">
                                <div className={bem.element('btn')}>
                                    <Button type="submit" disabled={isSendingEttersendelse}>
                                        {intlUtils(intl, 'miniDialog.tilbakekreving.sendButton')}
                                    </Button>
                                </div>
                            </Block>
                        )}
                    </MinidialogFormComponents.Form>
                );
            }}
        />
    );
};

export default MinidialogSkjema;
