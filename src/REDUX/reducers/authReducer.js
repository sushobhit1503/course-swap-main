const INITIAL_STATE = {
    currentUser: {
        uid: "t0wDn1Y6PGaWIxuTXVPxMTT1DzB2",
        name: "Sushobhit Srivastava"
    }
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