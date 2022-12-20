import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { getStønadskontoNavn } from 'common/components/uttaksoppsummering/Kontostatus';

import Periode, { PeriodeType, Utsettelsesperiode, Uttaksperiode, Oppholdsperiode } from 'app/types/uttaksplan/Periode';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttaksplanAdvarselIkon';

import PeriodeListElement from '../PeriodeListElement/PeriodeListElement';
import { getIkon, getBeskrivelse } from './util';
import {
    getVarighetString,
    getStønadskontoTypeFromOppholdsÅrsak,
    skalVisesIPeriodeListe,
    getAnnenPartsPeriodeMedSamtidigUttak,
    getStønadskontoFarge,
    getNavnPåForelderForPeriode,
    getFargeForPeriode,
} from '../../../utils/periodeUtils';

import './periodeList.less';

interface Props {
    tittel: string | React.ReactNode;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const PeriodeList: React.FunctionComponent<Props> = ({
    tittel,
    perioder,
    navnPåForeldre,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    const cls = BEMHelper('periode-list');

    return (
        <div className={cls.block}>
            <Normaltekst className={cls.element('tittel')}>{tittel}</Normaltekst>
            <ol>
                {perioder
                    .filter((p) => skalVisesIPeriodeListe(p, perioder))
                    .map((p) => {
                        switch (p.type) {
                            case PeriodeType.Uttak:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={getStønadskontoNavn(
                                            intl,
                                            (p as Uttaksperiode).stønadskontotype,
                                            navnPåForeldre,
                                            erFarEllerMedmor,
                                            erAleneOmOmsorg
                                        )}
                                        ikon={getIkon(p, erFarEllerMedmor)}
                                        beskrivelse={getBeskrivelse(p, navnPåForeldre, intl)}
                                        tidsperiode={p.tidsperiode}
                                        annenForelderSamtidigUttakPeriode={getAnnenPartsPeriodeMedSamtidigUttak(
                                            p,
                                            perioder
                                        )}
                                        navnPåForeldre={navnPåForeldre}
                                        color={getStønadskontoFarge(
                                            (p as Uttaksperiode).stønadskontotype,
                                            p.forelder,
                                            false
                                        )}
                                    />
                                );
                            case PeriodeType.Utsettelse:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={
                                            <FormattedMessage
                                                id="dinPlan.utsettelsesårsak"
                                                values={{
                                                    årsak: (p as Utsettelsesperiode).årsak.toLowerCase(),
                                                }}
                                            />
                                        }
                                        ikon={getIkon(p, erFarEllerMedmor)}
                                        beskrivelse={getBeskrivelse(p, navnPåForeldre, intl)}
                                        tidsperiode={p.tidsperiode}
                                        color={UttaksplanColor.green}
                                    />
                                );
                            case PeriodeType.Hull:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={<FormattedMessage id="dinPlan.hull" />}
                                        ikon={<UttaksplanAdvarselIkon />}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.hull.beskrivelse"
                                                values={{ antallDager: p.antallUttaksdager }}
                                            />
                                        }
                                        color={UttaksplanColor.yellow}
                                        tidsperiode={p.tidsperiode}
                                    />
                                );
                            case PeriodeType.PeriodeUtenUttak:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={<FormattedMessage id="dinPlan.periodeUtenUttak" />}
                                        ikon={getIkon(p, erFarEllerMedmor)}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.periodeUtenUttak.beskrivelse"
                                                values={{ antallDager: p.antallUttaksdager }}
                                            />
                                        }
                                        color={UttaksplanColor.transparent}
                                        tidsperiode={p.tidsperiode}
                                    />
                                );
                            case PeriodeType.Opphold:
                                const kvote = getStønadskontoTypeFromOppholdsÅrsak(
                                    (p as Oppholdsperiode).oppholdsårsak
                                );

                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={
                                            <FormattedMessage
                                                id={`kvote.${kvote.toLowerCase()}`}
                                                values={{
                                                    erGradert: false,
                                                }}
                                            />
                                        }
                                        ikon={<UttaksplanAdvarselIkon />}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.opphold.beskrivelse"
                                                values={{ navn: getNavnPåForelderForPeriode(p, navnPåForeldre) }}
                                            />
                                        }
                                        tidsperiode={p.tidsperiode}
                                        color={UttaksplanColor.yellow}
                                    />
                                );
                            case PeriodeType.TaptPeriode:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={<FormattedMessage id="dinPlan.taptPeriode" />}
                                        ikon={<UttaksplanAdvarselIkon />}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.taptPeriode.beskrivelse"
                                                values={{
                                                    navn: getNavnPåForelderForPeriode(p, navnPåForeldre),
                                                    antallDager: getVarighetString(p.antallUttaksdager, intl),
                                                }}
                                            />
                                        }
                                        tidsperiode={p.tidsperiode}
                                        color={UttaksplanColor.yellow}
                                    />
                                );
                            case PeriodeType.Overføring:
                                return (
                                    <PeriodeListElement
                                        key={guid()}
                                        tittel={
                                            <FormattedMessage
                                                id={
                                                    erFarEllerMedmor
                                                        ? 'dinPlan.overføring.farMedmor'
                                                        : 'dinPlan.overføring.mor'
                                                }
                                                values={{
                                                    navn: erFarEllerMedmor
                                                        ? navnPåForeldre.mor
                                                        : navnPåForeldre.farMedmor,
                                                }}
                                            />
                                        }
                                        ikon={getIkon(p, erFarEllerMedmor)}
                                        beskrivelse={getBeskrivelse(p, navnPåForeldre, intl)}
                                        tidsperiode={p.tidsperiode}
                                        color={getFargeForPeriode(p)}
                                    />
                                );
                        }
                    })}
            </ol>
        </div>
    );
};

export default PeriodeList;
