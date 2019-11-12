import Environment from '../Environment';

export const redirect = (url: string, searchParams?: URLSearchParams) => {
    window.location.href = searchParams ? url + searchParams.toString() : url;
};

export const redirectToLogin = () => {
    redirect(
        Environment.LOGIN_URL,
        new URLSearchParams({
            redirect: window.location.origin
        })
    );
};