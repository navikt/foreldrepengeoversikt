import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '../old/common/util/bem';
import StatusIkon, { StatusKey } from '../ikoner/uttaksplanIkon/ikoner/StatusIkon';

interface Props {
    image: React.ReactNode;
    status: StatusKey;
    statusText: string;
    description: string;
}

const bem = BEMHelper('pictureScanningGuide').child('example');

const PictureScanningExample: React.FunctionComponent<Props> = ({ image, status, statusText, description }) => (
    <div className={bem.block}>
        <div className={bem.element('image')}>{image}</div>
        <Element tag="div" className={bem.element('title')}>
            <span className={bem.element('statusIcon')} role="presentation">
                <StatusIkon status={status} />
            </span>
            {statusText}
        </Element>
        <div className={bem.element('description')}>{description}</div>
    </div>
);

export default PictureScanningExample;
