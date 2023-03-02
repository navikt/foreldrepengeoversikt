import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import { guid } from 'nav-frontend-js-utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from '../old/common/util/bem';
import { BehandlingResultatType } from '../../api/types/sak/Behandling';
import Person from 'app/types/Person';
import normalizeName from 'app/utils/normalizeName';

import { formaterDatoForHendelse } from './util';

import './historikk.less';
import { HendelseType, HistorikkInnslagType } from 'app/api/types/historikk/HistorikkInnslag';
import { Skjemanummer } from '../old/common/storage/attachment/types/Skjemanummer';

export interface Hendelse {
    dato: string;
    type: HendelseType | BehandlingResultatType | HistorikkInnslagType | 'inntektsmelding-motatt' | 'søknad-sendt';
    beskrivelse: string;
    arbeidsgiver?: {
        navn: string;
    };
    skjemanumre?: Skjemanummer[];
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

const getInnslagTittel = (hendelse: Hendelse): React.ReactNode => {
    if (
        (hendelse.beskrivelse === HendelseType.INITIELL_FORELDREPENGER ||
            hendelse.beskrivelse === HendelseType.INITIELL_SVANGERSKAPSPENGER) &&
        hendelse.skjemanumre
    ) {
        return hendelse.skjemanumre.length > 0 ? (
            <FormattedMessage id={`historikk.${hendelse.beskrivelse}.medManglendeDokumentasjon`} />
        ) : (
            <FormattedMessage id={`historikk.${hendelse.beskrivelse}`} />
        );
    }

    return <FormattedMessage id={`historikk.${hendelse.beskrivelse}`} />;
};

const HistorikkElement: React.FunctionComponent<Props> = (props: Props) => {
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
                            ikonClass={getIkonClass(hendelse)}
                        >
                            <>
                                <Element tag="p">{getInnslagTittel(hendelse)}</Element>
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
