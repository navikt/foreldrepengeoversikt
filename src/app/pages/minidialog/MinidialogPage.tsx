import React from 'react';
import { History } from 'history';
import Page from '../page/Page';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';
import { getData } from 'app/redux/util/fetchFromState';
import { connect } from 'react-redux';
import { AppState } from 'app/redux/store';
import MinidialogSkjema from '../../components/minidialog-skjema/MinidialogSkjema';
import { InnsendingActionTypes, InnsendingAction } from 'app/redux/types/InnsendingAction';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import SakBase from 'app/api/types/sak/Sak';
import { Routes } from 'app/utils/routes';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

interface Props {
    history: History;
    minidialog?: MinidialogInnslag;
    sak?: SakBase;
    sendEttersendelse: (ettersendelse: EttersendingDto) => void;
}

class MinidialogPage extends React.Component<Props> {
    render() {
        const { sak, sendEttersendelse, minidialog, history } = this.props;
        if (!minidialog || !sak) {
            history.push(Routes.DINE_FORELDREPENGER);
            return null;
        }

        const cls = BEMHelper('minidialog');
        return (
            <Page
                className={cls.block}
                pageTitle={<FormattedMessage id="miniDialog.pageTitle" />}
                onBackClick={() => history.push(Routes.DINE_FORELDREPENGER)}>
                <MinidialogSkjema
                    sak={sak}
                    minidialog={minidialog}
                    onSubmit={sendEttersendelse}
                />
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => {
    const params = new URLSearchParams(props.history.location.search);
    const minidialog = getData(state.api.minidialogInnslagListe, []).find(
        (md) => md.dialogId === params.get('dialogId')
    );

    return {
        minidialog,
        sak: getData(state.api.saker, []).find((s) => minidialog && s.saksnummer === minidialog.saksnr)
    };
};

const mapDispatchToProps = (dispatch: (action: InnsendingAction) => void, props: Props) => ({
    sendEttersendelse: (ettersendelse: EttersendingDto) => {
        dispatch({
            type: InnsendingActionTypes.SEND_ETTERSENDELSE,
            payload: {
                ettersending: ettersendelse,
                history: props.history
            }
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MinidialogPage);
