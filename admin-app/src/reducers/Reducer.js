import { combineReducers } from "redux";
import AuthReducer from "./Auth.reducer";
import UserReducer from "./User.reducer";
import CategoryReducer from "./Category.reducer"
import ProductReducer from "./Product.reducer"
import OrderReducer from "./Order.reducer"




const rootReducer=combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    category:CategoryReducer,
    product:ProductReducer,
    order:OrderReducer
})


export default rootReducer;