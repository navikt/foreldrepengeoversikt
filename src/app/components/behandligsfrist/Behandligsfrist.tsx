import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import './behandlingsfrist.less';

interface Props {
    harLøpendeArbeidsforhold: boolean;
    behandligsdato: string;
}

const Behandligsfrist: React.StatelessComponent<Props> = ({ behandligsdato, harLøpendeArbeidsforhold }) => {
    const cls = BEMHelper('behandlingsfrist');
    return (
        <AlertStripe className={cls.className} type="info">
            <Lesmerpanel
                intro={
                    <span>
                        <Undertittel>
                            <FormattedMessage
                                id="dineForeldrepenger.behandligsfrist"
                                values={{ dato: behandligsdato }}
                            />
                        </Undertittel>
                    </span>
                }
                border={false}>
                <div>
                    <p style={{ marginTop: 0 }}>
                        <FormattedHTMLMessage
                            id={
                                harLøpendeArbeidsforhold
                                    ? 'dineForeldrepenger.behandligsfrist.arbeidstaker'
                                    : 'dineForeldrepenger.behandligsfrist.selvstendig'
                            }
                        />
                    </p>
                </div>
            </Lesmerpanel>
        </AlertStripe>
    );
};

export default Behandligsfrist;
