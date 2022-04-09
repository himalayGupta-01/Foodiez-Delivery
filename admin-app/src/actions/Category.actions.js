import axios from "../helpers/axios"
import { categoryConstant } from "./Constants";

// export const getAllCategory=()=>{
//     return async dispatch =>{

//         dispatch({type:categoryConstant.GET_ALL_CATEGORIES_REQUEST});

//         const res=await axios.get('category/getcategory') 
//         console.log(res);
//         if(res.status===200){

//             const {categories }=res.data

//             dispatch({
//                 type:categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
//                 payload:{categories:categories}
//             })
//         }else{
//             dispatch({
//                 type:categoryConstant.GET_ALL_CATEGORIES_FAILURE,
//                 payload:{error:res.data.error}
//             })
//         }
//     }
// }

export const addCategory=(name)=>{
    return async dispatch=>{
        dispatch({type:categoryConstant.ADD_NEW_CATEGORY_REQUEST});
        const res=await axios.post('/category/create',{name});
        if(res.status===201){
            dispatch({
                type:categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                payload: {category:res.data.category}
            });
        }else{
            dispatch({
                type:categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
        console.log(res,res.status);
    }

}