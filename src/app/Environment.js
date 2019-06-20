const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        ["FEATURE_LOGGING"]: window.appSettings["FEATURE_LOGGING"],
        ["FEATURE_HISTOIKK"]: window.appSettings["FEATURE_HISTOIKK"],
        ["FEATURE_MINI_DIALOG"]: window.appSettings["FEATURE_MINI_DIALOG"],
    };
};

export default Environment();
