import React from 'react';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import classnames from 'classnames';

import './etikett.less';

interface EtikettProps {
    className?: string;
    etikett: string | React.ReactNode;
    value: string | React.ReactNode;
}

const Etikett = ({ className, etikett, value }: EtikettProps) => {
    return (
        <div className={classnames('etikett', className)}>
            <Normaltekst>{etikett}</Normaltekst>
            <Ingress>{value}</Ingress>
        </div>
    );
};

export default Etikett;
