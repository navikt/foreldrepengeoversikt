import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames';
import Lenke from 'nav-frontend-lenker';
import './lenkeknapp.less';

interface Props {
    url: string;
    type?: string;
    children: ReactNode;
}

const Lenkeknapp: FunctionComponent<Props> = ({ url, type, children }) => (
    <Lenke
        target="_blank"
        rel="noopener"
        className={classnames('knapp', 'lenkeknapp', `knapp--${type || 'standard'}`)}
        href={url}
    >
        {children}
    </Lenke>
);

export default Lenkeknapp;
