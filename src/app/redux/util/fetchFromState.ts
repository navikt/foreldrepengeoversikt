import { get } from 'lodash';
import FetchState, { FetchStatus } from '../types/FetchState';

export const getData = <T>(fetchState: FetchState<T>, defaultValue: any): T => {
    return fetchState && fetchState.status === FetchStatus.SUCCESS ? fetchState.data : defaultValue;
};

export const getErrorCode = (fetchState: FetchState<any>): number | undefined => {
    return fetchState && fetchState.status === FetchStatus.FAILURE && fetchState.error && fetchState.error.response
        ? get(fetchState, 'error.response.status')
        : undefined;
};
