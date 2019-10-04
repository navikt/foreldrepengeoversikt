import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { lenker } from 'app/utils/lenker';
import { redirect } from 'app/utils/redirect';
import Personinfo from 'app/api/types/personinfo/Personinfo';
import { Kjønn } from 'app/api/types/personinfo/Kjønn';

interface Props {
    søker?: Personinfo;
}

const SøkNåPanel: React.StatelessComponent<Props> = ({ søker }) => {
    return (
        <AlertStripe type="advarsel">
            <Undertittel className="blokk-s">
                <FormattedMessage id="søkNåPanel.tittel" />
            </Undertittel>
            <Normaltekst className="blokk-xs">
                <FormattedMessage
                    id={'søkNåPanel.tekst'}
                />
            </Normaltekst>
            <Hovedknapp
                onClick={() =>
                    søker && søker.kjønn === Kjønn.K
                        ? redirect(lenker.skjemaveileder)
                        : redirect(lenker.søkOmForeldrepenger)
                }>
                <FormattedMessage id="søkNåPanel.søkNåButton" />
            </Hovedknapp>
        </AlertStripe>
    );
};

export default SøkNåPanel;
