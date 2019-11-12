import moment from 'moment';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { StønadskontoType } from 'app/api/types/UttaksplanDto';
import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { StønadskontoerDTO } from 'app/api/types/stønadskontoerDto';
import cloneDeep from 'lodash/cloneDeep';
import { ANTALL_UTTAKSDAGER_PR_UKE, ANTALL_TILGJENGELIGE_UKER_FØR_JULI as ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 } from './constants';

export const skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018 = (
    familiehendelsesdato: string,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): boolean => {
    const harKontoerSomErBerørt = tilgjengeligeStønadskontoer.find((ts) => ts.konto === StønadskontoType.Mødrekvote);
    return harKontoerSomErBerørt !== undefined && moment(familiehendelsesdato).isBefore('2018-07-01', 'days');
};

export const overstyrAntallTilgjengeligeUttaksdagerForBarnFørJuli2018 = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    const mødrekvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Mødrekvote);
    const fedrekvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fedrekvote);

    const ekstraMødrekvoteDager = mødrekvote!.dager - ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 * ANTALL_UTTAKSDAGER_PR_UKE;
    const ekstraFedrekvoteDager = fedrekvote!.dager - ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 * ANTALL_UTTAKSDAGER_PR_UKE;

    return tilgjengeligeStønadskontoer.map((konto) => {
        if (konto.konto === StønadskontoType.Fedrekvote || konto.konto === StønadskontoType.Mødrekvote) {
            return {
                konto: konto.konto,
                dager: ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 * ANTALL_UTTAKSDAGER_PR_UKE
            };
        } else if (konto.konto === StønadskontoType.Fellesperiode) {
            return {
                konto: konto.konto,
                dager: konto.dager + ekstraFedrekvoteDager + ekstraMødrekvoteDager
            };
        } else {
            return konto;
        }
    });
};

export const getFørsteUttaksdagDato = (perioder: Periode[]): string | undefined => {
    const førsteUttaksperiode = perioder.find((p) => p.type === PeriodeType.Uttak);
    return førsteUttaksperiode ? førsteUttaksperiode.tidsperiode.fom : undefined;
};

export interface FamiliehendelseDatoer {
    fødselsdato: string | undefined;
    termindato: string | undefined;
    omsorgsovertakelsesdato: string | undefined;
}

export const getAktivitetsFrieUkerForeldrepenger = (dekningsgrad: Dekningsgrad, startdatoUttak: string): number => {
    if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
        return 15;
    }
    return moment(startdatoUttak).isBefore(moment('2019-01-01')) ? 15 : 19;
};

export const opprettAktivitetsFriKonto = (
    kontoer: TilgjengeligStønadskonto[],
    dekningsgrad: Dekningsgrad,
    startdatoUttak: string
): TilgjengeligStønadskonto[] => {
    const nyeKontoer: TilgjengeligStønadskonto[] = [];
    const aktivitetskravFrieDagerForeldrepenger =
        getAktivitetsFrieUkerForeldrepenger(dekningsgrad, startdatoUttak) * ANTALL_UTTAKSDAGER_PR_UKE;
    nyeKontoer.push({ ...kontoer[0], dager: kontoer[0].dager - aktivitetskravFrieDagerForeldrepenger });
    nyeKontoer.push({ konto: StønadskontoType.AktivitetsfriKvote, dager: aktivitetskravFrieDagerForeldrepenger });
    return nyeKontoer;
};

export const getRelevantFamiliehendelseDato = ({
    termindato,
    fødselsdato,
    omsorgsovertakelsesdato
}: FamiliehendelseDatoer): string => {
    if (fødselsdato) {
        return fødselsdato;
    }
    return termindato ? termindato : omsorgsovertakelsesdato!;
};

export const stønadskontoerDtoTilTilgjengeligStønadskontoMapper = (
    stønadskontoerDto: StønadskontoerDTO
): TilgjengeligStønadskonto[] => {
    return Object.keys(stønadskontoerDto.kontoer)
        .filter((konto: StønadskontoType) => konto !== StønadskontoType.Flerbarnsdager)
        .map((konto) => ({
            konto: konto as StønadskontoType,
            dager: stønadskontoerDto.kontoer[konto]
        }));
};

export const getResterendeStønadskontoer = (
    tilgjengeligeKontoer: TilgjengeligStønadskonto[],
    perioder: Periode[]
): TilgjengeligStønadskonto[] => {
    return getBrukteStønadskontoer(perioder).reduce(
        (resterndeKontoer: TilgjengeligStønadskonto[], bruktKonto: TilgjengeligStønadskonto) => {
            const kontoIndex = resterndeKontoer.findIndex(({ konto }) => konto === bruktKonto.konto);
            if (kontoIndex >= 0) {
                resterndeKontoer[kontoIndex].dager -= bruktKonto.dager;
            }
            return resterndeKontoer;
        },
        cloneDeep(tilgjengeligeKontoer)
    );
};

export const getBrukteStønadskontoer = (perioder: Periode[]): TilgjengeligStønadskonto[] => {
    return perioder
        .filter(({ type }) => type === PeriodeType.Uttak)
        .map((periode: Uttaksperiode) => ({
            konto: periode.stønadskontotype,
            dager: periode.antallUttaksdager
        }))
        .reduce((brukteStønadskontoer: TilgjengeligStønadskonto[], brukteDager: TilgjengeligStønadskonto) => {
            const kontoIndex = brukteStønadskontoer.findIndex(({ konto }) => konto === brukteDager.konto);
            kontoIndex >= 0
                ? (brukteStønadskontoer[kontoIndex].dager += brukteDager.dager)
                : brukteStønadskontoer.push(brukteDager);

            return brukteStønadskontoer;
        }, []);
};
