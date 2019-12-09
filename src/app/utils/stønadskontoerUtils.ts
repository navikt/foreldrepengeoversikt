import moment from 'moment';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { StønadskontoType, UttaksplanGrunnlagDto } from 'app/api/types/UttaksplanDto';
import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { StønadskontoerDTO } from 'app/api/types/stønadskontoerDto';
import cloneDeep from 'lodash/cloneDeep';
import { ANTALL_UTTAKSDAGER_PR_UKE, ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 } from './constants';
import { Rolle } from 'app/types/Rolle';
import { getPerioderForRolle } from './periodeUtils';

export const skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018 = (
    familiehendelsesdato: string,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): boolean => {
    const harKontoerSomErBerørt = tilgjengeligeStønadskontoer.some(
        ({ konto }) => konto === StønadskontoType.Mødrekvote
    );
    return harKontoerSomErBerørt && moment(familiehendelsesdato).isBefore('2018-07-01', 'days');
};

export const overstyrAntallTilgjengeligeUttaksdagerForBarnFørJuli2018 = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    const mødrekvote = getTilgjengeligStønadskonto(tilgjengeligeStønadskontoer, StønadskontoType.Mødrekvote);
    const fedrekvote = getTilgjengeligStønadskonto(tilgjengeligeStønadskontoer, StønadskontoType.Fedrekvote);

    return tilgjengeligeStønadskontoer.map((konto) => {
        if (konto.konto === StønadskontoType.Fedrekvote || konto.konto === StønadskontoType.Mødrekvote) {
            return {
                konto: konto.konto,
                dager: ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 * ANTALL_UTTAKSDAGER_PR_UKE
            };
        }
        if (konto.konto === StønadskontoType.Fellesperiode) {
            return {
                konto: konto.konto,
                dager:
                    konto.dager +
                    beregnEkstraDagerForBarnFødtFørJuli2018(fedrekvote!) +
                    beregnEkstraDagerForBarnFødtFørJuli2018(mødrekvote!)
            };
        }
        return konto;
    });
};

const beregnEkstraDagerForBarnFødtFørJuli2018 = (tilgjengligKonto: TilgjengeligStønadskonto) => {
    return tilgjengligKonto!.dager - ANTALL_TILGJENGELIGE_UKER_MED_UTTAK_FØR_JULI_2018 * ANTALL_UTTAKSDAGER_PR_UKE;
};

export const getTilgjengeligStønadskonto = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    støndaskontotype: StønadskontoType
) => {
    return tilgjengeligeStønadskontoer.find(({ konto }) => konto === støndaskontotype);
};

export const getFørsteUttaksdagDato = (perioder: Periode[]): string | undefined => {
    const førsteUttaksperiode = perioder.find((p) => p.type === PeriodeType.Uttak);
    return førsteUttaksperiode ? førsteUttaksperiode.tidsperiode.fom : undefined;
};

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
    fødselsdato,
    termindato,
    omsorgsovertakelsesdato
}: UttaksplanGrunnlagDto): string => {
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

export const justerTilgjengeligeStøndakontoerNårMorIkkeHarRettOgIkkeErUfør = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    const aktivitetsFriKvoteDager = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote
    )!.dager;

    return tilgjengeligeStønadskontoer
        .map((konto) => {
            if (konto.konto === StønadskontoType.AktivitetsfriKvote) {
                konto.dager = 0;
            }

            if (konto.konto === StønadskontoType.Foreldrepenger) {
                konto.dager = konto.dager + aktivitetsFriKvoteDager;
            }

            return konto;
        })
        .filter((konto) => konto.dager !== 0);
};

export const getTotaltBrukteDager = (rolle: Rolle, perioder: Periode[]) => {
    return getBrukteStønadskontoer(getPerioderForRolle(rolle, perioder))
        .map((k) => k.dager)
        .reduce((a, b) => a + b, 0);
};
