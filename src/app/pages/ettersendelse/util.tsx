import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Skjemanummer } from 'common/storage/attachment/types/Attachment';

export const getAttachmentTypeSelectOptions = (intl: InjectedIntl) => (
    <>
        <option value={undefined} selected={true} disabled={true} hidden={true}>
            {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
        </option>
        {Object.values(Skjemanummer).map((skjemanummer: Skjemanummer) => (
            <option value={skjemanummer} key={skjemanummer}>
                {intl.formatMessage({ id: `ettersendelse.select.${skjemanummer}` })}
            </option>
        ))}
    </>
);

export const getUniqueSkjemanummereInAnAttachmentList = () => {

};