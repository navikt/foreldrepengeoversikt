import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { getData } from 'app/redux/util/fetchFromState';
import { AppState } from 'app/redux/store';
import BEMHelper from 'common/util/bem';
import Page from '../page/Page';
import CalendarIkon from 'app/components/ikoner/CalendarIkon';
import { Routes } from 'app/utils/routes';

import Person from 'app/types/Person';
import SakBase from 'app/api/types/sak/Sak';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';
import {
    finnNåværendePerioder,
    finnFremtidigePerioder,
    finnTidligerePerioder,
    getPerioderForRolle
} from 'app/utils/periodeUtils';
import OversiktBrukteDager from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { erEksisterendeSakErDeltUttak } from 'app/utils/søknadsgrunnlagUtil';
import { getResterendeStønadskontoer, getBrukteStønadskontoer } from 'app/utils/stønadskontoerUtils';
import { Rolle } from 'app/types/Rolle';
import { isFeatureEnabled, Feature } from 'app/Feature';

import { getNavnPåForeldre } from 'app/utils/søkerinfoUtils';

import { Knapp } from 'nav-frontend-knapper';
import { skalKunneSøkeOmEndring } from 'app/utils/sakerUtils';
import { redirect } from 'app/utils/redirect';
import { lenker } from 'app/utils/lenker';

import './dinPlan.less';

interface Props {
    history: History;
    søker?: Person;
    sak?: SakBase;
}

export const DinPlan: React.StatelessComponent<Props> = ({ history, sak, søker }) => {
    if (sak === undefined || søker === undefined || sak.perioder === undefined || sak.saksgrunnlag === undefined) {
        history.push(Routes.DINE_FORELDREPENGER);
        return null;
    }

    const { perioder, tilgjengeligeKontoer } = sak;
    const cls = BEMHelper('din-plan');

    return (
        <Page
            className={cls.block}
            pageTitle={<FormattedMessage id="dinPlan.pageTitle" />}
            icon={() => <CalendarIkon />}
            title={<FormattedMessage id="dinPlan.title" />}
            onBackClick={() => history.push(Routes.DINE_FORELDREPENGER)}>
            <PeriodeOversikt
                søker={søker}
                sak={sak}
                tidligerePerioder={finnTidligerePerioder(perioder!)}
                nåværendePerioder={finnNåværendePerioder(perioder!)}
                fremtidigePerioder={finnFremtidigePerioder(perioder!)}
            />

            {isFeatureEnabled(Feature.kontooveriskt) && tilgjengeligeKontoer && (
                <OversiktBrukteDager
                    resterendeStønadskonter={getResterendeStønadskontoer(tilgjengeligeKontoer, perioder)}
                    brukteStønadskontoer={{
                        mor: getBrukteStønadskontoer(getPerioderForRolle(Rolle.mor, perioder))
                            .map((k) => k.dager)
                            .reduce((a, b) => a + b, 0),
                        farMedmor: getBrukteStønadskontoer(getPerioderForRolle(Rolle.farMedmor, perioder))
                            .map((k) => k.dager)
                            .reduce((a, b) => a + b, 0)
                    }}
                    erDeltUttak={erEksisterendeSakErDeltUttak(sak.saksgrunnlag.grunnlag)}
                    erFarMedmor={sak.saksgrunnlag.grunnlag.søkerErFarEllerMedmor}
                    navnPåForeldre={getNavnPåForeldre(sak, søker)}
                />
            )}
            {skalKunneSøkeOmEndring(sak) && (
                <div className={cls.element('endringssoknad-btn')}>
                    <Knapp onClick={() => redirect(lenker.endringssøknad)}>
                        <FormattedMessage
                            id="saksoversikt.content.endringssøknad.button"
                            values={{ erEndringssøknad: true }}
                        />
                    </Knapp>
                </div>
            )}
        </Page>
    );
};

const mapStateToProps = (state: AppState, ownProps: Props) => {
    const params = new URLSearchParams(ownProps.history.location.search);
    return {
        søker: getData(state.api.søkerinfo, {}).person,
        sak: getData(state.api.saker, []).find((saker) => saker.saksnummer === params.get('saksnummer'))
    };
};

export default connect(mapStateToProps)(DinPlan);
