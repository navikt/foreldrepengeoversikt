import React from 'react';
import { History } from 'history';
import Page from '../page/Page';
import BEMHelper from '../old/common/util/bem';
import { FormattedMessage } from 'react-intl';
import { getData } from 'app/redux/util/fetchFromState';
import { connect } from 'react-redux';
import { AppState } from 'app/redux/store';
import MinidialogSkjema from '../../components/minidialog-skjema/MinidialogSkjema';
import { InnsendingActionTypes, InnsendingAction, EttersendelseOrigin } from 'app/redux/types/InnsendingAction';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import SakBase from 'app/api/types/sak/Sak';
import { Routes } from 'app/utils/routes';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { FetchStatus } from 'app/redux/types/FetchState';

interface OwnProps {
    history: History;
}

interface ReduxStateProps {
    minidialog: MinidialogInnslag | undefined;
    sak: SakBase | undefined;
    isSendingEttersendelse: boolean;
}

interface ReduxDispatchProps {
    sendEttersendelse: (ettersendelse: EttersendingDto) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

class MinidialogPage extends React.Component<Props> {
    render() {
        const { sak, sendEttersendelse, minidialog, history, isSendingEttersendelse } = this.props;
        if (!minidialog || !sak) {
            history.push(Routes.DINE_FORELDREPENGER);
            return null;
        }

        const cls = BEMHelper('minidialog');
        return (
            <Page
                className={cls.block}
                pageTitle={<FormattedMessage id="miniDialog.pageTitle" />}
                onBackClick={() => history.push(Routes.DINE_FORELDREPENGER)}
            >
                <MinidialogSkjema
                    sak={sak}
                    minidialog={minidialog}
                    onSubmit={sendEttersendelse}
                    isSendingEttersendelse={isSendingEttersendelse}
                />
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): ReduxStateProps => {
    const params = new URLSearchParams(props.history.location.search);
    const minidialog = getData(state.api.minidialogInnslagListe, []).find(
        (md) => md.dialogId === params.get('dialogId')
    );
    const isSendingEttersendelse = state.innsending.ettersendelse.status === FetchStatus.IN_PROGRESS;

    return {
        minidialog,
        sak: getData(state.api.saker, []).find((s) => minidialog && s.saksnummer === minidialog.saksnr),
        isSendingEttersendelse,
    };
};

const mapDispatchToProps = (dispatch: (action: InnsendingAction) => void, props: Props): ReduxDispatchProps => ({
    sendEttersendelse: (ettersendelse: EttersendingDto) => {
        dispatch({
            type: InnsendingActionTypes.SEND_ETTERSENDELSE,
            payload: {
                ettersending: ettersendelse,
                history: props.history,
                ettersendelseOrigin: EttersendelseOrigin.TILBAKEKREVING,
            },
        });
    },
});

export default connect<ReduxStateProps, ReduxDispatchProps>(mapStateToProps, mapDispatchToProps)(MinidialogPage);
