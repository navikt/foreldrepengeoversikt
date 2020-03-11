import { FetchStatus } from '../types/FetchState';
import { InnsendingActionTypes, InnsendingAction } from '../types/InnsendingAction';

export interface InnsendingState {
    ettersendelse: {
        status: FetchStatus;
    };
}

const getDefaultState = (): InnsendingState => ({
    ettersendelse: {
        status: FetchStatus.UNFETCHED
    }
});

const innsendingReducer = (state = getDefaultState(), action: InnsendingAction): InnsendingState => {
    switch (action.type) {
        case InnsendingActionTypes.SEND_ETTERSENDELSE:
            return {
                ...state,
                ettersendelse: {
                    status: FetchStatus.IN_PROGRESS
                }
            };
        case InnsendingActionTypes.SEND_ETTERSENDELSE_SUCCESS:
            return {
                ettersendelse: {
                    status: FetchStatus.SUCCESS
                }
            };
        case InnsendingActionTypes.SEND_ETTERSENDELSE_FAILED:
            return {
                ettersendelse: {
                    status: FetchStatus.FAILURE
                }
            };
        default: {
            return state;
        }
    }
};

export default innsendingReducer;
