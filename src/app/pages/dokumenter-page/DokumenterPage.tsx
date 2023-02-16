import { Alert, BodyLong, Heading, LinkPanel, Loader } from '@navikt/ds-react';
import { bemUtils, guid } from '@navikt/fp-common';
import Api from 'app/api/api';
import Dokument from 'app/components/dokument/Dokument';
import React from 'react';
import { grupperDokumenterPåTidspunkt } from 'app/utils/dokumenterUtils';
import GrupperteDokumenter from 'app/components/grupperte-dokumenter/GrupperteDokumenter';
import { useParams } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import { Link } from 'react-router-dom';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';

import './dokumenter-page.css';

const DokumenterPage: React.FunctionComponent = () => {
    const bem = bemUtils('dokumenter-page');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.DOKUMENTER);
    const params = useParams();

    const { dokumenterData, dokumenterError } = Api.useGetDokumenter();

    if (dokumenterError) {
        return <div>Vi klarte ikke å hente dokumentene for din sak</div>;
    }

    if (!dokumenterData) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    const dokumenterForSak = dokumenterData.filter((dok) => dok.saksnummer === params.saksnummer);

    const dokumenterGruppertPåTidspunkt = grupperDokumenterPåTidspunkt(dokumenterForSak);

    return (
        <>
            <LinkPanel
                as={Link}
                to={`../${OversiktRoutes.ETTERSEND}`}
                border={false}
                className={bem.element('ettersend')}
            >
                <LinkPanel.Title as="h2">Ettersend dokumenter</LinkPanel.Title>
            </LinkPanel>
            <div className={bem.element('dokumenter-liste')}>
                {Object.entries(dokumenterGruppertPåTidspunkt).map((dokument) => {
                    const dokumenter = dokument[1];

                    if (dokumenter.length === 1) {
                        return <Dokument key={guid()} dokument={dokumenter[0]} />;
                    } else {
                        return <GrupperteDokumenter key={guid()} dokumenter={dokumenter} />;
                    }
                })}
            </div>
            <Alert variant="info" className={bem.element('ikke-alle-dokumenter')}>
                <Heading level="3" size="small">
                    Er det noen dokumenter du savner?
                </Heading>
                <BodyLong>
                    Vi har foreløpig ikke mulighet til å vise papirer du har sendt til NAV i posten, eller dokumenter
                    som gjelder saken din, men som er sendt av andre på vegne av deg. Det kan for eksempel være en lege,
                    advokat, verge eller fullmektig.
                </BodyLong>
            </Alert>
        </>
    );
};

export default DokumenterPage;
