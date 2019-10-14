import React from 'react';
import { History } from 'history';
import Page from '../page/Page';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';
import { MinidialogInnslag } from 'app/api/types/MinidialogInnslag';
import { getData } from 'app/redux/util/fetchFromState';
import { connect } from 'react-redux';
import { State as AppState } from 'app/redux/store';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import MinidialogSkjema from '../../components/minidialog-skjema/MinidialogSkjema';
import { InnsendingActionTypes, InnsendingAction } from 'app/redux/types/InnsendingAction';
import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import Sak from 'app/api/types/sak/Sak';
import { Routes } from 'app/utils/routes';


interface Props {
    history: History;
    minidialog?: MinidialogInnslag;
    sak?: Sak;
    sendEttersendelse: (ettersendelse: EttersendingDto) => void;
}

interface State {
    attachments: Attachment[];
    fritekst: string;
}

class MinidialogPage extends React.Component<Props, State> {
    render() {
        const { sak, sendEttersendelse, minidialog, history } = this.props;
        if (!minidialog || !sak) {
            return null;
        }

        const cls = BEMHelper('minidialog');
        return (
            <Page
                className={cls.className}
                pageTitle={<FormattedMessage id="miniDialog.pageTitle" />}
                onBackClick={() => history.push(Routes.DINE_FORELDREPENGER)}>
                <MinidialogSkjema
                    sak={sak}
                    minidialog={minidialog}
                    onSubmit={(ettersendingDto: EttersendingDto) => sendEttersendelse(ettersendingDto)}
                />
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => {
    const params = new URLSearchParams(props.history.location.search);
    const minidialog = getData(state.api.minidialogInnslagListe, []).find(
        (md) => md.referanseId === params.get('referanseId')
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
