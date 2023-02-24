import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import StønadskontoIkon from 'app/components/stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from 'app/components/utsettelse-ikon/UtsettelseIkon';
import { Periode as PeriodeListeItem } from 'app/types/Periode';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { getAntallUttaksdagerITidsperiode, getVarighetString } from 'app/utils/dateUtils';
import { isOppholdsperiode, isOverføringsperiode, isUtsettelsesperiode, isUttaksperiode } from 'app/utils/periodeUtils';
import { NavnPåForeldre } from 'app/utils/personUtils';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

import './periodeListeItem.css';

interface Props {
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    periode: PeriodeListeItem;
}

export const getPeriodeIkon = (
    periode: PeriodeListeItem,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor?: boolean,
    erAleneOmOmsorg?: boolean
): React.ReactNode | undefined => {
    if (isUttaksperiode(periode)) {
        return (
            <StønadskontoIkon
                konto={periode.kontoType!}
                gradert={!!periode.gradering}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
                erAleneOmOmsorg={erAleneOmOmsorg}
            />
        );
    }
    if (isOverføringsperiode(periode)) {
        return <StønadskontoIkon konto={periode.kontoType!} navnPåForeldre={navnPåForeldre} />;
    }
    if (isUtsettelsesperiode(periode)) {
        return <UtsettelseIkon årsak={periode.utsettelseÅrsak!} />;
    }
    if (isOppholdsperiode(periode)) {
        return <StønadskontoIkon konto={StønadskontoType.Foreldrepenger} navnPåForeldre={navnPåForeldre} />;
    }
    return undefined;
};

const getPeriodeIkonColor = (periode: PeriodeListeItem): string => {
    if (isUttaksperiode(periode)) {
        const { kontoType } = periode;

        switch (kontoType) {
            case StønadskontoType.Fedrekvote:
            case StønadskontoType.Foreldrepenger:
                return 'blue';
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return 'purple';
            case StønadskontoType.Fellesperiode:
                return 'blue-purple';
            default:
                return 'blue';
        }
    }
    return 'green';
};

const getPeriodeTittel = (periode: PeriodeListeItem): string => {
    if (isUttaksperiode(periode)) {
        const { kontoType } = periode;

        switch (kontoType) {
            case StønadskontoType.Fedrekvote:
                return 'Fedrekvote';
            case StønadskontoType.Mødrekvote:
                return 'Mødrekvote';
            case StønadskontoType.Fellesperiode:
                return 'Fellesperiode';
            case StønadskontoType.Foreldrepenger:
                return 'Foreldrepenger';
            case StønadskontoType.ForeldrepengerFørFødsel:
                return 'Foreldrepenger før fødsel';
            default:
                return '';
        }
    }
    if (isUtsettelsesperiode(periode)) {
        const { utsettelseÅrsak } = periode;
        switch (utsettelseÅrsak) {
            case UtsettelseÅrsakType.Arbeid:
                return 'Utsettelse på grunn av arbeid';
            case UtsettelseÅrsakType.Sykdom:
                return 'Utsettelse på grunn av sykdom';
            case UtsettelseÅrsakType.InstitusjonSøker:
                return 'Utsettelse på grunn av innleggelse i helseinstitusjon';
            case UtsettelseÅrsakType.InstitusjonBarnet:
                return 'Utsettelse på grunn av at barnet er innlagt i helseinstitusjon';
            case UtsettelseÅrsakType.HvØvelse:
                return 'Utsettelse på grunn av HV Øvelse';
            case UtsettelseÅrsakType.NavTiltak:
                return 'Utsettelse på grunn av NAV tiltak som utgjør 100% arbeid';
            case UtsettelseÅrsakType.Ferie:
                return 'Utsettelse på grunn av ferie';
            case UtsettelseÅrsakType.Fri:
                return 'Periode uten uttak';
            default:
                return '';
        }
    }

    return '';
};

const PeriodeListeItem: React.FunctionComponent<Props> = ({
    periode,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    navnPåForeldre,
}) => {
    const bem = bemUtils('periode');
    const intl = useIntl();
    const { fom, tom } = periode;
    const tittel = getPeriodeTittel(periode);
    const antallDagerIPeriode = getAntallUttaksdagerITidsperiode({
        fom: dayjs(periode.fom).toDate(),
        tom: dayjs(periode.tom).toDate(),
    });
    const navnSøker = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const varighetString = getVarighetString(antallDagerIPeriode, intl);
    const visStønadskontoIkon = isUttaksperiode(periode) || isOverføringsperiode(periode) || isOppholdsperiode(periode);
    const visUtsettelsesIkon = isUtsettelsesperiode(periode);
    const ikonColor = getPeriodeIkonColor(periode);
    console.log(ikonColor);
    return (
        <div className={classNames(`${bem.block} ${bem.element('box')}`)}>
            <div className={bem.element('innhold')}>
                {visStønadskontoIkon && (
                    <StønadskontoIkon
                        konto={periode.kontoType!}
                        gradert={!!periode.gradering}
                        navnPåForeldre={navnPåForeldre}
                        erFarEllerMedmor={erFarEllerMedmor}
                        erAleneOmOmsorg={erAleneOmOmsorg}
                    />
                )}
                {visUtsettelsesIkon && <UtsettelseIkon årsak={periode.utsettelseÅrsak!} />}
                <div className={bem.element('innhold-tekst-left')}>
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    <BodyShort size="small">{`${varighetString} - ${navnSøker}`}</BodyShort>
                </div>
                <div className={bem.element('innhold-tekst-right')}>
                    <BodyShort>{`${formatDateExtended(fom)} - ${formatDateExtended(tom)}`}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default PeriodeListeItem;
