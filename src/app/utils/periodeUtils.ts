import { intlUtils } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { OppholdÅrsakType } from 'app/types/OppholdÅrsakType';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { IntlShape } from 'react-intl';
import { getNavnGenitivEierform, NavnPåForeldre } from './personUtils';
import { capitalizeFirstLetter } from './stringUtils';
import dayjs from 'dayjs';

export const isUttaksperiode = (periode: Periode) => {
    return periode.kontoType !== undefined;
};

export const isUtsettelsesperiode = (periode: Periode) => {
    return periode.utsettelseÅrsak !== undefined;
};

export const isOverføringsperiode = (periode: Periode) => {
    return periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Periode) => {
    return periode.oppholdÅrsak !== undefined;
};

export const finnTidligerePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ tom }) => dayjs(tom).isBefore(dayjs(), 'd'));
};

export const finnNåværendePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ fom, tom }) => dayjs().isBetween(fom, tom, 'd', '[]'));
};

export const finnFremtidigePerioder = (perioder: Periode[]): Periode[] => {
    return perioder.filter(({ fom }) => dayjs(fom).isAfter(dayjs(), 'd'));
};

const isValidStillingsprosent = (pst: number | undefined): boolean => pst !== undefined && isNaN(pst) === false;

const prettifyProsent = (pst: number | undefined): number | undefined => {
    if (pst === undefined) {
        return undefined;
    }

    const nbr = pst;
    if (isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor?: boolean,
    erAleneOmOmsorg?: boolean
) => {
    let navn;

    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) }
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === StønadskontoType.AktivitetsfriKvote) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === StønadskontoType.Foreldrepenger) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        let prosent = (100 - stillingsPst) * 100;
        prosent = Math.round(prosent) / 100;

        return prosent;
    }
    return undefined;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    return erMor
        ? intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn: navn })
        : intlUtils(intl, `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn: navn });
};

export const getPeriodeTittel = (
    intl: IntlShape,
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor?: boolean,
    erAleneOmOmsorg?: boolean
): string => {
    if (isUttaksperiode(periode)) {
        const tittelMedNavn = getStønadskontoNavn(
            intl,
            periode.kontoType,
            navnPåForeldre,
            erFarEllerMedmor,
            erAleneOmOmsorg
        );
        //TODO:
        // const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        //     intl,
        //     tittelMedNavn,
        //     periode,
        //     situasjon,
        //     familiehendelsesdato,
        //     termindato
        // );
        const tittel = tittelMedNavn;
        if (
            (periode.gradering && isValidStillingsprosent(periode.gradering.arbeidstidprosent)) ||
            (periode.samtidigUttak && isValidStillingsprosent(periode.samtidigUttak))
        ) {
            const graderingsProsent = periode.gradering
                ? prettifyProsent(periode.gradering.arbeidstidprosent)
                : undefined;
            const samtidigUttaksProsent = periode.samtidigUttak ? prettifyProsent(periode.samtidigUttak) : undefined;
            return `${tittel} ${intlUtils(intl, 'gradering.prosent', {
                stillingsprosent: getUttaksprosentFromStillingsprosent(graderingsProsent, samtidigUttaksProsent),
            })}`;
        }

        return tittel;
    }
    if (isOverføringsperiode(periode)) {
        return getStønadskontoNavn(intl, periode.kontoType, navnPåForeldre);
    }
    if (isUtsettelsesperiode(periode)) {
        if (periode.utsettelseÅrsak) {
            return intlUtils(intl, 'uttaksplan.periodeliste.utsettelsesårsak', {
                årsak: intlUtils(intl, `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}`),
            });
        }
        return intlUtils(intl, 'uttaksplan.periodeliste.utsettelsesårsak.ukjent');
    }
    //TODO getOppholdskontoNavn
    return '';
};
