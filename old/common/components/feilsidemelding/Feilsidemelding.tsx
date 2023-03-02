import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { VeilederProps } from '../veileder/Veileder';
import VeilederMedSnakkeboble from '../veileder-med-snakkeboble/VeilederMedSnakkeboble';
import Block from '../old/common/components/block/Block';
import { FormattedMessage } from 'react-intl';
import BEMHelper from '../old/common/util/bem';

import './feilsidemelding.less';
import Panel from 'nav-frontend-paneler';

export interface Props {
    containerId?: string;
    illustrasjon?: {
        tittel: string;
        tekst: React.ReactNode;
        lenke?: {
            url: string;
            tekst: string;
        };
        veileder?: VeilederProps;
    };
    tittel: React.ReactNode;
    ingress: React.ReactNode;
    uuid?: string;
    stacktrace: Error | null;
}

const Feilsidemelding: React.FunctionComponent<Props> = ({
    containerId,
    illustrasjon,
    tittel,
    ingress,
    uuid,
    stacktrace,
}) => {
    const cls = BEMHelper('feilsidemelding');
    return (
        <div className={cls.block} id={containerId}>
            {illustrasjon && (
                <VeilederMedSnakkeboble
                    veileder={illustrasjon.veileder}
                    dialog={{
                        title: illustrasjon.tittel,
                        text: (
                            <div>
                                <div>{illustrasjon.tekst}</div>

                                {illustrasjon.lenke && (
                                    <Lenke className={cls.element('intro-snakkelenke')} href={illustrasjon.lenke.url}>
                                        {illustrasjon.lenke.tekst}
                                    </Lenke>
                                )}
                            </div>
                        ),
                    }}
                />
            )}
            <div className={cls.element('content')}>
                <Block margin="s">
                    <Innholdstittel>{tittel}</Innholdstittel>
                </Block>
                <Block margin="l">
                    <Ingress>{ingress}</Ingress>
                </Block>
                {uuid && (
                    <Block margin="l">
                        <Ingress>
                            <FormattedMessage id="feilside.uuid" values={{ uuid }} />
                        </Ingress>
                    </Block>
                )}
                {stacktrace && (
                    <Panel border={true}>
                        <Block margin="xs">
                            <Normaltekst>{stacktrace.message}</Normaltekst>
                        </Block>
                        <Block>
                            <Normaltekst>{stacktrace.stack}</Normaltekst>
                        </Block>
                    </Panel>
                )}
            </div>
        </div>
    );
};

export default Feilsidemelding;
