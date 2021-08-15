import { applyMiddleware, createStore, combineReducers } from "redux"
import logger from "redux-logger"
import { userReducer } from "./reducers/authReducer"

const rootReducer = combineReducers({
    authUser: userReducer
})
const middleware = [logger]

export const store = createStore(rootReducer, applyMiddleware(...middleware))