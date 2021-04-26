import { SET_STUBHUB, SET_USER } from "./actions";

export function userReducer(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.data
        default:
            return state
    }
}

export function stubHubReducer(state = null, action) {
    switch (action.type) {
        case SET_STUBHUB:
            return action.data
        default:
            return state
    }
}



  