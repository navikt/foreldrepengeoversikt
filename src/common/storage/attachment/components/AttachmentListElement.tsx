import * as React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Lenke from 'nav-frontend-lenker';

import VedleggIkon from 'common/components/ikoner/VedleggIkon';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { bytesString } from 'common/util/filesize';
import BEMHelper from 'common/util/bem';

import SlettKnapp from '../../../components/slett-knapp/SlettKnapp';

import './attachment.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    attachment: Attachment;
    showFileSize?: boolean;
    onDelete?: (files: Attachment[]) => void;
}

const AttachmentListElement: React.FunctionComponent<Props> = ({ attachment, showFileSize, onDelete }) => {
    const intl = useIntl();
    const BEM = BEMHelper('attachment');
    const cls = classnames(BEM.block, {
        [BEM.modifier('pending')]: attachment.pending,
    });

    return (
        <div className={cls}>
            {attachment.pending && (
                <div className={BEM.element('spinner')}>
                    <NavFrontendSpinner type="S" />
                </div>
            )}
            <VedleggIkon className={BEM.element('icon')} width={20} height={20} />
            <div className={BEM.element('filename')}>
                {attachment.url ? (
                    <Lenke href={attachment.url} target="_blank">
                        {attachment.filename}
                    </Lenke>
                ) : (
                    <Normaltekst>{attachment.filename}</Normaltekst>
                )}
                {showFileSize && <div>{bytesString(attachment.filesize)}</div>}
            </div>
            {onDelete && attachment.url && !attachment.pending && (
                <span className={BEM.element('deleteButton')}>
                    <SlettKnapp
                        onClick={() => onDelete([attachment])}
                        ariaLabel={intl.formatMessage({ id: 'vedlegg.arialabel.slett' }, { navn: attachment.filename })}
                    />
                </span>
            )}
        </div>
    );
};

export default AttachmentListElement;
