export const parseJWT = (token) => {
    try {
        const parsed = JSON.parse(atob(token.split('.')[1]));

        return parsed;
    } catch (e) {
        return 'error'
    }
};

