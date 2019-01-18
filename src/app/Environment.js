import { Feature } from './Feature';


const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        [Feature.logging]: window.appSettings[Feature.logging]
    };
};

export default Environment();
