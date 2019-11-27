import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { erForeldrepengesak, harSendtInnEndringssøknad, erEngangsstønad, erInfotrygdSak } from '../../utils/sakerUtils';
import SakBase from '../../api/types/sak/Sak';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import {
    isSkjemanummerForEndringssøknadForeldrepenger,
    skjemanummerForFørstegangssøknadForeldrepenger,
    isSkjemanummerForEngangsstønad,
    isSkjemanummerForSvangerskapspengesoknad
} from 'app/utils/skjemanummerUtils';
import { EttersendingType } from 'app/api/types/ettersending/EttersendingDto';

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};

export const getAttachmentTypeSelectOptions = (intl: InjectedIntl, sak: SakBase) => (
    <>
        <option value="default" disabled={true} hidden={true}>
            {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
        </option>
        {getRelevanteSkjemanummer(sak)
            .map((skjemanummer) => ({
                skjemanummer,
                text: intl.formatMessage({ id: `ettersendelse.${skjemanummer}` })
            }))
            .sort((selectOption, nextSelectOption) => selectOption.text.localeCompare(nextSelectOption.text))
            .map(({ skjemanummer, text }) => (
                <option value={skjemanummer} key={skjemanummer}>
                    {text}
                </option>
            ))}
    </>
);

const getRelevanteSkjemanummer = (sak: SakBase): Skjemanummer[] => {
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

export const getEttersendingType = (sak: SakBase): EttersendingType => {
    if(erForeldrepengesak(sak) || erInfotrygdSak(sak)) {
        return EttersendingType.FORELDREPENGER;
    } else if(erEngangsstønad(sak)) {
        return EttersendingType.ENGANGSSTØNAD;
    } else {
        return EttersendingType.SVANGERSKAPSPENGER
    }
}
