import { PeriodeDTO } from 'app/types/Periode';
import dayjs from 'dayjs';
import { Uttaksdagen } from './Uttaksdagen';

export const slåSammenLikePerioder = (plan: PeriodeDTO[]) => {
    if (plan.length <= 0) {
        return plan;
    }

    let forrigePeriode = plan[0];
    const nyPlan: PeriodeDTO[] = [];

    plan.forEach((periode, index) => {
        if (index === 0) {
            return;
        }

        if (erPerioderLike(forrigePeriode, periode) && erPerioderSammenhengende(forrigePeriode, periode)) {
            forrigePeriode = { ...forrigePeriode, tom: periode.tom };
            return;
        } else {
            nyPlan.push(forrigePeriode);
        }

        forrigePeriode = periode;
    });

    nyPlan.push(forrigePeriode);

    return nyPlan;
};

const erPerioderSammenhengende = (p1: PeriodeDTO, p2: PeriodeDTO) => {
    const p1NesteUttaksdato = Uttaksdagen(dayjs(p1.tom).toDate()).neste();
    const p2Startdato = p2.fom;
    return dayjs(p1NesteUttaksdato).isSame(p2Startdato, 'day');
};

const erPerioderLike = (periodeA: PeriodeDTO, periodeB: PeriodeDTO) => {
    const periodeFootprintA = getPeriodeFootprint(periodeA);
    const periodeFootprintB = getPeriodeFootprint(periodeB);

    return periodeFootprintA === periodeFootprintB;
};

const getPeriodeFootprint = (periode: PeriodeDTO) => {
    const { fom, tom, ...rest } = periode;
    const sortedPeriode: any = {};

    Object.keys(rest)
        .sort()
        .filter((key) => rest[key] !== undefined)
        .forEach((key) => {
            sortedPeriode[key] = rest[key];
        });

    return JSON.stringify({ ...sortedPeriode });
};
