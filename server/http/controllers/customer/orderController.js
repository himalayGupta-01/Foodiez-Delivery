const db = require("../../../db/connect")
const Order = require("../../../models/order")
function orderController() {
    return {
        async addOrder(req, res) {

            const { user, items, phone, address } = req.body.item;
            if (!user || !phone || !address) {
                return res.status(400).json({ error: "plz fill fields properly" })
            }
            const order = new Order({
                user,
                items,
                phone,
                address
            })
            await order.save((error, order) => {
                if (error) return res.status(400).json({ order })
                if (order) {
                    return res.status(201).json({ order })
                }
            });
        },

        async ordersById(req, res) {
            Order.find({user:req.params.id},null,{sort:{"createdAt":-1}}).exec((error, orders) => {
                if (error) return res.status(400).json({ error })
        
                if (orders) {
                    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0")
                    return res.status(200).json({ orders })
                }
            });
        },

        
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
            console.log(id,status)
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