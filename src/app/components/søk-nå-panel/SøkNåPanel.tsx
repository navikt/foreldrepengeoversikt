import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { lenker } from 'app/utils/lenker';
import { redirect } from 'app/utils/redirect';
import { Kjønn } from 'app/api/types/personinfo/Kjønn';
import Person from 'app/types/Person';

interface Props {
    søker?: Person;
}

const SøkNåPanel: React.StatelessComponent<Props> = ({ søker }) => {
    return (
        <AlertStripe type="advarsel">
            <Undertittel className="blokk-s">
                <FormattedMessage id="søkNåPanel.tittel" />
            </Undertittel>
            <Normaltekst className="blokk-xs">
                <FormattedMessage id={'søkNåPanel.tekst'} />
            </Normaltekst>
            <Hovedknapp
                onClick={() =>
                    søker && søker.kjønn === Kjønn.M
                        ? redirect(lenker.søkOmForeldrepenger)
                        : redirect(lenker.hvaSøkerDu)
                }
            >
                <FormattedMessage id="søkNåPanel.søkNåButton" />
            </Hovedknapp>
        </AlertStripe>
    );
};

export default SøkNåPanel;
