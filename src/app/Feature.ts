import Environment from './Environment';

export enum Feature {
    historikk = 'FEATURE_HISTORIKK',
    miniDialog = 'FEATURE_MINI_DIALOG',
    dinPlan = 'FEATURE_DIN_PLAN',
    kontooversikt = 'FEATURE_KONTOOVERSIKT',
    saksoversikt = 'FEATURE_SAKSOVERSIKT',
    manglendeVedlegg = 'FEATURE_MANGLENDE_VEDLEGG'
}

export const isFeatureEnabled = (feature: Feature): boolean => {
    if (Environment[feature] && Environment[feature].toLowerCase() === 'on') {
        return true;
    }
    return false;
};
