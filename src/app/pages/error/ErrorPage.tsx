import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

import BEMHelper from 'common/util/bem';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import getMessage from 'common/util/i18nUtils';
import { lenker } from '../../utils/lenker';

import './errorPage.less';

export interface Props {
    errorMessage?: string;
    uuid?: string;
    clearError?: () => void;
}

const ErrorPage: React.FunctionComponent<Props> = ({ errorMessage, uuid, clearError }) => {
    const intl = useIntl();

    useEffect(() => {
        if (clearError !== undefined) {
            clearError();
        }
    });

    const cls = BEMHelper('error-page');
    return (
        <div className={cls.block}>
            <Feilsidemelding
                illustrasjon={{
                    tittel: getMessage(intl, 'feilside.bobletittel'),
                    tekst: getMessage(intl, 'feilside.bobletekst')
                }}
                tittel={getMessage(intl, 'feilside.tittel')}
                ingress={
                    errorMessage ? (
                        errorMessage
                    ) : (
                        <FormattedMessage
                            id="feilside.ingress"
                            values={{
                                lenke: (
                                    <Lenke href={lenker.brukerstøtte}>
                                        {getMessage(intl, 'feilside.ingress.lenke')}
                                    </Lenke>
                                )
                            }}
                        />
                    )
                }
                uuid={uuid}
            />
        </div>
    );
};

export default ErrorPage;
