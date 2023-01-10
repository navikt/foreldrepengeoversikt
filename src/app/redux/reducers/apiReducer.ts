import ApiAction, { ApiActionTypes } from '../types/ApiAction';
import FetchState, { FetchStatus } from '../types/FetchState';
import SakBase from 'app/api/types/sak/Sak';
import { StorageKvittering } from 'app/api/types/StorageKvittering';
import { MinidialogInnslag, HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

export interface ApiState {
    søkerinfo: FetchState<Søkerinfo>;
    saker: FetchState<SakBase[]>;
    sakerv2: FetchState<any>;
    storageKvittering: FetchState<StorageKvittering>;
    historikk: FetchState<HistorikkInnslag[]>;
    minidialogInnslagListe: FetchState<MinidialogInnslag[]>;
    manglendeVedlegg: FetchState<ManglendeVedlegg[]>;
}

const getDefaultState = (): ApiState => ({
    søkerinfo: {
        status: FetchStatus.UNFETCHED,
    },
    saker: {
        status: FetchStatus.UNFETCHED,
    },
    sakerv2: {
        status: FetchStatus.UNFETCHED,
    },
    storageKvittering: {
        status: FetchStatus.UNFETCHED,
    },
    historikk: {
        status: FetchStatus.UNFETCHED,
    },
    minidialogInnslagListe: {
        status: FetchStatus.UNFETCHED,
    },
    manglendeVedlegg: {
        status: FetchStatus.UNFETCHED,
    },
});

const apiReducer = (state = getDefaultState(), action: ApiAction): ApiState => {
    switch (action.type) {
        case ApiActionTypes.GET_SØKERINFO_REQUEST:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_SØKERINFO_SUCCESS:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.SUCCESS,
                    data: {
                        ...action.payload.søkerinfo,
                    },
                },
            };

        case ApiActionTypes.GET_SØKERINFO_FAILURE:
            return {
                ...state,
                søkerinfo: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };
        case ApiActionTypes.GET_SAKER_REQUEST:
            return {
                ...state,
                saker: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_SAKER_SUCCESS:
            return {
                ...state,
                saker: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.saker,
                },
            };

        case ApiActionTypes.GET_SAKER_FAILURE:
            return {
                ...state,
                saker: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };
        case ApiActionTypes.GET_SAKER_V2_REQUEST:
            return {
                ...state,
                sakerv2: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_SAKER_V2_SUCCESS:
            return {
                ...state,
                sakerv2: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload,
                },
            };

        case ApiActionTypes.GET_SAKER_V2_FAILURE:
            return {
                ...state,
                sakerv2: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };
        case ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_STORAGE_KVITTERING_SUCCESS:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.SUCCESS,
                    data: {
                        ...action.payload.storageKvittering,
                    },
                },
            };

        case ApiActionTypes.GET_STORAGE_KVITTERING_FAILURE:
            return {
                ...state,
                storageKvittering: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };
        case ApiActionTypes.GET_HISTORIKK_REQUEST:
            return {
                ...state,
                historikk: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_HISTORIKK_SUCCESS:
            return {
                ...state,
                historikk: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.historikk,
                },
            };

        case ApiActionTypes.GET_HISTORIKK_FAILURE:
            return {
                ...state,
                historikk: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };
        case ApiActionTypes.GET_MINIDIALOG_REQUEST:
            return {
                ...state,
                minidialogInnslagListe: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };

        case ApiActionTypes.GET_MINIDIALOG_SUCCESS:
            return {
                ...state,
                minidialogInnslagListe: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.minidialogInnslagListe,
                },
            };

        case ApiActionTypes.GET_MINIDIALOG_FAILURE:
            return {
                ...state,
                minidialogInnslagListe: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };

        case ApiActionTypes.GET_MANGLENDE_VEDLEGG_REQUEST:
            return {
                ...state,
                manglendeVedlegg: {
                    status: FetchStatus.IN_PROGRESS,
                },
            };
        case ApiActionTypes.GET_MANGLENDE_VEDLEGG_SUCCESS:
            return {
                ...state,
                manglendeVedlegg: {
                    status: FetchStatus.SUCCESS,
                    data: action.payload.manglendeVedlegg,
                },
            };
        case ApiActionTypes.GET_MANGLENDE_VEDLEGG_FAILURE:
            return {
                ...state,
                manglendeVedlegg: {
                    status: FetchStatus.FAILURE,
                    error: action.payload.error,
                },
            };

        default: {
            return state;
        }
    }
};

export default apiReducer;
