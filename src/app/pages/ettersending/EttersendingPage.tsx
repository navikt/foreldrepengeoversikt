import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { EngangsstønadSak } from 'app/types/EngangsstønadSak';
import { Sak } from 'app/types/Sak';
import { SakOppslag } from 'app/types/SakOppslag';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { getRelevanteSkjemanummer } from 'app/utils/skjemanummerUtils';
import React, { useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { EttersendingFormComponents, EttersendingFormField, EttersendingFormData } from './ettersendFormConfig';

import './ettersending-page.css';

export const getAttachmentTypeSelectOptions = (
    intl: IntlShape,
    sak: Sak | EngangsstønadSak | SvangerskapspengeSak | undefined
) => {
    if (!sak) {
        return null;
    }

    return (
        <>
            <option value="default" disabled={true} hidden={true}>
                {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
            </option>
            {getRelevanteSkjemanummer(sak)
                .map((skjemanummer) => ({
                    skjemanummer,
                    text: intl.formatMessage({ id: `ettersendelse.${skjemanummer}` }),
                }))
                .sort((selectOption, nextSelectOption) => selectOption.text.localeCompare(nextSelectOption.text))
                .map(({ skjemanummer, text }) => (
                    <option value={skjemanummer} key={skjemanummer}>
                        {text}
                    </option>
                ))}
        </>
    );
};

interface Props {
    saker: SakOppslag;
}

const EttersendingPage: React.FunctionComponent<Props> = ({ saker }) => {
    const bem = bemUtils('ettersending-page');
    const [isEttersending, setIsEttersending] = useState(false);
    const intl = useIntl();
    const params = useParams();
    const alleYtelser = getAlleYtelser(saker);
    const sak = alleYtelser.find((sak) => sak.saksnummer === params.saksnummer);
    const onSubmit = (values: EttersendingFormData) => {
        setIsEttersending(true);

        const valuesToSend = {
            saksnummer: sak!.saksnummer,
            type: sak!.ytelse,
            vedlegg: values.vedlegg,
        };

        Api.sendEttersending(valuesToSend).then(() => {
            setIsEttersending(false);
        });
    };

    return (
        <EttersendingFormComponents.FormikWrapper
            initialValues={{ type: Skjemanummer.ANNET, vedlegg: [] }}
            onSubmit={onSubmit}
            renderForm={({ values }) => {
                return (
                    <>
                        <Heading size="large" level="2">
                            Last opp dokumenter
                        </Heading>
                        <EttersendingFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <BodyLong className={bem.element('beskrivelse')}>
                                Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene
                                inneholder for at saksbehandlerne i nav enkelt skal kunne behandle søknaden din.
                            </BodyLong>
                            <BodyShort className={bem.element('beskrivelse')}>
                                Du kan laste opp dokumenter i formatene pdf, png og jpg.
                            </BodyShort>
                            <EttersendingFormComponents.Select
                                className={bem.element('select')}
                                label="Hva inneholder dokumentene dine?"
                                name={EttersendingFormField.type}
                            >
                                {getAttachmentTypeSelectOptions(intl, sak)}
                            </EttersendingFormComponents.Select>
                            <FormikFileUploader
                                name={EttersendingFormField.vedlegg}
                                attachments={values.vedlegg || []}
                                label="Last opp dokument"
                                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                                skjemanummer={values.type!}
                                legend=""
                                buttonLabel="Last opp dokument"
                            />
                            <Button type="submit" loading={isEttersending} disabled={isEttersending}>
                                Send dokumenter
                            </Button>
                        </EttersendingFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default EttersendingPage;
