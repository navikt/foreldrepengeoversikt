export const extractErrorMessage = (error: any): string | undefined => {
    return error && error.response && error.response.data && error.response.data.messages
        ? error.response.data.messages
        : undefined;
};

export const extractUUID = (error: any): string | undefined => {
    return error && error.response && error.response.data && error.response.data.uuid
        ? error.response.data.uuid
        : undefined;
};
