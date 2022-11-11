import { Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import './content-section.css';

type BackgroundColor = 'white' | 'blue';
type Padding = 'default' | 'none' | 'large';

interface Props {
    heading?: string;
    children: React.ReactNode;
    backgroundColor?: BackgroundColor;
    padding?: Padding;
}

const ContentSection: FunctionComponent<Props> = ({
    heading,
    children,
    backgroundColor = 'white',
    padding = 'default',
}) => {
    const bem = bemUtils('content-section');

    return (
        <section
            className={classNames(bem.block, bem.modifier(`bg-${backgroundColor}`), bem.modifier(`padding-${padding}`))}
        >
            {heading && (
                <Heading size="medium" level="2" className={bem.element('heading')}>
                    {heading}
                </Heading>
            )}
            {children}
        </section>
    );
};

export default ContentSection;
