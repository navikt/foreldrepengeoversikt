import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import { guid } from 'nav-frontend-js-utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { BehandlingResultatType, BehandlingÅrsak } from '../../api/types/sak/Behandling';
import Person from 'app/types/Person';
import normalizeName from 'app/utils/normalizeName';

import { formaterDatoForHendelse } from './util';

import './historikk.less';

export interface Hendelse {
    dato: string;
    type: BehandlingÅrsak | BehandlingResultatType | string;
    beskrivelse: string;
    arbeidsgiver?: {
        navn: string;
    };
    skjemanumre?: string[];
    brukerInitiertHendelse: boolean;
}

interface HistorikkElementProps {
    søker?: Person;
    hendelse: Hendelse;
}

type Props = HistorikkElementProps;

const getIkonClass = (hendelse: Hendelse) => {
    if (hendelse.brukerInitiertHendelse) {
        return 'bruker';
    } else {
        return hendelse.type === 'inntektsmelding-motatt' || hendelse.type === 'inntekt' ? 'arbeidsgiver' : 'nav';
    }
};

const HistorikkElement: React.StatelessComponent<Props> = (props: Props) => {
    const { hendelse } = props;

    const cls = BEMHelper('historikk-element');
    return (
        <li className={cls.block}>
            <MediaQuery maxWidth={745}>
                {(matches) => {
                    return (
                        <Snakkeboble
                            dato={formaterDatoForHendelse(hendelse.dato)}
                            pilHoyre={!hendelse.brukerInitiertHendelse && !matches}
                            ikonClass={getIkonClass(hendelse)}>
                            <>
                                <Element tag="p">
                                    <FormattedMessage id={`historikk.${hendelse.beskrivelse}`} />
                                </Element>
                                <div className={cls.element('tilleggsinformasjon')}>
                                    {hendelse.arbeidsgiver !== undefined && (
                                        <Normaltekst tag="p">{normalizeName(hendelse.arbeidsgiver.navn)}</Normaltekst>
                                    )}
                                    {hendelse.skjemanumre && hendelse.skjemanumre.length > 0 && (
                                        <ul>
                                            {hendelse.skjemanumre.map((skjemanummer) => (
                                                <li key={guid()}>
                                                    <FormattedMessage id={`historikk.${skjemanummer}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </>
                        </Snakkeboble>
                    );
                }}
            </MediaQuery>
        </li>
    );
};

export default HistorikkElement;
