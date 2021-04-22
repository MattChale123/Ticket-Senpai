export const SET_USER = 'SET_USER';

export function setUser(data) {
    return {
        type: SET_USER,
        data,
    };
}

export const SET_STUBHUB = 'SET_STUBHUB';

export function setStubHub(data) {
    return {
        type: SET_STUBHUB,
        data,
    };
}