import React from 'react';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import MinidialogSkjema from 'app/components/minidialog-skjema/MinidialogSkjema';
import { SakOppslag } from 'app/types/SakOppslag';
import { useNavigate, useParams } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { useSetBackgroundColor } from 'app/hooks/useSetBackgroundColor';
import { Heading } from '@navikt/ds-react';
import EttersendingDto from 'app/types/EttersendingDTO';
import { useIntl } from 'react-intl';

interface Props {
    minidialoger: MinidialogInnslag[] | undefined;
    saker: SakOppslag;
}

const MinidialogPage: React.FunctionComponent<Props> = ({ minidialoger, saker }) => {
    const params = useParams();
    const navigate = useNavigate();
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((s) => s.saksnummer === params.saksnummer);
    const minidialog = minidialoger ? minidialoger.find((d) => d.saksnr === params.saksnummer) : undefined;
    useSetBackgroundColor('white');
    const intl = useIntl();

    const sendEttersendelse = (ettersendelse: EttersendingDto) => console.log('sending: ', ettersendelse);

    if (!minidialog || !sak) {
        navigate(OversiktRoutes.SAKSOVERSIKT);
        return null;
    }
    const sakstype = sak ? sak.ytelse : undefined;
    const bem = bemUtils('minidialog');

    return (
        <div className={bem.block}>
            <Block padBottom="l">
                <Heading size="large">{intlUtils(intl, 'miniDialog.tilbakekreving.undertittel')}</Heading>
            </Block>
            <MinidialogSkjema
                sakstype={sakstype!} //TODO, er den alltid ikke undefined?
                minidialog={minidialog}
                onSubmit={sendEttersendelse}
                // isSendingEttersendelse={isSendingEttersendelse}
            />
        </div>
    );
};

export default MinidialogPage;
