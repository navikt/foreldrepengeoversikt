import React from 'react';
import CollapsableTextBlock from '../old/components/collapsable-text-block/CollapsableTextBlock';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';

const punktTekster = [
    'minidialog.hvaLeggerNAVVektPå.punkt1',
    'minidialog.hvaLeggerNAVVektPå.punkt2',
    'minidialog.hvaLeggerNAVVektPå.punkt3',
    'minidialog.hvaLeggerNAVVektPå.punkt4',
    'minidialog.hvaLeggerNAVVektPå.punkt5',
    'minidialog.hvaLeggerNAVVektPå.punkt6',
];

const HvaLeggerNAVVektPå: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <CollapsableTextBlock title={intl.formatMessage({ id: 'minidialog.hvaLeggerNAVVektPå.tittel' })}>
            <Normaltekst>
                <ul>
                    {punktTekster.map((punkt, index) => (
                        <li key={`${punkt}+${index}`}>
                            <FormattedMessage id={punkt} />
                        </li>
                    ))}
                </ul>
            </Normaltekst>
        </CollapsableTextBlock>
    );
};

export default HvaLeggerNAVVektPå;
