const db = require("../../../db/connect")

function cartController(){
    return{
        index(req,res){
            res.send('hello from cart page')
        },
        update(req,res){

            //for firts time creting cart and adding basic object structure 
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart= req.session.cart

            //check if item doesnt exixt in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty+1
                cart.totalPrice=cart.totalPrice+req.body.price
            }else{
                cart.items[req.body._id].qty=cart.items[req.body._id]+1
                cart.totalQty=cart.totalQty+1
                cart.totalPrice=cart.totalPrice+req.body.price
            }


            return res.json({totalQty:req.session.cart.totalQty,session:req.session})
        }
    }
}


module.exports= cartController