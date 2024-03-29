import { userConstant } from "../actions/Constants"

const initState={
    error:null,
    message:"",
    loading:false
}

const UserReducer=(state=initState,action)=>{
    switch(action.type){
        case userConstant.USER_REGISTER_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case userConstant.USER_REGISTER_SUCCESS:
            state={
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        case userConstant.USER_REGISTER_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
    }
    return state;
}

export default UserReducer