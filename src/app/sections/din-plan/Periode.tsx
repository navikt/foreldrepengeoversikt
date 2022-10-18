import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDateExtended, Tidsperiode } from '@navikt/fp-common';
import ForelderMorIkon from 'assets/ForelderMorIkon';
import classNames from 'classnames';
import React from 'react';

import './periode.css';

interface Props {
    tidsperiode: Tidsperiode;
    navnForelder: string;
    ikkeUttak?: boolean;
}

const Periode: React.FunctionComponent<Props> = ({ tidsperiode, navnForelder, ikkeUttak = false }) => {
    const bem = bemUtils('periode');

    return (
        <div className={classNames(bem.block, ikkeUttak ? bem.modifier('ikke-uttak') : bem.modifier('uttak'))}>
            <Heading size="small">Foreldrepenger før fødsel</Heading>
            <div className={bem.element('innhold')}>
                <ForelderMorIkon />
                <div className={bem.element('innhold-tekst')}>
                    <BodyShort>
                        {`${formatDateExtended(tidsperiode.fom)} - ${formatDateExtended(tidsperiode.tom)}`}
                    </BodyShort>
                    <BodyShort size="small">3 uker</BodyShort>
                    <BodyShort size="small">{navnForelder}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default Periode;
