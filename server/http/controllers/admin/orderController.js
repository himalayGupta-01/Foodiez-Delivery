const db = require("../../../db/connect")
const Order = require("../../../models/order")
function orderController() {
    return {
        async allOrders(req, res) {
            Order.find({},null,{sort:{"createdAt":-1}}).exec((error, orders) => {
                if (error) return res.status(400).json({ error })
        
                if (orders) {
                    return res.status(200).json({ orders })
                }
            });
        },
        async updateOrder(req,res){
            const {id,status}=req.params;
            Order.findOneAndUpdate({_id:id},{$set:{status:status}}).exec((error, order) => {
                if (error) return res.status(400).json({ error })
        
                if (order) {
                    return res.status(200).json({ order })
                }
            });
        }
    }
}


module.exports = orderController