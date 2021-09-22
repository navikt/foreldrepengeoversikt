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
    overstyrAntallTilgjengeligeUttaksdagerForBarnFørJuli2018,
    stønadskontoerDtoTilTilgjengeligStønadskontoMapper,
    justerTilgjengeligeStøndakontoerNårMorIkkeHarRettOgIkkeErUfør,
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
            morErUfør,
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
            startdatoUttak,
        });

        let tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = stønadskontoerDtoTilTilgjengeligStønadskontoMapper(
            response.data
        );

        const annenForelderErUkjent = sak.annenPart === undefined;

        if (!morHarRett && !annenForelderErUkjent && !erAleneOmOmsorg(saksgrunnlag.grunnlag)) {
            tilgjengeligeStønadskontoer = opprettAktivitetsFriKonto(
                tilgjengeligeStønadskontoer,
                dekningsgrad,
                startdatoUttak
            );

            if (!morErUfør) {
                tilgjengeligeStønadskontoer = justerTilgjengeligeStøndakontoerNårMorIkkeHarRettOgIkkeErUfør(
                    tilgjengeligeStønadskontoer
                );
            }
        }

        return skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018(
            getRelevantFamiliehendelseDato(saksgrunnlag.grunnlag),
            tilgjengeligeStønadskontoer
        )
            ? overstyrAntallTilgjengeligeUttaksdagerForBarnFørJuli2018(tilgjengeligeStønadskontoer)
            : tilgjengeligeStønadskontoer;
    } catch (error) {
        return undefined;
    }
}

export default function* søknadskontoerSaga() {
    yield all([takeEvery(ApiActionTypes.GET_TILGJENGELIGE_STØNADSKONTOER, getTilgjengeligeStønadskontoer)]);
}
