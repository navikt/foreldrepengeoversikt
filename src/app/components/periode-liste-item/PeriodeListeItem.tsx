import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import StønadskontoIkon from 'app/components/stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from 'app/components/utsettelse-ikon/UtsettelseIkon';
import { Periode } from 'app/types/Periode';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { getAntallUttaksdagerITidsperiode, getVarighetString } from 'app/utils/dateUtils';
import {
    getPeriodeTittel,
    isAvslåttPeriode,
    isOppholdsperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
} from 'app/utils/periodeUtils';
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
    periode: Periode;
}

export const getPeriodeIkon = (
    periode: Periode,
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
                periodeResultat={periode.resultat}
                morsAktivitet={periode.morsAktivitet}
            />
        );
    }
    if (isOverføringsperiode(periode)) {
        return (
            <StønadskontoIkon
                konto={periode.kontoType!}
                navnPåForeldre={navnPåForeldre}
                periodeResultat={periode.resultat}
                morsAktivitet={periode.morsAktivitet}
            />
        );
    }
    if (isUtsettelsesperiode(periode)) {
        return <UtsettelseIkon årsak={periode.utsettelseÅrsak!} />;
    }
    if (isOppholdsperiode(periode)) {
        return (
            <StønadskontoIkon
                konto={StønadskontoType.Foreldrepenger}
                navnPåForeldre={navnPåForeldre}
                periodeResultat={periode.resultat}
                morsAktivitet={periode.morsAktivitet}
            />
        );
    }
    return undefined;
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

    const tittel = getPeriodeTittel(intl, periode, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    const antallDagerIPeriode = getAntallUttaksdagerITidsperiode({
        fom: dayjs(periode.fom).toDate(),
        tom: dayjs(periode.tom).toDate(),
    });
    const navnSøker = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const varighetString = getVarighetString(antallDagerIPeriode, intl);
    const visStønadskontoIkon = isUttaksperiode(periode) || isOverføringsperiode(periode) || isOppholdsperiode(periode);
    const visUtsettelsesIkon = isUtsettelsesperiode(periode);
    const classNameInnvilget = isAvslåttPeriode(periode) ? bem.modifier('ikke-innvilget') : bem.modifier('innvilget');
    return (
        <div className={classNames(`${bem.block} ${bem.element('box')} ${classNameInnvilget}`)}>
            <div className={bem.element('innhold')}>
                {visStønadskontoIkon && (
                    <StønadskontoIkon
                        konto={periode.kontoType!}
                        gradert={!!periode.gradering}
                        navnPåForeldre={navnPåForeldre}
                        erFarEllerMedmor={erFarEllerMedmor}
                        erAleneOmOmsorg={erAleneOmOmsorg}
                        periodeResultat={periode.resultat}
                        morsAktivitet={periode.morsAktivitet}
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
