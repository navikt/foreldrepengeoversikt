import Environment from '../Environment';

export const redirect = (url: URL, searchParams?: URLSearchParams) => {
    if (searchParams) {
        searchParams.forEach((value, key) => url.searchParams.append(key, value));
    }
    window.location.href = url.href;
};

export const redirectToLogin = () => {
    redirect(
        Environment.LOGIN_URL,
        new URLSearchParams({
            redirect: window.location.origin
        })
    );
};
