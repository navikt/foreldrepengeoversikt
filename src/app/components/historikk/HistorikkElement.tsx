import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { formaterDatoForHendelse } from './util';
import { BehandlingResultatType, BehandlingÅrsak } from '../../api/types/sak/Behandling';
import Person from 'app/types/Person';

import './historikk.less';

export interface Hendelse {
    dato: string;
    beskrivelse: BehandlingÅrsak | BehandlingResultatType | string;
    brukerInitiertHendelse: boolean;
}

interface HistorikkElementProps {
    søker?: Person;
    hendelse: Hendelse;
}

type Props = HistorikkElementProps;

function HistorikkElement(props: Props) {
    const { hendelse } = props;

    const cls = BEMHelper('historikk-element');
    return (
        <li className={cls.className}>
            <MediaQuery maxWidth={745}>
                {(matches) => {
                    return (
                        <Snakkeboble
                            dato={formaterDatoForHendelse(hendelse.dato)}
                            pilHoyre={!hendelse.brukerInitiertHendelse && !matches}
                            ikonClass={hendelse.brukerInitiertHendelse ? 'bruker' : 'nav'}>
                            <Element tag="p">
                                <FormattedMessage id={`historikk.${hendelse.beskrivelse}`} />
                            </Element>
                        </Snakkeboble>
                    );
                }}
            </MediaQuery>
        </li>
    );
}

export default HistorikkElement;
