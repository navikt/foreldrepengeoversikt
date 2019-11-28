import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl, FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import {
    getStønadskontoFarge,
    getVarighetString,
    getStønadskontoTypeFromOppholdsÅrsak,
    skalVisesIPeriodeListe,
    getAnnenPartsPeriodeMedSamtidigUttak,
    erGradert
} from '../../../utils/periodeUtils';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import Periode, { PeriodeType, Utsettelsesperiode, Uttaksperiode, Oppholdsperiode } from 'app/types/uttaksplan/Periode';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttaksplanAdvarselIkon';

import PeriodeListElement from '../PeriodeListElement/PeriodeListElement';

import { getStønadskontoNavn } from 'common/components/uttaksoppsummering/Kontostatus';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { Rolle } from 'app/types/Rolle';

import './periodeList.less';

interface Props {
    tittel: string | React.ReactNode;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
}

const getIconFarge = (periode: Periode) => {
    switch (periode.type) {
        case PeriodeType.Uttak:
            return getStønadskontoFarge((periode as Uttaksperiode).stønadskontotype, undefined, true);
        case PeriodeType.Utsettelse:
            return UttaksplanColor.green;
        default:
            return UttaksplanColor.transparent;
    }
};

export const getIkon = (periode: Periode) => {
    return (
        <IconBox color={getIconFarge(periode)} stripes={erGradert(periode)}>
            <UttakIkon title="uttak ikon" />
        </IconBox>
    );
};

const getBeskrivelse = (periode: Periode, navnPåForeldre: NavnPåForeldre, intl: InjectedIntl) => {
    return (
        <>
            {getVarighetString(periode.antallUttaksdager, intl)}
            <em className="periode-list__hvem">
                {' '}
                - {periode.forelder === Rolle.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor}
            </em>
        </>
    );
};

const PeriodeList: React.FunctionComponent<Props & InjectedIntlProps> = ({
    tittel,
    perioder,
    navnPåForeldre,
    intl
}) => {
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
                                            navnPåForeldre
                                        )}
                                        ikon={getIkon(p)}
                                        beskrivelse={getBeskrivelse(p, navnPåForeldre, intl)}
                                        tidsperiode={p.tidsperiode}
                                        annenForelderSamtidigUttakPeriode={getAnnenPartsPeriodeMedSamtidigUttak(
                                            p,
                                            perioder
                                        )}
                                        navnPåForeldre={navnPåForeldre}
                                        color={getIconFarge(p)}
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
                                                    årsak: (
                                                        <FormattedMessage
                                                            id={`dinPlan.utsettelsesårsak.${(p as Utsettelsesperiode).årsak.toLowerCase()}`}
                                                        />
                                                    )
                                                }}
                                            />
                                        }
                                        ikon={getIkon(p)}
                                        beskrivelse={getBeskrivelse(p, navnPåForeldre, intl)}
                                        tidsperiode={p.tidsperiode}
                                        color={getIconFarge(p)}
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
                                                id="dinPlan.opphold"
                                                values={{
                                                    kvote: (
                                                        <FormattedMessage
                                                            id={`kvote.${kvote.toLowerCase()}`}
                                                            values={{
                                                                erGradert: false
                                                            }}
                                                        />
                                                    )
                                                }}
                                            />
                                        }
                                        ikon={<UttaksplanAdvarselIkon />}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.opphold.beskrivelse"
                                                values={{
           
                                                }}
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
                                                    navn: p.forelder === Rolle.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor,
                                                    antallDager: getVarighetString(p.antallUttaksdager, intl)
                                                }}
                                            />
                                        }
                                        tidsperiode={p.tidsperiode}
                                        color={UttaksplanColor.yellow}
                                    />
                                );
                        }
                    })}
            </ol>
        </div>
    );
};

 export default injectIntl(PeriodeList);
