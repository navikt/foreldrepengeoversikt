import React, { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';
import SidepanelElement from './SidepanelElement';
import { lenker } from '../../utils/lenker';
import ChatIkon from '../ikoner/sidepanel/ChatIkon';
import SøkIkon from '../ikoner/sidepanel/SøkIkon';
import UtbetalingerIkon from '../ikoner/sidepanel/UtbetalingerIkon';
import { finnNesteUtbetalingsdato } from 'app/utils/dateUtils';
import Sak from 'app/types/Sak';

import './sidepanel.less';

interface Props {
    sak: Sak;
}

const Sidepanel: FunctionComponent<Props> = ({ sak }) => {
    const cls = BEMHelper('sidepanel');
    return (
        <aside className={cls.className}>
            <SidepanelElement
                title={finnNesteUtbetalingsdato().format('DD. MMMM')}
                tekst="sidepanel.utbetalingsdato"
            />
            <SidepanelElement
                icon={<UtbetalingerIkon />}
                lenke={{
                    lenketekst: 'sidepanel.utbetalinger',
                    href: lenker.utbetalinger
                }}
            />
            <SidepanelElement
                icon={<SøkIkon />}
                lenke={{
                    lenketekst: 'sidepanel.søk',
                    href: lenker.søk
                }}
            />
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
