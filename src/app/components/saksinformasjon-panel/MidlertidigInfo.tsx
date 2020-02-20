import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

interface Props {
    erArbeidstaker: boolean;
}

const MidlertidigInfo: React.FunctionComponent<Props> = ({ erArbeidstaker }) => {
    return erArbeidstaker ? (
        <>
            <AlertStripe type="info">
                <Element>Du får svar på søknaden tidligst 4 uker før foreldrepengeperioden din starter</Element>
                <FormattedMessage id="SLETTMEG.arbeidstaker" />
            </AlertStripe>
        </>
    ) : (
        <>
            <AlertStripe type="info">
                <Element>Du får svar på søknaden tidligst 4 uker før foreldrepengeperioden din starter</Element>
                <FormattedMessage id="SLETTMEG.ikkeArbeidstaker" />
            </AlertStripe>
        </>
    );
};

export default MidlertidigInfo;
