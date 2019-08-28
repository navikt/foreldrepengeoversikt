import * as React from 'react';
import { Uttaksperiode, StønadskontoType } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import UttakIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/UttakIkon';

import PeriodeListElement from './PeriodeListElement';
import { UttaksplanColor } from 'app/types/uttaksplan/colors';
import { Forelder } from 'app/types';

import './periodeList.less';

interface Props {
    tittel: string;
    perioder: Uttaksperiode[];
}

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    forIkon?: boolean
): UttaksplanColor => {
    if (forIkon && (konto === StønadskontoType.Fellesperiode || konto === StønadskontoType.Flerbarnsdager)) {
        return UttaksplanColor.purpleBlue;
    }

    if (forelder === undefined) {
        switch (konto) {
            case StønadskontoType.Fedrekvote:
            case StønadskontoType.AktivitetsfriKvote:
                return UttaksplanColor.blue;
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.Foreldrepenger:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return UttaksplanColor.purple;
            case StønadskontoType.Fellesperiode:
            case StønadskontoType.Flerbarnsdager:
                return UttaksplanColor.purpleBlue;
            default:
                return UttaksplanColor.transparent;
        }
    }
    return forelder === Forelder.mor ? UttaksplanColor.purple : UttaksplanColor.blue;
};

// TODO utlede forelder
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
                                <IconBox color={getStønadskontoFarge(stønadskontotype, undefined, true)}>
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
