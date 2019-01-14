import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { lenker } from '../../utils/lenker';
import BEMHelper from 'common/util/bem';
import classnames from 'classnames';
import CryBabyIcon from 'app/components/ikoner/CryBabyIkon';
import KnappBase from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Veileder from 'common/components/veileder/Veileder';

import './ingenSaker.less';

const IngenSaker = () => {
    const cls = BEMHelper('ingen-saker');
    return (
        <div className={classnames(cls.className, 'blokk-m')}>
            <CryBabyIcon className={cls.element('icon')} />

            <Undertittel className={cls.element('title')}>
                <FormattedMessage id={'ingenSaker.title'} />
            </Undertittel>

            <Veilederpanel kompakt={true} svg={<Veileder />}>
                <Normaltekst className={cls.element('ingress')}>
                    <FormattedHTMLMessage id={'ingenSaker.ingress'} />
                </Normaltekst>
            </Veilederpanel>

            <div className={cls.element('options')}>
                <Lenke href={lenker.lesMerOmForeldrepenger}>
                    <KnappBase type={'standard'}>
                        <FormattedMessage id={'ingenSaker.lesMer'} />
                    </KnappBase>
                </Lenke>
                <Lenke href={lenker.søkOmForeldrepenger}>
                    <KnappBase type={'hoved'}>
                        <FormattedMessage id={'ingenSaker.søkNå'} />
                    </KnappBase>
                </Lenke>
            </div>
        </div>
    );
};

export default IngenSaker;
