import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../../utils/lenker';
import Environment from 'app/Environment';
import { SakBase } from 'app/api/types/sak/Sak';
import { erForeldrepengesak, erSvangerskapepengesak } from 'app/utils/sakerUtils';
import BEMHelper from 'common/util/bem';
import SpørsmålIkon from '../ikoner/SpørsmålIkon';
import KlageIkon from '../ikoner/KlageIkon';

import './infoOmKlage.less';

interface Props {
    sak: SakBase;
}

const InfoOmKlage: React.FunctionComponent<Props> = ({ sak }) => {
    const getStønadstype = () => {
        if (erForeldrepengesak(sak)) {
            return 'foreldrepenger';
        }

        if (erSvangerskapepengesak(sak)) {
            return 'svangerskapspenger';
        }

        return 'engangsstønad';
    };

    const bem = BEMHelper('infoOmKlage');

    return (
        <div style={{ backgroundColor: 'white', padding: '2rem' }}>
            <div className={bem.element('container')}>
                <div className={bem.element('ikon')}>
                    <SpørsmålIkon />
                </div>
                <div>
                    <Undertittel className="blokk-xs">
                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.spørsmål.tittel" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage
                            id="saksoversikt.spørsmålEllerKlage.spørsmål.text"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.skrivTilOss}>
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.spørsmål.text.lenke" />
                                    </Lenke>
                                ),
                                andreLenke: (
                                    <Lenke href={lenker.kontaktOss}>
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.spørsmål.text.andreLenke" />
                                    </Lenke>
                                ),
                            }}
                        ></FormattedMessage>
                    </Normaltekst>
                </div>
            </div>
            <hr />
            <div className={bem.element('container')}>
                <div className={bem.element('ikon')}>
                    <KlageIkon />
                </div>
                <div>
                    <Undertittel className="blokk-xs">
                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.klage.tittel" />
                    </Undertittel>
                    <Normaltekst>
                        <FormattedMessage
                            id="saksoversikt.spørsmålEllerKlage.klage.text"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.klageRettigheter}>
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.klage.text.lenke" />
                                    </Lenke>
                                ),
                                andreLenke: (
                                    <Lenke
                                        href={`${Environment.KLAGE_URL}/?saksnummer=${
                                            sak.saksnummer
                                        }&tema=FOR&ytelse=${getStønadstype()}`}
                                    >
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.klage.text.andreLenke" />
                                    </Lenke>
                                ),
                            }}
                        ></FormattedMessage>
                    </Normaltekst>
                </div>
            </div>
        </div>
    );
};

export default InfoOmKlage;
