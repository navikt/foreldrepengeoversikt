import React from 'react';
import Panel from 'nav-frontend-paneler';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../../utils/lenker';
import Environment from 'app/Environment';
import { SakBase } from 'app/api/types/sak/Sak';
import KlageIkon from '../ikoner/KlageIkon';
import SpørsmålIkon from '../ikoner/SpørsmålIkon';

import './spørsmålEllerKlage.less';
import { erForeldrepengesak, erSvangerskapepengesak } from 'app/utils/sakerUtils';

interface SpørsmålEllerKlageProps {
    sak: SakBase;
}

const SpørsmålEllerKlage: React.FunctionComponent<SpørsmålEllerKlageProps> = ({ sak }) => {
    const getStønadstype = () => {
        if (erForeldrepengesak(sak)) {
            return 'foreldrepenger';
        }

        if (erSvangerskapepengesak(sak)) {
            return 'svangerskapspenger';
        }

        return 'engangsstønad';
    };

    return (
        <Panel>
            <div className="container">
                <SpørsmålIkon />
                <div>
                    <Undertittel tag="h2" className="blokk-m">
                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.spørsmål.tittel" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage
                            id="saksoversikt.spårsmålEllerKlage.spørsmål.text"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.skrivTilOss}>
                                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.spørsmål.text.lenke" />
                                    </Lenke>
                                ),
                                andreLenke: (
                                    <Lenke href={lenker.kontaktOss}>
                                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.spørsmål.text.andreLenke" />
                                    </Lenke>
                                ),
                            }}
                        ></FormattedMessage>
                    </Normaltekst>
                </div>
            </div>
            <div className="separator" />
            <div className="container">
                <KlageIkon />
                <div>
                    <Undertittel tag="h2" className="blokk-m">
                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.klage.tittel" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage
                            id="saksoversikt.spårsmålEllerKlage.klage.text"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.klageRettigheter}>
                                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.klage.text.lenke" />
                                    </Lenke>
                                ),
                                andreLenke: (
                                    <Lenke
                                        href={`${Environment.KLAGE_URL}/?saksnummer=${sak.saksnummer}&tema=FOR&ytelse=${getStønadstype}`}
                                    >
                                        <FormattedMessage id="saksoversikt.spårsmålEllerKlage.klage.text.andreLenke" />
                                    </Lenke>
                                ),
                            }}
                        ></FormattedMessage>
                    </Normaltekst>
                </div>
            </div>
        </Panel>
    );
};

export default SpørsmålEllerKlage;
