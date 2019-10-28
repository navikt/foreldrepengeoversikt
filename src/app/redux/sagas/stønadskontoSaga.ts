import { StønadskontoType } from 'app/api/types/UttaksplanDto';
import { all, takeEvery, call } from 'redux-saga/effects';
import Api from 'app/api/api';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { ApiActionTypes } from '../types/ApiAction';
import Sak from 'app/api/types/sak/Sak';
import { erAleneOmOmsorg } from 'app/utils/søknadsgrunnlagUtil';
import {
    getFørsteUttaksdagDato,
    opprettAktivitetsFriKonto,
    getRelevantFamiliehendelseDato,
    skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018,
    overstyrAntallTilgjengeligeUkerForBarnFørJuli2018,
    stønadskontoerDtoTilTilgjengeligStønadskontoMapper
} from 'app/utils/stønadskontoerUtils';
import { AxiosResponse } from 'axios';

export function* getTilgjengeligeStønadskontoer(sak: Sak) {
    try {
        const { perioder, saksgrunnlag } = sak;
        if (!saksgrunnlag || !perioder) {
            throw new Error('Kan ikke hente tilgjengelige stønadskontoer uten saksgrunnlag');
        }

        const {
            antallBarn,
            morHarRett,
            farMedmorHarRett,
            dekningsgrad,
            termindato,
            fødselsdato,
            omsorgsovertakelsesdato,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg,
            morErUfør
        } = saksgrunnlag.grunnlag;
        const startdatoUttak = getFørsteUttaksdagDato(perioder)!;

        const response: AxiosResponse = yield call(Api.getUttakskontoer, {
            antallBarn,
            morHarRett,
            farHarRett: farMedmorHarRett,
            dekningsgrad,
            termindato,
            fødselsdato,
            omsorgsovertakelsesdato,
            morHarAleneomsorg: morErAleneOmOmsorg,
            farHarAleneomsorg: farMedmorErAleneOmOmsorg,
            startdatoUttak
        });

        let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = stønadskontoerDtoTilTilgjengeligStønadskontoMapper(
            response.data
        );

        const annenForelderErUkjent = true;

        if (!morHarRett && !annenForelderErUkjent && !erAleneOmOmsorg(saksgrunnlag.grunnlag)) {
            tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(
                tilgjengeligeStønadskontoer,
                dekningsgrad,
                startdatoUttak
            );

            if (!morErUfør) {
                const aktivitetsFriKvoteDager = tilgjengeligeStønadskontoer.find(
                    (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote
                )!.dager;
                tilgjengeligeStønadskontoer = tilgjengeligeStønadskontoer
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
            }
        }

        return skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018(
            getRelevantFamiliehendelseDato({
                termindato,
                fødselsdato,
                omsorgsovertakelsesdato
            }),
            tilgjengeligeStønadskontoer
        )
            ? overstyrAntallTilgjengeligeUkerForBarnFørJuli2018(tilgjengeligeStønadskontoer)
            : tilgjengeligeStønadskontoer;
            
    } catch (error) {
        return undefined;
    }
}

export default function* søknadskontoerSaga() {
    yield all([takeEvery(ApiActionTypes.GET_TILGJENGELIGE_STØNADSKONTOER, getTilgjengeligeStønadskontoer)]);
}
