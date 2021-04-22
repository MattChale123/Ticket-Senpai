import { combineReducers, createStore } from "redux";
import { stubHubReducer, userReducer } from "./reducers";


const rootReducer = combineReducers({
    user: userReducer,
    stubHub: stubHubReducer
})


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store