import { Gradering } from './Gradering';
import { PeriodeResultat } from './PeriodeResultat';
import { StønadskontoType } from './StønadskontoType';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';
import { MorsAktivitet } from './MorsAktivitet';
import dayjs from 'dayjs';
import { isValidTidsperiode } from 'app/utils/periodeUtils';

export const Tidsperioden = (tidsperiode: Tidsperiode) => ({
    inneholderDato: (dato: Date) => inneholderTidsperiodeDato(tidsperiode, dato),
    erOmsluttetAv: (tidsperiode2: Tidsperiode) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
});

function erTidsperiodeOmsluttetAvTidsperiode(tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isSameOrAfter(tidsperiode2.fom) &&
            dayjs(tidsperiode1.tom).isSameOrBefore(tidsperiode2.tom)
        );
    }
    return false;
}

function inneholderTidsperiodeDato(tidsperiode: Tidsperiode, dato: Date): boolean {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return false;
    }

    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
}

export interface Tidsperiode {
    fom: Date | undefined;
    tom: Date | undefined;
}
export interface Periode {
    angittAvAnnenPart?: boolean;
    flerbarnsdager: boolean;
    fom: string;
    gradering?: Gradering;
    kontoType: StønadskontoType;
    morsAktivitet?: MorsAktivitet;
    oppholdÅrsak?: OppholdÅrsakType;
    overføringÅrsak?: OverføringÅrsakType;
    resultat: PeriodeResultat;
    samtidigUttak?: number;
    tom: string;
    utsettelseÅrsak?: UtsettelseÅrsakType;
}

export interface PeriodeForVisning extends Omit<Periode, 'fom' | 'tom'> {
    erSamtidigUttak?: boolean;
    erVedtatt: boolean;
    gjelderAnnenPart: boolean;
    id: string;
    tidsperiode: Tidsperiode;
}
