import axios from "../helpers/axios"
import { categoryConstant, productConstant } from "./Constants";

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post("/initialdata");
        const {categories, products} = res.data;
        if (res.status == 200) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
        }
        console.log("Fetched Initial Data is ",res);
    }
}