import axios from "../helpers/axios";
import { productConstant } from "./Constants";


// done by videos
// export const addProduct = form =>{
//     return async dispatch => {
//         const res=await axios.post("product/create", form);
//         console.log(res.data)

//     }
// }




// done by me to display added product immediately
export const addProduct=(form,categories)=>{
    return async dispatch=>{
        dispatch({type:productConstant.ADD_NEW_PRODUCT_REQUEST});
        const res=await axios.post('product/create',form);
        if(res.status===201){
            dispatch({
                type:productConstant.ADD_NEW_PRODUCT_SUCCESS,
                payload: {product:res.data.product, categories:categories}
            });
        }else{
            dispatch({
                type:productConstant.ADD_NEW_PRODUCT_FAILURE,
                payload: res.data.error
            });
        }
        console.log(res,res.status);
    }

}