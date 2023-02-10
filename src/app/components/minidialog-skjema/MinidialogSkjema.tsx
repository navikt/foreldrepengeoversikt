import React from 'react';
import { useIntl } from 'react-intl';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import './minidialogSkjema.css';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
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
            initialValues={{
                tilbakemelding: '',
                // vedleggType: '',
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
                            <MinidialogFormComponents.YesOrNoQuestion
                                name={MinidialogFormField.brukerØnskerÅUttaleSeg}
                                legend={intlUtils(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                            />
                        </Block>
                        <Block padBottom="l" visible={brukerØnskerÅUttaleSeg === true}>
                            <MinidialogFormComponents.TextField
                                name={MinidialogFormField.tilbakemelding}
                                label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                            ></MinidialogFormComponents.TextField>
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
                        <Block padBottom="l" visible={brukerØnskerÅUttaleSeg === false}>
                            <div className="blokk-xs">
                                <GuidePanel>{intlUtils(intl, 'minidialog.tilbakekreving.veilederpanel')}</GuidePanel>
                            </div>
                        </Block>
                        <Block padBottom="l" visible={formvalues.brukerØnskerÅUttaleSeg !== YesOrNo.UNANSWERED}>
                            <div className={bem.element('btn')}>
                                <Button type="submit" disabled={isSendingEttersendelse}>
                                    {intlUtils(intl, 'miniDialog.tilbakekreving.sendButton')}
                                </Button>
                            </div>
                        </Block>
                    </MinidialogFormComponents.Form>
                );
            }}
        />
    );
};

export default MinidialogSkjema;
