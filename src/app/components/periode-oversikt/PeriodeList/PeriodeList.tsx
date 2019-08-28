import * as React from 'react';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import UttakIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttakIkon';

import PeriodeListElement from './PeriodeListElement';

import './periodeList.less';

interface Props {
    tittel: string;
    perioder: Uttaksperiode[];
}

const PeriodeList: React.FunctionComponent<Props> = ({ tittel, perioder }) => {
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
                                <IconBox color="green">
                                    <UttakIkon title="uttak ikon" />
                                </IconBox>
                            }
                            beskrivelse={'Trekkdager: ' + trekkDager}
                            tidsperiode={periode}
                        />
                    );
                })}
            </ol>
        </>
    );
};

export default PeriodeList;
