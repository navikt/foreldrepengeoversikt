import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import classnames from 'classnames';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';

import BEMHelper from '../old/common/util/bem';
import UttakIkon from '../old/components/ikoner/UttakIkon';
import { Rolle } from 'app/types/Rolle';
import Periode from 'app/types/uttaksplan/Periode';
import { getVarighetString } from 'app/utils/periodeUtils';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { NavnPåForeldre } from '../old/common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { Tidsperiode } from 'app/types/Tidsperiode';

import './periodeListElement.less';

interface Props {
    isOpen?: boolean;
    tittel: string | React.ReactNode;
    ikon: React.ReactNode | undefined;
    beskrivelse?: string | React.ReactNode;
    melding?: string;
    tidsperiode?: Tidsperiode;
    annenForelderSamtidigUttakPeriode?: Periode;
    navnPåForeldre?: NavnPåForeldre;
    beskrivelseSamtidigUttak?: React.ReactNode;
    color: UttaksplanColor;
}

const BEM = BEMHelper('periodelisteItemHeader');
const renderDagMnd = (dato: string, visÅr = true): JSX.Element => {
    const d = moment.utc(dato);
    return dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {d.get('date')}. {d.format('MMM')}
            </span>
            {visÅr && (
                <Normaltekst tag="span" className={BEM.element('dagmnd__mnd')}>
                    <abbr title={`${d.format('MMM')} ${d.format('YYYY')}`}>{d.format('YYYY')}</abbr>
                </Normaltekst>
            )}
        </div>
    ) : (
        <div className={BEM.element('dagmnd')}>-</div>
    );
};

const PeriodeListElement: React.FunctionComponent<Props> = ({
    ikon,
    tittel,
    beskrivelse,
    melding,
    tidsperiode,
    annenForelderSamtidigUttakPeriode,
    navnPåForeldre,
    color,
}) => {
    const intl = useIntl();

    return (
        <li className={classnames(BEM.block, 'typo-normal', BEM.modifier(color))}>
            <div className={BEM.element('main-content')}>
                <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                    {ikon}
                </div>
                <div className={BEM.element('beskrivelse')}>
                    <div className={BEM.element('beskrivelse__tekst')}>
                        <Element tag="h1">{tittel}</Element>
                        {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
                    </div>
                </div>
                {melding && (
                    <div className={BEM.element('advarsel')}>
                        <span role="presentation">
                            <UttakIkon />
                        </span>
                    </div>
                )}
                {tidsperiode && (
                    <div className={BEM.element('tidsrom')}>
                        {renderDagMnd(tidsperiode.fom)}
                        {renderDagMnd(tidsperiode.tom)}
                    </div>
                )}
            </div>
            {annenForelderSamtidigUttakPeriode && (
                <div
                    className={classnames(BEM.element('samtidig-uttak'), {
                        [BEM.modifier('samtidig-uttak-mor')]: annenForelderSamtidigUttakPeriode.forelder === Rolle.mor,
                        [BEM.modifier('samtidig-uttak-far')]:
                            annenForelderSamtidigUttakPeriode.forelder === Rolle.farMedmor,
                    })}
                >
                    <div>
                        <Element>
                            <FormattedMessage id="morsAktivitet.SamtidigUttak" />
                        </Element>
                    </div>
                    <div className={BEM.element('beskrivelse')}>
                        <div className={BEM.element('beskrivelse__tekst')}>
                            <Normaltekst>
                                <>
                                    {getVarighetString(annenForelderSamtidigUttakPeriode.antallUttaksdager, intl)}
                                    <em className={BEM.element('hvem')}>
                                        {' '}
                                        -{' '}
                                        {annenForelderSamtidigUttakPeriode.forelder === Rolle.mor
                                            ? navnPåForeldre!.mor
                                            : navnPåForeldre!.farMedmor}
                                    </em>
                                </>
                            </Normaltekst>
                        </div>
                    </div>
                    {annenForelderSamtidigUttakPeriode.tidsperiode && (
                        <div className={BEM.element('tidsrom')}>
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.fom, false)}
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.tom, false)}
                        </div>
                    )}
                </div>
            )}
        </li>
    );
};

export default PeriodeListElement;
