import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { erForeldrepengesak, harSendtInnEndringssøknad, erEngangsstønad, erInfotrygdSak } from '../../utils/sakerUtils';
import Sak from '../../api/types/sak/Sak';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';

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

export const skjemanummerForFørstegangssøknadForeldrepenger = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.TILRETTELEGGING_FOR_ARBEIDSTAKERE:
        case Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG:
            return false;
        default:
            return true;
    }
};

export const isSkjemanummerForEndringssøknadForeldrepenger = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:
        case Skjemanummer.BEKREFTELSE_FRA_ARBEIDSGIVER:
        case Skjemanummer.BEKREFTELSE_FRA_STUDIESTED:
        case Skjemanummer.BEKREFTELSE_PÅ_AVTALT_FERIE:
        case Skjemanummer.DOK_AV_ALENEOMSORG:
        case Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:
        case Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:
        case Skjemanummer.DOK_INNLEGGELSE:
        case Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM:
        case Skjemanummer.DOK_OVERFØRING_FOR_SYK:
        case Skjemanummer.OMSORGSOVERTAKELSESDATO:
        case Skjemanummer.TILBAKEBETALING:
            return true;
        default:
            return false;
    }
};

export const isSkjemanummerForSvangerskapspengesoknad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE:
        case Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.TILRETTELEGGING_FOR_ARBEIDSTAKERE:
        case Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG:
        case Skjemanummer.TILBAKEBETALING:
            return true;
        default:
            return false;
    }
};

export const isSkjemanummerForEngangsstønad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.TERMINBEKREFTELSE:
        case Skjemanummer.FØDSELSATTEST:
        case Skjemanummer.TILBAKEBETALING:
            return true;
        default:
            return false;
    }
};
