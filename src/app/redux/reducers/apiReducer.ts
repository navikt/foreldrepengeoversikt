import ApiAction, { ApiActionTypes } from '../types/ApiAction';
import Personinfo from 'app/types/Personinfo';
import FetchState, { FetchStatus } from '../types/FetchState';
import Sak from 'app/types/Sak';
import { StorageKvittering } from 'app/types/StorageKvittering';

export interface ApiState {
    personinfo: FetchState<Personinfo>;
    saker: FetchState<Sak[]>;
    storageKvittering: FetchState<StorageKvittering>;
}

const getDefaultState = (): ApiState => ({
    personinfo: {
        status: FetchStatus.UNFETCHED
    },
    saker: {
        status: FetchStatus.UNFETCHED
    },
    storageKvittering: {
        status: FetchStatus.UNFETCHED
    }
});

const apiReducer = (state = getDefaultState(), action: ApiAction): ApiState => {
    switch (action.type) {
        case ApiActionTypes.GET_PERSONINFO_REQUEST:
            return {
                ...state,
                personinfo: {
                    status: FetchStatus.IN_PROGRESS
                }
            };

        case ApiActionTypes.GET_PERSONINFO_SUCCESS:
            return {
                ...state,
                personinfo: {
                    status: FetchStatus.SUCCESS,
                    data: {
                        ...action.payload.personinfo
                    }
                }
            };

        case ApiActionTypes.GET_PERSONINFO_FAILURE:
            return {
                ...state,
                personinfo: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error
                }
            };
        case ApiActionTypes.GET_SAKER_REQUEST:
            return {
                ...state,
                saker: {
                    status: FetchStatus.IN_PROGRESS
                }
            };

        case ApiActionTypes.GET_SAKER_SUCCESS:
            return {
                ...state,
                saker: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.saker
                }
            };

        case ApiActionTypes.GET_SAKER_FAILURE:
            return {
                ...state,
                saker: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error
                }
            };
        case ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.IN_PROGRESS
                }
            };

        case ApiActionTypes.GET_STORAGE_KVITTERING_SUCCESS:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.SUCCESS,
                    data: {
                        ...action.payload.storageKvittering
                    }
                }
            };

        case ApiActionTypes.GET_STORAGE_KVITTERING_FAILURE:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error
                }
            };
        default: {
            return state;
        }
    }
};

export default apiReducer;
