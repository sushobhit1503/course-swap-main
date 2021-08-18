const INITIAL_STATE = {
    currentUser1: {
        uid: "nxpwbWankxYsOa18qzMRJn3zAiv2",
        displayName: "Electrical"
    },
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case "SET_USER":
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}