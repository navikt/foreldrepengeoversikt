import React, { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';
import SidepanelElement from './SidepanelElement';
import { lenker } from '../../utils/lenker';
import ChatIkon from '../ikoner/sidepanel/ChatIkon';
import SøkIkon from '../ikoner/sidepanel/SøkIkon';
import UtbetalingerIkon from '../ikoner/sidepanel/UtbetalingerIkon';
import { finnNesteUtbetalingsdato } from 'app/utils/dateUtils';
import Sak from 'app/api/types/sak/Sak';
import {
    erLøpende,
    erForeldrepengesak,
    erAvsluttet,
    erInfotrygdSak,
    erEngangsstønad,
    harSøkt
} from 'app/utils/sakerUtils';

import './sidepanel.less';

interface Props {
    sak?: Sak;
}

const Sidepanel: FunctionComponent<Props> = ({ sak }) => {
    const cls = BEMHelper('sidepanel');
    return (
        <aside className={cls.className}>
            {sak && !erInfotrygdSak(sak) && erForeldrepengesak(sak) && erLøpende(sak) && harSøkt(sak) && (
                <SidepanelElement
                    title={finnNesteUtbetalingsdato().format('DD. MMMM')}
                    tekst="sidepanel.utbetalingsdato"
                />
            )}
            {sak !== undefined &&
                (erForeldrepengesak(sak) || erEngangsstønad(sak)) &&
                (erAvsluttet(sak) || erLøpende(sak)) && (
                    <SidepanelElement
                        icon={<UtbetalingerIkon />}
                        lenke={{
                            lenketekst: 'sidepanel.utbetalinger',
                            href: lenker.utbetalinger
                        }}
                    />
                )}
            {sak !== undefined && erForeldrepengesak(sak) && (
                <SidepanelElement
                    icon={<SøkIkon />}
                    lenke={{
                        lenketekst: 'sidepanel.søk',
                        href: lenker.søk
                    }}
                />
            )}
            <SidepanelElement
                icon={<ChatIkon />}
                lenke={{
                    lenketekst: 'sidepanel.chat',
                    href: lenker.chat
                }}
            />
        </aside>
    );
};

export default Sidepanel;
