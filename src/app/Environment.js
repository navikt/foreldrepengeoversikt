const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        ['FEATURE_HISTORIKK']: window.appSettings['FEATURE_HISTORIKK'],
        ['FEATURE_MINI_DIALOG']: window.appSettings['FEATURE_MINI_DIALOG'],
        ['FEATURE_DIN_PLAN']: window.appSettings['FEATURE_DIN_PLAN'],
        ['FEATURE_KONTOOVERSIKT']: window.appSettings['FEATURE_KONTOOVERSIKT'],
        ['FEATURE_SAKSOVERSIKT']: window.appSettings['FEATURE_SAKSOVERSIKT']
    };
};

export default Environment();
