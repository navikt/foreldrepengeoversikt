import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl, FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import {
    getStønadskontoFarge,
    getVarighetString,
    harAnnenForelderSamtidigUttakISammePeriode,
    getStønadskontoTypeFromOppholdsÅrsak,
    skalVisesIPeriodeListe
} from '../periodeUtils';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import Periode, { PeriodeType, Utsettelsesperiode, Uttaksperiode, Oppholdsperiode } from 'app/types/uttaksplan/Periode';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttaksplanAdvarselIkon';
import PeriodeListElement from './PeriodeListElement';
import AnnenPart from 'app/api/types/sak/AnnenPart';
import Personinfo from 'app/api/types/personinfo/Personinfo';

import './periodeList.less';

interface Props {
    tittel: string | React.ReactNode;
    perioder: Periode[];
    søker: Personinfo;
    annenPart?: AnnenPart;
}

const getIconFarge = (periode: any) => {
    switch (periode.type) {
        case PeriodeType.Uttak:
            return getStønadskontoFarge(periode.stønadskontotype, undefined, true);
        case PeriodeType.Utsettelse:
            return UttaksplanColor.green;
        default:
            return UttaksplanColor.transparent;
    }
};

const getIkon = (periode: any) => {
    return (
        <IconBox color={getIconFarge(periode)} stripes={periode.graderingInnvilget}>
            <UttakIkon title="uttak ikon" />
        </IconBox>
    );
};

const getBeskrivelse = (
    periode: Periode,
    aktører: { søker: Personinfo; annenPart?: AnnenPart },
    intl: InjectedIntl
) => {
    return (
        <>
            {getVarighetString(periode.antallUttaksdager, intl)}
            <em className="periode-list__hvem">
                {' '}
                -{' '}
                {periode.gjelderAnnenPart && aktører.annenPart ? aktører.annenPart.navn.fornavn : aktører.søker.fornavn}
            </em>
        </>
    );
};

const PeriodeList: React.FunctionComponent<Props & InjectedIntlProps> = ({
    tittel,
    perioder,
    søker,
    annenPart,
    intl
}) => {
    const cls = BEMHelper('periode-list');
    return (
        <div className={cls.className}>
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
                                        tittel={
                                            <FormattedMessage
                                                id={`kvote.${(p as Uttaksperiode).stønadskontotype.toLowerCase()}`}
                                            />
                                        }
                                        ikon={getIkon(p)}
                                        beskrivelse={getBeskrivelse(p, { søker, annenPart }, intl)}
                                        tidsperiode={p.tidsperiode}
                                        erSamtidigUttak={harAnnenForelderSamtidigUttakISammePeriode(p, perioder)}
                                        annenPart={annenPart}
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
                                        beskrivelse={getBeskrivelse(p, { søker, annenPart }, intl)}
                                        tidsperiode={p.tidsperiode}
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
                                                    kvote: <FormattedMessage id={`kvote.${kvote.toLowerCase()}`} />
                                                }}
                                            />
                                        }
                                        ikon={<UttaksplanAdvarselIkon />}
                                        beskrivelse={
                                            <FormattedMessage
                                                id="dinPlan.opphold.beskrivelse"
                                                values={{
                                                    navn: annenPart ? annenPart.navn.fornavn : 'Den andre forelderen'
                                                }}
                                            />
                                        }
                                        tidsperiode={p.tidsperiode}
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
                                                    navn: annenPart ? annenPart.navn.fornavn : 'Den andre forelderen'
                                                }}
                                            />
                                        }
                                        tidsperiode={p.tidsperiode}
                                    />
                                );
                        }
                    })}
            </ol>
        </div>
    );
};

export default injectIntl(PeriodeList);
