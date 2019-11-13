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
    getAnnenPartsPeriodeMedSamtidigUttak
} from '../../../utils/periodeUtils';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import Periode, { PeriodeType, Utsettelsesperiode, Uttaksperiode, Oppholdsperiode } from 'app/types/uttaksplan/Periode';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttaksplanAdvarselIkon';
import AnnenPart from 'app/api/types/sak/AnnenPart';
import Person from 'app/types/Person';

import PeriodeListElement from '../PeriodeListElement/PeriodeListElement';

import './periodeList.less';

interface Props {
    tittel: string | React.ReactNode;
    perioder: Periode[];
    søker: Person;
    annenPart?: AnnenPart;
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
        <IconBox
            color={getIconFarge(periode)}
            stripes={periode.type === PeriodeType.Uttak ? (periode as Uttaksperiode).graderingInnvilget : false}>
            <UttakIkon title="uttak ikon" />
        </IconBox>
    );
};

const getBeskrivelse = (periode: Periode, aktører: { søker: Person; annenPart?: AnnenPart }, intl: InjectedIntl) => {
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
                                        tittel={
                                            <FormattedMessage
                                                id={`kvote.${(p as Uttaksperiode).stønadskontotype.toLowerCase()}`}
                                                values={{
                                                    erGradert: (p as Uttaksperiode).graderingInnvilget,
                                                    graderingsprosent: (p as Uttaksperiode).graderingsprosent
                                                }}
                                            />
                                        }
                                        ikon={getIkon(p)}
                                        beskrivelse={getBeskrivelse(p, { søker, annenPart }, intl)}
                                        tidsperiode={p.tidsperiode}
                                        annenForelderSamtidigUttakPeriode={getAnnenPartsPeriodeMedSamtidigUttak(
                                            p,
                                            perioder
                                        )}
                                        annenPart={annenPart}
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
                                        beskrivelse={getBeskrivelse(p, { søker, annenPart }, intl)}
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
                                        color={getIconFarge(p)}
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
                                                    navn: annenPart ? annenPart.navn.fornavn : 'Den andre forelderen'
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
                                                    navn: annenPart ? annenPart.navn.fornavn : 'Den andre forelderen',
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
