import * as React from 'react';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import UttakIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttakIkon';

import PeriodeListElement from './PeriodeListElement';
import { getStønadskontoFarge, getVarighetString } from '../periodeUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './periodeList.less';

interface Props {
    tittel: string;
    perioder: Uttaksperiode[];
}

// TODO utlede forelder
const PeriodeList: React.FunctionComponent<Props & InjectedIntlProps> = ({ tittel, perioder, intl }) => {
    return (
        <>
            <Normaltekst>{tittel}</Normaltekst>
            <ol className="periodeliste">
                {perioder.map((p) => {
                    const { stønadskontotype, trekkDager, periode } = p;
                    return (
                        <PeriodeListElement
                            key={guid()}
                            type="periode"
                            tittel={stønadskontotype}
                            ikon={
                                <IconBox color={getStønadskontoFarge(stønadskontotype, undefined, true)}>
                                    <UttakIkon title="uttak ikon" />
                                </IconBox>
                            }
                            beskrivelse={getVarighetString(trekkDager, intl)}
                            tidsperiode={periode}
                        />
                    );
                })}
            </ol>
        </>
    );
};

export default injectIntl(PeriodeList);
