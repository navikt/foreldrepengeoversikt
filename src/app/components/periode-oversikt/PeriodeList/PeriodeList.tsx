import * as React from 'react';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import PeriodeListElement from './PeriodeListElement';
import { Normaltekst } from 'nav-frontend-typografi';

import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import UttakIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttakIkon';

import './periodeList.less';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    tittel: string;
    perioder: Uttaksperiode[];
}

const PeriodeList: React.FunctionComponent<Props> = ({ tittel, perioder }) => {
    return (
        <>
            <Normaltekst>{tittel}</Normaltekst>
            <ol className="periodeliste">
                {perioder.map((periode) => (
                    <PeriodeListElement
                        key={guid()}
                        type="periode"
                        tittel={periode.stønadskontotype}
                        ikon={
                            <IconBox color="green">
                                <UttakIkon title="uttak ikon" />
                            </IconBox>
                        }
                        beskrivelse={'Trekkdager: ' + periode.trekkDager}
                        tidsperiode={periode ? periode.periode : undefined}
                    />
                ))}
            </ol>
        </>
    );
};

export default PeriodeList;
