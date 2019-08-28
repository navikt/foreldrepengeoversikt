import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Uttaksperiode, OppholdsÅrsak } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import UttakIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttakIkon';

import { getStønadskontoFarge, getVarighetString } from '../periodeUtils';
import PeriodeListElement from './PeriodeListElement';
import BEMHelper from 'common/util/bem';

import './periodeList.less';

interface Props {
    tittel: string;
    perioder: Uttaksperiode[];
}

// TODO utlede forelder og foreldernavn
const PeriodeList: React.FunctionComponent<Props & InjectedIntlProps> = ({ tittel, perioder, intl }) => {
    const cls = BEMHelper('periodeliste');
    return (
        <>
            <Normaltekst>{tittel}</Normaltekst>
            <ol className={cls.className}>
                {perioder.map((p) => {
                    const { stønadskontotype, trekkDager, periode, oppholdAarsak } = p;
                    return (
                        <PeriodeListElement
                            key={guid()}
                            type="periode"
                            tittel={stønadskontotype || oppholdAarsak}
                            ikon={
                                <IconBox color={getStønadskontoFarge(stønadskontotype, undefined, true)}>
                                    <UttakIkon title="uttak ikon" />
                                </IconBox>
                            }
                            beskrivelse={
                                <>
                                    {getVarighetString(trekkDager, intl)}
                                    <em className={cls.element('hvem')}> - {'foreldernavn'}</em>
                                </>
                            }
                            tidsperiode={periode}
                        />
                    );
                })}
            </ol>
        </>
    );
};

export default injectIntl(PeriodeList);
