import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import KnappBase from 'nav-frontend-knapper';

import CryBabyIcon from 'app/components/ikoner/CryBabyIkon';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { lenker } from '../../utils/lenker';
import BEMHelper from 'common/util/bem';

import './ingenSaker.less';

const IngenSaker = () => {
    const cls = BEMHelper('ingen-saker');
    return (
        <div className={cls.className}>
            <CryBabyIcon className={cls.element('icon')} />

            <Undertittel className={cls.element('title')}>
                <FormattedMessage id={'ingenSaker.title'} />
            </Undertittel>

            <Normaltekst className={cls.element('ingress')}>
                <FormattedMessage id={'ingenSaker.ingress'} />
            </Normaltekst>

            <div className={cls.element('options')}>
                <Lenke href={lenker.lesMerOmForeldrepenger.href}>
                    <KnappBase type={'standard'}>
                        <FormattedMessage id={'ingenSaker.lesMer'} />
                    </KnappBase>
                </Lenke>
                <Lenke href={lenker.søkOmForeldrepenger.href}>
                    <KnappBase type={'hoved'}>
                        <FormattedMessage id={'ingenSaker.søkNå'} />
                    </KnappBase>
                </Lenke>
            </div>

            <div className={cls.element('contact')}>
                <Normaltekst>
                    <FormattedMessage id={'ingenSaker.taKontaktIntro'} />
                </Normaltekst>
                <Lenke href={lenker.brukerstøtte.href}>
                    <FormattedMessage id={'ingenSaker.taKontakt'} />
                </Lenke>
            </div>
        </div>
    );
};

export default IngenSaker;
