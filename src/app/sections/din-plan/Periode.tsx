import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { getAntallUttaksdagerITidsperiode, getVarighetString } from 'app/utils/dateUtils';
import { isUtsettelsesperiode, isUttaksperiode } from 'app/utils/periodeUtils';
import ForelderMorIkon from 'assets/ForelderMorIkon';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

import './periode.css';

interface Props {
    ikkeUttak?: boolean;
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

const Periode: React.FunctionComponent<Props> = ({ periode, navnForelder, ikkeUttak = false }) => {
    const bem = bemUtils('periode');
    const intl = useIntl();
    const { fom, tom } = periode;
    const tittel = getPeriodeTittel(periode);
    const antallDagerIPeriode = getAntallUttaksdagerITidsperiode({
        fom: dayjs(periode.fom).toDate(),
        tom: dayjs(periode.tom).toDate(),
    });
    const varighetString = getVarighetString(antallDagerIPeriode, intl);

    return (
        <div className={classNames(bem.block, ikkeUttak ? bem.modifier('ikke-uttak') : bem.modifier('uttak'))}>
            <Heading level="3" size="small">
                {tittel}
            </Heading>
            <div className={bem.element('innhold')}>
                <ForelderMorIkon />
                <div className={bem.element('innhold-tekst')}>
                    <BodyShort>{`${formatDateExtended(fom)} - ${formatDateExtended(tom)}`}</BodyShort>
                    <BodyShort size="small">{varighetString}</BodyShort>
                    <BodyShort size="small">{navnForelder}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default Periode;
