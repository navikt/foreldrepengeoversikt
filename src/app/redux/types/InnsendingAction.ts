import EttersendingDto from "app/api/types/ettersending/EttersendingDto";
import { FetchError } from "./FetchState";
import { History } from "history";

export enum InnsendingActionTypes {
    'SEND_ETTERSENDELSE' = 'sendEttersendelse',
    'SEND_ETTERSENDELSE_FAILED' = 'sendEttersendelseFailed'
}

export interface SendEttersendelse {
    type: InnsendingActionTypes.SEND_ETTERSENDELSE;
    payload: {
        ettersending: EttersendingDto;
        history : History;
    };
}

export interface SendEttersendelseFailed {
    type: InnsendingActionTypes.SEND_ETTERSENDELSE_FAILED;
    payload: {
        error: FetchError;
    };
}

export type InnsendingAction =
    | SendEttersendelse
    | SendEttersendelseFailed