import CategoryReducer from "./Category.reducer"
import { combineReducers } from "redux";
import ProductReducer from "./Product.reducer"



const rootReducer=combineReducers({
    category:CategoryReducer,
    product:ProductReducer
})


export default rootReducer;