import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { erForeldrepengesak, harSendtInnEndringssøknad, erEngangsstønad, erInfotrygdSak } from '../../utils/sakerUtils';
import Sak from '../../api/types/sak/Sak';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import {
    isSkjemanummerForEndringssøknadForeldrepenger,
    skjemanummerForFørstegangssøknadForeldrepenger,
    isSkjemanummerForEngangsstønad,
    isSkjemanummerForSvangerskapspengesoknad
} from 'app/utils/skjemanummerUtils';

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};

export const getAttachmentTypeSelectOptions = (intl: InjectedIntl, sak: Sak) => (
    <>
        <option value="default" disabled={true} hidden={true}>
            {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
        </option>
        {getRelevanteSkjemanummer(sak)
            .map((skjemanummer) => ({
                skjemanummer,
                text: intl.formatMessage({ id: `ettersendelse.select.${skjemanummer}` })
            }))
            .sort((selectOption, nextSelectOption) => selectOption.text.localeCompare(nextSelectOption.text))
            .map(({ skjemanummer, text }) => (
                <option value={skjemanummer} key={skjemanummer}>
                    {text}
                </option>
            ))}
    </>
);

const getRelevanteSkjemanummer = (sak: Sak): Skjemanummer[] => {
    const alleSkjemanummere = Object.values(Skjemanummer);
    if (erInfotrygdSak(sak)) {
        return alleSkjemanummere;
    } else if (erForeldrepengesak(sak)) {
        return harSendtInnEndringssøknad(sak)
            ? alleSkjemanummere.filter(isSkjemanummerForEndringssøknadForeldrepenger)
            : alleSkjemanummere.filter(skjemanummerForFørstegangssøknadForeldrepenger);
    } else if (erEngangsstønad(sak)) {
        return alleSkjemanummere.filter(isSkjemanummerForEngangsstønad);
    } else {
        return alleSkjemanummere.filter(isSkjemanummerForSvangerskapspengesoknad);
    }
};
