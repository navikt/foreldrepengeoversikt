import React, { Component } from 'react';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import moment from 'moment';
import MinidialogLenkepanel from '../minidialog-lenkepanel/MinidialogLenkepanel';
import { guid } from 'nav-frontend-js-utils';
import { connect } from 'react-redux';
import { AppState } from 'app/redux/store';
import ApiAction, { ApiActionTypes } from 'app/redux/types/ApiAction';
import { getData } from 'app/redux/util/fetchFromState';

interface Props {
    requestMinidialog: () => void;
    minidialoger: MinidialogInnslag[];
}

class MinidialogContainer extends Component<Props> {
    componentDidMount() {
        this.props.requestMinidialog();
    }

    render() {
        return this.props.minidialoger
            .filter(({ gyldigTil, aktiv }) => aktiv && moment(gyldigTil).isSameOrAfter(moment(), 'days'))
            .map((minidialogInnslag) => (
                <MinidialogLenkepanel
                    key={guid()}
                    tittel="Svar på varsel om tilbakebetaling"
                    minidialogInnslag={minidialogInnslag}
                />
            ));
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        minidialoger: getData(state.api.minidialogInnslagListe, [])
    };
};

const mapDispatchToProps = (dispatch: (action: ApiAction) => void) => ({
    requestMinidialog: () => {
        dispatch({ type: ApiActionTypes.GET_MINIDIALOG_REQUEST });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MinidialogContainer);
