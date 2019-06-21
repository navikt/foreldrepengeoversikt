import Environment from './Environment';

export enum Feature {
    logging = 'FEATURE_LOGGING',
    historikk = 'FEATURE_HISTORIKK',
    miniDialog = 'FEATURE_MINI_DIALOG'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
