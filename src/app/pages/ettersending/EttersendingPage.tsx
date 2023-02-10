import { Heading } from '@navikt/ds-react';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import React from 'react';
import { EttersendingFormComponents, EttersendingFormField } from './ettersendFormConfig';

const EttersendingPage: React.FunctionComponent = () => {
    return (
        <EttersendingFormComponents.FormikWrapper
            initialValues={{ type: '', vedlegg: [] }}
            onSubmit={() => null}
            renderForm={({ values }) => {
                return (
                    <>
                        <Heading size="large" level="2">
                            Ettersend dokumentasjon
                        </Heading>
                        <EttersendingFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <div>Hello</div>
                            <FormikFileUploader
                                name={EttersendingFormField.vedlegg}
                                attachments={values.vedlegg || []}
                                label="Last opp dokumentasjon"
                                attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                                skjemanummer={Skjemanummer.ANNET}
                                legend="Test"
                                buttonLabel="Label for button"
                            />
                        </EttersendingFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default EttersendingPage;
