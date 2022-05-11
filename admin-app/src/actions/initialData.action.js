import axios from "../helpers/axios"
import { categoryConstant, orderConstant, productConstant } from "./Constants";

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post("/initialdata");
        const {categories, products,orders} = res.data;
        if (res.status === 200) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
            dispatch({
                type: orderConstant.ORDERS_FETCHED_SUCCESS,
                payload: { orders }
            });
        }
        console.log("Fetched Initial Data is ",res);
    }
}