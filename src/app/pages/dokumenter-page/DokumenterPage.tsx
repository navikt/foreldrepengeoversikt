import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import { useSetBackgroundColor } from 'app/hooks/useSetBackgroundColor';
import Dokument from 'app/sections/dokumentoversikt/Dokument';
import React from 'react';
import { Upload } from '@navikt/ds-icons';

import './dokumenter-page.css';

const DokumenterPage: React.FunctionComponent = () => {
    const bem = bemUtils('dokumenter-page');
    useSetBackgroundColor('white');

    const { dokumenterData: dokumenter, dokumenterError } = Api.useGetDokumenter();

    if (dokumenterError) {
        return <div>Vi klarte ikke å hente dokumentene for din sak</div>;
    }

    if (!dokumenter) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    return (
        <>
            <Button
                variant="secondary"
                icon={<Upload />}
                iconPosition="right"
                className={bem.element('ettersend-knapp')}
            >
                Last opp dokument
            </Button>
            {dokumenter.map((dokument, index) => {
                if (index >= 3) {
                    return null;
                }

                return <Dokument key={dokument.url} dokument={dokument} />;
            })}
            <div className={bem.element('ikke-alle-dokumenter')}>
                <BodyShort>Det er to typer dokumenter vi foreløpig ikke kan vise deg:</BodyShort>
                <ul>
                    <li>
                        <BodyShort>Papirer du har sendt til NAV i posten</BodyShort>
                    </li>
                    <li>
                        <BodyShort>
                            Dokumenter som gjelder saken din, men som er sendt av andre på vegne av deg. Det kan for
                            eksempel være en lege, advokat, verge eller fullmektig.
                        </BodyShort>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default DokumenterPage;
