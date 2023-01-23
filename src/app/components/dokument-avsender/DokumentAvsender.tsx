import { bemUtils } from '@navikt/fp-common';
import { DokumentType } from 'app/types/DokumentType';
import React from 'react';

import './dokument-avsender.css';

interface Props {
    type: DokumentType;
}

const getAvsender = (type: DokumentType) => {
    return type === DokumentType.INNGÅENDE_DOKUMENT ? 'Du' : 'NAV';
};

const DokumentAvsender: React.FunctionComponent<Props> = ({ type }) => {
    const bem = bemUtils('dokument-avsender');

    return <div className={bem.block}>{getAvsender(type)}</div>;
};

export default DokumentAvsender;
