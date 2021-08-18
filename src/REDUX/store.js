import { applyMiddleware, createStore, combineReducers } from "redux"
import logger from "redux-logger"
import { userReducer } from "./reducers/authReducer"
import { courseReducer } from "./reducers/courseReducer"

const rootReducer = combineReducers({
    authUser: userReducer,
    courseList: courseReducer
})
const middleware = [logger]

export const store = createStore(rootReducer, applyMiddleware(...middleware))