import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Attachment, Skjemanummer, skjemanummerForEngangssønad } from 'common/storage/attachment/types/Attachment';
import { erForeldrepengesak } from '../../utils/sakerUtils';
import Sak from '../../types/Sak';

export const getAttachmentTypeSelectOptions = (intl: InjectedIntl, sak: Sak) => (
    <>
        <option value={'default'} disabled={true} hidden={true}>
            {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
        </option>
        {Object.values(Skjemanummer)
            .filter((skjemanummer: Skjemanummer) => (erForeldrepengesak(sak) ? true : skjemanummerForEngangssønad(skjemanummer)))
            .map((skjemanummer: Skjemanummer) => (
                <option value={skjemanummer} key={skjemanummer}>
                    {intl.formatMessage({ id: `ettersendelse.select.${skjemanummer}` })}
                </option>
            ))}
    </>
);

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};
