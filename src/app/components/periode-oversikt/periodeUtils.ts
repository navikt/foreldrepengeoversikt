import moment from 'moment';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Tidsperiode } from 'app/types/Tidsperiode';
import _ from 'lodash';

const ANTALL_UTTAKSDAGER_PR_UKE: number = 5;

export const finnTidligerePerioder = (perioder: Uttaksperiode[]): Uttaksperiode[] => {
    return perioder.filter((periode) => moment(periode.periode.tom).isBefore(moment()));
};

export const finnNåværendePerioder = (perioder: Uttaksperiode[]): Uttaksperiode[] => {
    return perioder.filter((periode) => moment().isBetween(periode.periode.fom, periode.periode.tom));
};

export const finnFremtidigePerioder = (perioder: Uttaksperiode[]): Uttaksperiode[] => {
    return perioder.filter((periode) => moment(periode.periode.fom).isAfter(moment()));
};

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / ANTALL_UTTAKSDAGER_PR_UKE);
    return {
        dager: dager - uker * ANTALL_UTTAKSDAGER_PR_UKE,
        uker
    };
};

export const slåSammenLikeOgSammenhengendeUttaksperioder = (uttaksperioder: Uttaksperiode[]): Uttaksperiode[] => {
    return uttaksperioder.reduce((uttaksperiodeAccumulator: Uttaksperiode[], uttaksperiode, index) => {
        const previousUttaksperiode = uttaksperiodeAccumulator[index - 1];
        if (skalKunneSlåSammenUttaksperioer(previousUttaksperiode, uttaksperiode)) {
            uttaksperiodeAccumulator.pop();
            uttaksperiodeAccumulator.push({
                ...previousUttaksperiode,
                periode: {
                    ...previousUttaksperiode.periode,
                    tom: uttaksperiode.periode.tom
                }
            });
        } else {
            uttaksperiodeAccumulator.push(uttaksperiode);
        }
        return uttaksperiodeAccumulator;
    }, []);
};

export const skalKunneSlåSammenUttaksperioer = (
    uttaksperiode1?: Uttaksperiode,
    uttaksperiode2?: Uttaksperiode
): boolean => {
    return uttaksperiode1 === undefined || uttaksperiode2 === undefined
        ? false
        : erSammenhengende(uttaksperiode1.periode, uttaksperiode2.periode) && erLike(uttaksperiode1, uttaksperiode2);
};

export const erSammenhengende = (tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean => {
    return finnNesteMuligeUttaksdag(tidsperiode1.tom) === tidsperiode2.fom;
};

const erLike = (uttaksperiode1: Uttaksperiode, uttaksperiode2: Uttaksperiode): boolean => {
    return _.isEqual(
        getRelevanteFelterForSammenligning(uttaksperiode1),
        getRelevanteFelterForSammenligning(uttaksperiode2)
    );
};

const getRelevanteFelterForSammenligning = (uttaksperiode: Uttaksperiode) => {
    const { periode, trekkDager, ...relevanteFelter } = uttaksperiode;
    return relevanteFelter;
};

const finnNesteMuligeUttaksdag = (dato: string): string => {
    return moment(dato).isoWeekday() >= 6
        ? moment(dato)
              .add(1, 'weeks')
              .startOf('isoWeek')
              .format('YYYY-MM-DD')
        : moment(dato)
              .add(1, 'days')
              .format('YYYY-MM-DD');
};
