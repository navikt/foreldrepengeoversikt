const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        APP_VERSION: window.appSettings.APP_VERSION,
        ["FEATURE_LOGGING"]: window.appSettings["FEATURE_LOGGING"],
        ["FEATURE_HISTORIKK"]: window.appSettings["FEATURE_HISTORIKK"],
        ["FEATURE_MINI_DIALOG"]: window.appSettings["FEATURE_MINI_DIALOG"],
        ["FEATURE_DIN_PLAN"]: window.appSettings["FEATURE_DIN_PLAN"],
    };
};

export default Environment();
