export const Routing = props => {
    const { component, authType, ...rest } = props;
    const loggedIn = rest.userInfo;

    if (!component) return window.location.replace('/');

    switch (authType) {
        case 'nonAuth':
            if (loggedIn) {
                return window.location.replace('/')
            }
            return component
        case 'auth':
            if (!loggedIn) {
                return window.location.replace('/login')
            }
            return component
        default: return component
    }
}
