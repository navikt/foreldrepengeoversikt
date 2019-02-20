import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import {
    Attachment,
    Skjemanummer,
    skjemanummerForEndringssøknad,
    skjemanummerForEngangsstønad
} from 'common/storage/attachment/types/Attachment';
import { erEndringssøknad, erForeldrepengesak } from '../../utils/sakerUtils';
import Sak from '../../types/Sak';

export const getAttachmentTypeSelectOptions = (intl: InjectedIntl, sak: Sak) => (
    <>
        <option value={'default'} disabled={true} hidden={true}>
            {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
        </option>
        {relevanteSkjemanummer(sak).map((skjemanummer: Skjemanummer) => (
            <option value={skjemanummer} key={skjemanummer}>
                {intl.formatMessage({ id: `ettersendelse.select.${skjemanummer}` })}
            </option>
        ))}
    </>
);

const relevanteSkjemanummer = (sak: Sak) => {
    const alleSkjemanummere = Object.values(Skjemanummer);
    if (erForeldrepengesak(sak)) {
        return erEndringssøknad(sak) ? alleSkjemanummere.filter(skjemanummerForEndringssøknad) : alleSkjemanummere;
    }
    return alleSkjemanummere.filter(skjemanummerForEngangsstønad);
};

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};