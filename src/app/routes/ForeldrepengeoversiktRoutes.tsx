import React, { useEffect, useRef } from 'react';
import OversiktRoutes from './routes';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Saksoversikt from 'app/pages/saksoversikt/Saksoversikt';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { default as SakComponent } from 'app/pages/Sak';
import DinPlanPage from 'app/pages/din-plan-page/DinPlanPage';
import Forside from 'app/pages/forside/Forside';
import Header from 'app/components/header/Header';
import DokumenterPage from 'app/pages/dokumenter-page/DokumenterPage';
import Opplysninger from 'app/pages/opplysninger/Opplysninger';
import { SakOppslag } from 'app/types/SakOppslag';

import './routes-wrapper.css';
import { getAntallSaker } from 'app/utils/sakerUtils';
import MinidialogPage from 'app/pages/minidialog-page/MinidialogPage';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { AxiosError } from 'axios';
import EttersendingPage from 'app/pages/ettersending/EttersendingPage';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const ForeldrepengeoversiktRoutes: React.FunctionComponent<Props> = ({
    søkerinfo,
    saker,
    minidialogerData,
    minidialogerError,
}) => {
    const bem = bemUtils('routesWrapper');
    const hasNavigated = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasNavigated.current) {
            hasNavigated.current = true;
            const antallSaker = getAntallSaker(saker);
            const { foreldrepenger, engangsstønad, svangerskapspenger } = saker;

            if (antallSaker === 1) {
                if (foreldrepenger.length === 1) {
                    navigate(foreldrepenger[0].saksnummer);
                }

                if (engangsstønad.length === 1) {
                    navigate(engangsstønad[0].saksnummer);
                }

                if (svangerskapspenger.length === 1) {
                    navigate(svangerskapspenger[0].saksnummer);
                }
            }
        }
    }, [navigate, saker]);

    // const minidialogerIds = minidialogerData?.map((oppgave) => oppgave.dialogId);

    // const headerRouteInfo = getHeaderRouteInfo(path, minidialogerIds);

    return (
        <>
            <Header />
            <div className={bem.block}>
                <Routes>
                    <Route path="/" element={<Forside saker={saker} />} />
                    <Route path="/:saksnummer" element={<SakComponent />}>
                        <Route
                            index
                            element={
                                <Saksoversikt
                                    saker={saker}
                                    navnPåSøker={søkerinfo.søker.fornavn}
                                    minidialogerData={minidialogerData}
                                    minidialogerError={minidialogerError}
                                />
                            }
                        />
                        <Route path={OversiktRoutes.OPPLYSNINGER} element={<Opplysninger />} />
                        <Route path={OversiktRoutes.DIN_PLAN} element={<DinPlanPage />} />
                        <Route path={OversiktRoutes.DOKUMENTER} element={<DokumenterPage />} />
                        <Route
                            path=":oppgaveId"
                            element={
                                <MinidialogPage
                                    minidialoger={minidialogerData}
                                    saker={saker}
                                    fnr={søkerinfo.søker.fnr}
                                />
                            }
                        />
                        <Route path={OversiktRoutes.ETTERSEND} element={<EttersendingPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to={OversiktRoutes.HOVEDSIDE} />} />
                </Routes>
            </div>
        </>
    );
};

export default ForeldrepengeoversiktRoutes;
