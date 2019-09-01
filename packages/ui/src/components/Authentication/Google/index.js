const appendGoogleScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://apis.google.com/js/platform.js?onload=onGoogleLoad';
    document.body.appendChild(script);
};

let googleAuth;

const onGoogleLoad = async () => {
    window.gapi.load('auth2', async () => {
        googleAuth = await window.gapi.auth2.init({
            client_id:
                '506399327542-3ndnltv6qfv3a7n6vniseket04h0betk.apps.googleusercontent.com'
        });
    });
};

const init = () => {
    window.onGoogleLoad = onGoogleLoad;
    appendGoogleScript();
};

const login = () => {
    googleAuth.signIn({
        scope: 'https://www.googleapis.com/auth/fitness.activity.read'
    });
};

export { init, login };
