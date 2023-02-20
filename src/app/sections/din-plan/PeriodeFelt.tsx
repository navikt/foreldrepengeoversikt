import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended, Kjønn } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { getAntallUttaksdagerITidsperiode, getVarighetString } from 'app/utils/dateUtils';
import { isUtsettelsesperiode, isUttaksperiode } from 'app/utils/periodeUtils';
import Far1 from 'assets/Far1';
import Far2 from 'assets/Far2';
import Medmor1 from 'assets/Medmor2';
import Mor1 from 'assets/Mor1';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

import './periode.css';

interface Props {
    erSamtidigUttak: boolean;
    gjelderAnnenPart: boolean;
    ikkeUttak?: boolean;
    kjønn: Kjønn;
    navnForelder: string;
    periode: Periode;
}

const getPeriodeTittel = (periode: Periode): string => {
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
                return 'Utsetter grunnet arbeid';
            case UtsettelseÅrsakType.Fri:
                return 'Periode uten uttak';
            default:
                return '';
        }
    }

    return '';
};

const PeriodeFelt: React.FunctionComponent<Props> = ({
    erSamtidigUttak,
    periode,
    navnForelder,
    kjønn,
    gjelderAnnenPart,
    ikkeUttak = false,
}) => {
    const bem = bemUtils('periode');
    const intl = useIntl();
    const { tidsperiode } = periode;
    const { fom, tom } = tidsperiode;
    const tittel = getPeriodeTittel(periode);
    const antallDagerIPeriode = getAntallUttaksdagerITidsperiode({
        fom: dayjs(fom).toDate(),
        tom: dayjs(tom).toDate(),
    });
    const varighetString = getVarighetString(antallDagerIPeriode, intl);

    const ikonProps = {
        width: 35,
        height: 45,
        focusable: false,
        role: 'presentation',
        viewBox: '0 0 68 96',
    };

    return (
        <div className={classNames(bem.block, ikkeUttak ? bem.modifier('ikke-uttak') : bem.modifier('uttak'))}>
            <Heading level="3" size="small">
                {tittel}
            </Heading>
            <div className={bem.element('innhold')}>
                {kjønn === 'K' && !gjelderAnnenPart && <Mor1 {...ikonProps} />}
                {kjønn === 'K' && gjelderAnnenPart && <Medmor1 {...ikonProps} />}
                {kjønn === 'M' && !gjelderAnnenPart && <Far2 {...ikonProps} />}
                {kjønn === 'M' && gjelderAnnenPart && <Far1 {...ikonProps} />}
                <div className={bem.element('innhold-tekst')}>
                    <BodyShort>{`${formatDateExtended(fom!)} - ${formatDateExtended(tom!)}`}</BodyShort>
                    <BodyShort size="small">{varighetString}</BodyShort>
                    <BodyShort size="small">{navnForelder}</BodyShort>
                    {erSamtidigUttak && <BodyShort size="small">{'Er samtidig uttak med annen forelder'}</BodyShort>}
                </div>
            </div>
        </div>
    );
};

export default PeriodeFelt;
