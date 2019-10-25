import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import moment from 'moment';

import BEMHelper from 'common/util/bem';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import AnnenPart from 'app/api/types/sak/AnnenPart';
import { Rolle } from 'app/types/Rolle';
import Periode from 'app/types/uttaksplan/Periode';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/periodeUtils';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';

import './periodeListElement.less';

interface Props {
    isOpen?: boolean;
    tittel: string | React.ReactNode;
    ikon: React.ReactNode | undefined;
    beskrivelse?: string | React.ReactNode;
    melding?: string;
    tidsperiode?: any;
    annenPart?: AnnenPart;
    annenForelderSamtidigUttakPeriode?: Periode;
    beskrivelseSamtidigUttak?: React.ReactNode;
    color: UttaksplanColor;
}

const BEM = BEMHelper('periodelisteItemHeader');
const renderDagMnd = (dato: string, visÅr: boolean = true): JSX.Element => {
    const d = moment.utc(dato);
    return dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {d.get('date')}. {d.format('MMM')}
            </span>
            {visÅr && (
                <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
                    <abbr title={`${d.format('MMM')} ${d.format('YYYY')}`}>{d.format('YYYY')}</abbr>
                </EtikettLiten>
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
    annenPart,
    annenForelderSamtidigUttakPeriode,
    color
}) => {
    return (
        <li className={classnames(BEM.className, 'typo-normal', BEM.modifier(color))}>
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
                    className={classnames(BEM.element('samtidig-uttak'), BEM.modifier(color), {
                        [BEM.modifier('samtidig-uttak-mor')]: annenForelderSamtidigUttakPeriode.forelder === Rolle.mor,
                        [BEM.modifier('samtidig-uttak-far')]:
                            annenForelderSamtidigUttakPeriode.forelder === Rolle.farMedmor
                    })}>
                    <div>
                        <Element>
                            <FormattedMessage id="morsAktivitet.SamtidigUttak" />
                        </Element>
                    </div>
                    <div className={BEM.element('beskrivelse')}>
                        <div className={BEM.element('beskrivelse__tekst')}>
                            <Normaltekst>
                                <>
                                    {getAntallUttaksdagerITidsperiode(annenForelderSamtidigUttakPeriode.tidsperiode)}
                                    <em className={BEM.element('hvem')}>
                                        {' '}
                                        -{' '}
                                        {annenPart ? (
                                            annenPart.navn.fornavn
                                        ) : (
                                            <FormattedMessage id="denAndreForelderen" />
                                        )}
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
