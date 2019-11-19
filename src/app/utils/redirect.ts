import Environment from '../Environment';

export const redirect = (url: string) => {
    window.location.href = url;
};

export const redirectToLogin = () => {
    redirect(Environment.LOGIN_URL + '?redirect=' + window.location.origin);
};