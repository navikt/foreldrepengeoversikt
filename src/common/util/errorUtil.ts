export const extractErrorMessage = (error: any): string | undefined => {
    return error && error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : undefined;
};

export const extractUUID = (error: any): string | undefined => {
    return error && error.response && error.response.data && error.response.data.uuid
        ? error.response.data.uuid
        : undefined;
};
