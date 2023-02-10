import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum EttersendingFormField {
    type = 'type',
    vedlegg = 'vedlegg',
}

export interface EttersendingFormData {
    [EttersendingFormField.type]: any;
    [EttersendingFormField.vedlegg]: any[];
}

export const EttersendingFormComponents = getTypedFormComponents<EttersendingFormField, EttersendingFormData>();
