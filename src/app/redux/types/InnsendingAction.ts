import EttersendingDto from 'app/api/types/ettersending/EttersendingDto';
import { FetchError, FetchStatus } from './FetchState';
import { History } from 'history';

export enum InnsendingActionTypes {
    'SEND_ETTERSENDELSE' = 'sendEttersendelse',
    'SEND_ETTERSENDELSE_SUCCESS' = 'sendEttersendelseSuccess',
    'SEND_ETTERSENDELSE_FAILED' = 'sendEttersendelseFailed'
}

export enum EttersendelseOrigin {
    'TILBAKEKREVING' = 'tilbakekreving',
    'ETTERSENDELSE' = 'ettersendelse'
}

export interface SendEttersendelse {
    type: InnsendingActionTypes.SEND_ETTERSENDELSE;
    payload: {
        ettersending: EttersendingDto;
        history: History;
        ettersendelseOrigin: EttersendelseOrigin;
    };
}

export interface SendEttersendelseFailed {
    type: InnsendingActionTypes.SEND_ETTERSENDELSE_FAILED;
    payload: {
        status: FetchStatus;
        error: FetchError;
    };
}

export type InnsendingAction = SendEttersendelse | SendEttersendelseFailed;
