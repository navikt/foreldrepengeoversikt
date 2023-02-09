import React from 'react';
import { intlUtils } from '@navikt/fp-common';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import MinidialogSkjema from 'app/components/minidialog-skjema/MinidialogSkjema';
import { SakOppslag } from 'app/types/SakOppslag';
import { useNavigate, useParams } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { useSetBackgroundColor } from 'app/hooks/useSetBackgroundColor';
// import { Heading } from '@navikt/ds-react';
import EttersendingDto from 'app/types/EttersendingDTO';
import { useIntl } from 'react-intl';
import ContentSection from 'app/components/content-section/ContentSection';
import Api from 'app/api/api';

interface Props {
    fnr: string;
    minidialoger: MinidialogInnslag[] | undefined;
    saker: SakOppslag;
}

const MinidialogPage: React.FunctionComponent<Props> = ({ fnr, minidialoger, saker }) => {
    const params = useParams();
    const navigate = useNavigate();
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((s) => s.saksnummer === params.saksnummer);
    const minidialog = minidialoger ? minidialoger.find((d) => d.saksnr === params.saksnummer) : undefined;
    useSetBackgroundColor('blue');
    const intl = useIntl();

    const sendEttersendelse = (ettersendelse: EttersendingDto) => {
        console.log('sending... ');
        Api.sendEttersending(ettersendelse, fnr);
        console.log('sendt!');
    };

    if (!minidialog || !sak) {
        navigate(OversiktRoutes.SAKSOVERSIKT);
        return null;
    }
    const sakstype = sak ? sak.ytelse : undefined;
    // const bem = bemUtils('minidialog');

    return (
        <ContentSection heading={intlUtils(intl, 'miniDialog.tilbakekreving.undertittel')}>
            {/* <Block padBottom="l">
                <Heading size="large">{intlUtils(intl, 'miniDialog.tilbakekreving.undertittel')}</Heading>
            </Block> */}
            <MinidialogSkjema
                sakstype={sakstype!} //TODO, er den alltid ikke undefined?
                minidialog={minidialog}
                onSubmit={sendEttersendelse}
                // isSendingEttersendelse={isSendingEttersendelse}
            />
        </ContentSection>
    );
};

export default MinidialogPage;
