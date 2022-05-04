import { authConstant } from "../actions/Constants"

const initState = {
    token: null,
    user: {
        name: '',
        email: '',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

const AuthReducer = (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstant.LOGIN_FAILURE:
            state = {
                ...initState,
                // loading: true
            }
            break;
        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstant.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }

    return state;
}

export default AuthReducer
