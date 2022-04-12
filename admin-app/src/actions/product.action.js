import axios from "../helpers/axios";
import { productConstant } from "./Constants";


// done by videos
// export const addProduct = form =>{
//     return async dispatch => {
//         const res=await axios.post("product/create", form);
//         console.log(res.data)

//     }
// }

// export const allProducts =(categories) => {
//     return async dispatch => {
//         const res = await axios.get('product/getproduct');
//         dispatch({ type: GET_ALL_PRODUCTS_SUCCESS.ADD_NEW_PRODUCT_FAILURE,
//              payload: { products: res.data.products, categories: categories }
//         })
//     }
// }

// done by me to display added product immediately
export const addProduct = (form, categories) => {
    return async dispatch => {
        dispatch({ type: productConstant.ADD_NEW_PRODUCT_REQUEST });
        const res = await axios.post('product/create', form);
        if (res.status === 201) {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_SUCCESS,
                payload: { product: res.data.product, categories: categories }
            });
        } else {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_FAILURE,
                payload: res.data.error
            });
        }
        console.log(res, res.status);
    }

}

export const updateProduct = (form, id) => {
    return async dispatch => {
        console.log("Inside update Product action")
        dispatch({ type: productConstant.UPDATE_PRODUCT_REQUEST });
        const res = await axios.post(`/product/update/${id}`, { form });
        if (res.status === 201) {
            dispatch({
                type: productConstant.UPDATE_PRODUCT_SUCCESS,
                // payload: {category:res.data}
            });
        } else {
            dispatch({
                type: productConstant.UPDATE_PRODUCT_FAILURE,
                payload: res.data.error
            });
        }
        // console.log("Updated category Result is ",res);
    }

}

export const deleteProduct = (id) => {
    return async dispatch => {
        dispatch({ type: productConstant.DELETE_PRODUCT_REQUEST });
        const res = await axios.post(`/product/delete/${id}`);
        if (res.status === 200) {
            dispatch({
                type: productConstant.DELETE_PRODUCT_SUCCESS,
                // payload: {category:res.data}
            });
        } else {
            dispatch({
                type: productConstant.DELETE_PRODUCT_FAILURE,
                payload: res.data.error
            });
        }
        // console.log("Deleted category Result is ",res);
    }

}