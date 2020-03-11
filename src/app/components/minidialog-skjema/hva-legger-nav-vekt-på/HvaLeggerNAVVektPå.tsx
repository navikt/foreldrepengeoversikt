import React from 'react';
import CollapsableTextBlock from 'app/components/collapsable-text-block/CollapsableTextBlock';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';

interface Props {
    intl: InjectedIntl;
}

const punktTekster = [
    'minidialog.hvaLeggerNAVVektPå.punkt1',
    'minidialog.hvaLeggerNAVVektPå.punkt2',
    'minidialog.hvaLeggerNAVVektPå.punkt3',
    'minidialog.hvaLeggerNAVVektPå.punkt4',
    'minidialog.hvaLeggerNAVVektPå.punkt5',
    'minidialog.hvaLeggerNAVVektPå.punkt6'
];

const HvaLeggerNAVVektPå: React.FunctionComponent<Props> = ({ intl }) => {
    return (
        <CollapsableTextBlock title={intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tittel' })}>
            <Normaltekst>
                <ul>
                    {punktTekster.map((punkt) => (
                        <li>
                            <FormattedMessage id={punkt} />
                        </li>
                    ))}
                </ul>
            </Normaltekst>
        </CollapsableTextBlock>
    );
};

export default injectIntl(HvaLeggerNAVVektPå);
