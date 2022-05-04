import { orderConstant } from "../actions/Constants";



// done by me to display added product immediately
const initialState = {
    orders: [],
    loading: false,
    error: null
}

const showOrders = (orders, order) => {
    let newOrders = [];
    newOrders.push({
        ...order
    });
    for (let ord of orders) {
        newOrders.push({
            ...ord
        })
    }
    
    return newOrders;
}

export default (state = initialState, action) => {
    switch (action.type) {

        case orderConstant.ORDER_PLACED_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case orderConstant.ORDER_PLACED_SUCCESS:
            state = {
                ...state,
                orders:showOrders(state.orders, action.payload.order),
                loading: false

            }
            break;
        case orderConstant.ORDER_PLACED_FAILURE:
            state = {
                ...initialState
            }
            break;

        case orderConstant.ORDERS_BY_ID_FETCHED_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
            x
        case orderConstant.ORDERS_BY_ID_FETCHED_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                loading: false

            }
            break;
        case orderConstant.ORDERS_BY_ID_FETCHED_FAILURE:
            state = {
                ...initialState
            }
            break;
    }
    return state;
}