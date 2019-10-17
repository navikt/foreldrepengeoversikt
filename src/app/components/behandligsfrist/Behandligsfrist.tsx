import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';

import BEMHelper from 'common/util/bem';
import { formatDate } from '../saksoversikt/utils';

import { lenker } from 'app/utils/lenker';

import './behandlingsfrist.less';

interface Props {
    harLøpendeArbeidsforhold: boolean;
    behandligsdato: string;
}

const Behandligsfrist: React.StatelessComponent<Props> = ({ behandligsdato, harLøpendeArbeidsforhold }) => {
    const cls = BEMHelper('behandlingsfrist');
    const dato = moment(behandligsdato).isSameOrAfter(moment(), 'days')
        ? behandligsdato
        : moment().format('YYYY-MM-DD');

    return (
        <AlertStripe className={cls.className} type="info">
            {!harLøpendeArbeidsforhold ? (
                <>
                    <Undertittel className="blokk-xs">
                        <FormattedMessage id="dineForeldrepenger.behandligsfrist" values={{ dato: formatDate(dato) }} />
                    </Undertittel>
                    <div>
                        <FormattedMessage id={'dineForeldrepenger.behandligsfrist.selvstendig'} />
                    </div>
                </>
            ) : (
                <Lesmerpanel
                    intro={
                        <span>
                            <Undertittel>
                                <FormattedMessage
                                    id="dineForeldrepenger.behandligsfrist"
                                    values={{ dato: formatDate(dato) }}
                                />
                            </Undertittel>
                            <>
                                <FormattedHTMLMessage id="dineForeldrepenger.behandligsfrist.arbeidstaker.1" />
                                <div className={cls.element('viktig-informasjon')}>
                                    <Lenke href={lenker.saksoversikt}>
                                        <FormattedMessage id="dineForeldrepenger.behandligsfrist.arbeidstaker.lenke" />
                                    </Lenke>
                                </div>
                            </>
                        </span>
                    }
                    border={false}
                    apneTekst={<FormattedMessage id="dineForeldrepenger.behandligsfrist.lesMer" />}>
                    <FormattedHTMLMessage id="dineForeldrepenger.behandligsfrist.arbeidstaker.2" />
                </Lesmerpanel>
            )}
        </AlertStripe>
    );
};

export default Behandligsfrist;
