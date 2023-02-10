import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const convertYesOrNoOrUndefinedToBoolean = (value: YesOrNo | undefined) => {
    if (value === YesOrNo.YES) {
        return true;
    }

    if (value === YesOrNo.UNANSWERED) {
        return undefined;
    }

    return false;
};
