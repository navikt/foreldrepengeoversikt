import { Periode } from 'app/types/Periode';
import * as React from 'react';
import { NavnPåForeldre } from 'app/utils/personUtils';
import PeriodeListeItem from '../periode-liste-item/PeriodeListeItem';

interface Props {
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    periodeListe: Periode[];
    tittel: string;
}

const PeriodeListe: React.FunctionComponent<Props> = ({
    erAleneOmOmsorg,
    erFarEllerMedmor,
    navnPåForeldre,
    periodeListe = [],
    tittel,
}) => {
    return (
        <>
            <div>{tittel}</div>
            <div>
                {periodeListe &&
                    periodeListe.length > 0 &&
                    periodeListe.map((periode, index) => {
                        return (
                            <PeriodeListeItem
                                key={index}
                                periode={periode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                navnPåForeldre={navnPåForeldre}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default PeriodeListe;
