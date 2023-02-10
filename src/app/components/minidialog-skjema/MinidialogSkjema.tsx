import React from 'react';
import { useIntl } from 'react-intl';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { formatDate, intlUtils } from '@navikt/fp-common';
import { Alert, Button, Chat, GuidePanel } from '@navikt/ds-react';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Block } from '@navikt/fp-common';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Link } from 'react-router-dom';
import FormikFileUploader from '../formik-file-uploader/FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { MinidialogFormComponents, MinidialogFormField } from './minidialogSkjemaConfig';
import { mapMinidialogInputTilDTO } from './minidialogskjemaUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';

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
    const handleSubmit = (values: any) => {
        const submitData = mapMinidialogInputTilDTO(values, minidialog.saksnr, sakstype, minidialog.dialogId);
        onSubmit(submitData);
    };

    if (ettersendelseErSendt) {
        return (
            <div>
                <Block padBottom="l">
                    <Alert variant="success">Svaret ditt er sendt.</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/${minidialog.saksnr}`}>Gå tilbake til saken</Link>
                </Block>
            </div>
        );
    }
    return (
        <MinidialogFormComponents.FormikWrapper
            initialValues={{
                tilbakemelding: '',
                vedlegg: [],
                brukerØnskerÅUttaleSeg: YesOrNo.UNANSWERED,
            }}
            onSubmit={handleSubmit}
            renderForm={({ values: formvalues }) => {
                const brukerØnskerÅUttaleSeg = convertYesOrNoOrUndefinedToBoolean(formvalues.brukerØnskerÅUttaleSeg);
                return (
                    <MinidialogFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l">
                            <Chat
                                avatar="NAV"
                                name="NAV"
                                avatarBgColor="rgba(255, 236, 204, 1)"
                                backgroundColor="rgba(255, 249, 240, 1)"
                                timestamp={formatDate(minidialog.opprettet)}
                            >
                                <Chat.Bubble>
                                    {intlUtils(intl, 'miniDialog.tilbakekreving.tittel', { sakstype })}
                                </Chat.Bubble>
                            </Chat>
                        </Block>
                        <Block padBottom="xl">
                            <HvaLeggerNAVVektPå />
                        </Block>

                        <Block padBottom="l">
                            <MinidialogFormComponents.YesOrNoQuestion
                                name={MinidialogFormField.brukerØnskerÅUttaleSeg}
                                legend={intlUtils(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                            />
                        </Block>
                        <Block padBottom="xl" visible={brukerØnskerÅUttaleSeg === true}>
                            <MinidialogFormComponents.Textarea
                                name={MinidialogFormField.tilbakemelding}
                                label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                            ></MinidialogFormComponents.Textarea>
                            <FormikFileUploader
                                name={MinidialogFormField.vedlegg}
                                attachments={formvalues.vedlegg || []}
                                label="Last opp dokumentasjon"
                                attachmentType={AttachmentType.TILBAKEBETALING}
                                skjemanummer={Skjemanummer.TILBAKEBETALING}
                                legend=""
                                buttonLabel="Last opp dokumentasajon"
                            />
                        </Block>
                        <Block padBottom="xl" visible={brukerØnskerÅUttaleSeg === false}>
                            <div className="blokk-xs">
                                <GuidePanel>{intlUtils(intl, 'minidialog.tilbakekreving.veilederpanel')}</GuidePanel>
                            </div>
                        </Block>
                        <Block padBottom="l" visible={formvalues.brukerØnskerÅUttaleSeg !== YesOrNo.UNANSWERED}>
                            <Button type="submit" disabled={isSendingEttersendelse}>
                                {intlUtils(intl, 'miniDialog.tilbakekreving.sendButton')}
                            </Button>
                        </Block>
                    </MinidialogFormComponents.Form>
                );
            }}
        />
    );
};

export default MinidialogSkjema;
