import ContentSection from 'app/components/content-section/ContentSection';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { Ytelse } from 'app/types/Ytelse';
import React from 'react';

interface Props {
    navnPåSøker: string;
}

const DinPlanPage: React.FunctionComponent<Props> = ({ navnPåSøker }) => {
    //const bem = bemUtils('din-plan-page');
    useSetSelectedRoute(OversiktRoutes.DIN_PLAN);
    const sak = useGetSelectedSak();

    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        return (
            <ContentSection heading="Din plan">
                <DinPlan sak={sak} visHelePlanen={true} navnPåSøker={navnPåSøker}></DinPlan>
            </ContentSection>
        );
    }
    return <div></div>;
};

export default DinPlanPage;
