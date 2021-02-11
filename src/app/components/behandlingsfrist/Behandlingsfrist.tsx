import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import { formatDate } from '../saksoversikt/utils';

import './behandlingsfrist.less';

interface Props {
    harLøpendeArbeidsforhold: boolean;
    behandlingsdato: string;
}

const Behandlingsfrist: React.FunctionComponent<Props> = ({ behandlingsdato, harLøpendeArbeidsforhold }) => {
    const cls = BEMHelper('behandlingsfrist');
    return (
        <AlertStripe className={cls.block} type="info">
            {!harLøpendeArbeidsforhold ? (
                <>
                    <Undertittel className="blokk-xs">
                        <FormattedMessage
                            id="dineForeldrepenger.behandlingsfrist"
                            values={{ dato: formatDate(behandlingsdato) }}
                        />
                    </Undertittel>
                    <div>
                        <FormattedMessage id={'dineForeldrepenger.behandlingsfrist.selvstendig'} />
                    </div>
                </>
            ) : (
                <Lesmerpanel
                    intro={
                        <span>
                            <Undertittel>
                                <FormattedMessage
                                    id="dineForeldrepenger.behandlingsfrist"
                                    values={{ dato: formatDate(behandlingsdato) }}
                                />
                            </Undertittel>
                            <FormattedMessage
                                id="dineForeldrepenger.behandlingsfrist.arbeidstaker.1"
                                values={{ dato: formatDate(behandlingsdato) }}
                            />
                        </span>
                    }
                    border={false}
                    apneTekst={<FormattedMessage id="dineForeldrepenger.behandlingsfrist.lesMer" />}
                >
                    <FormattedMessage id="dineForeldrepenger.behandlingsfrist.arbeidstaker.2" />
                </Lesmerpanel>
            )}
        </AlertStripe>
    );
};

export default Behandlingsfrist;
