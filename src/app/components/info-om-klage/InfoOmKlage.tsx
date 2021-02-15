import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../../utils/lenker';
import Environment from 'app/Environment';
import { SakBase } from 'app/api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import SpørsmålIkon from '../ikoner/SpørsmålIkon';
import KlageIkon from '../ikoner/KlageIkon';

import './infoOmKlage.less';
import { erForeldrepengesak, erSvangerskapepengesak } from 'app/utils/sakerUtils';

interface Props {
    sak: SakBase;
}

const InfoOmKlage: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = BEMHelper('infoOmKlage');

    const getStønadstype = () => {
        if (erForeldrepengesak(sak)) {
            return 'FORELDREPENGER';
        }

        if (erSvangerskapepengesak(sak)) {
            return 'SVANGERSKAPSPENGER';
        }

        return 'ENGANGSSTONAD';
    };

    return (
        <div className={bem.block}>
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
            <div className={bem.element('divider')} />
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
                                        href={`${Environment.KLAGE_URL}/ny?saksnummer=${
                                            sak.saksnummer
                                        }&tema=FOR&tittel=${getStønadstype()}`}
                                    >
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.klage.text.andreLenke" />
                                    </Lenke>
                                ),
                                saksbehandlingsTidLenke: (
                                    <Lenke href={lenker.saksbehandlingsTid}>
                                        <FormattedMessage id="saksoversikt.spørsmålEllerKlage.klage.text.saksbehandlingsTidLenke" />
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
