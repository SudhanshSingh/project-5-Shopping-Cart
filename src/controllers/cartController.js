const { isValidObjectId } = require("mongoose")
const productModel = require("../models/productModel")



const updateCart= async function (req,res){
    try{

        let data = req.body
        let{cartId,productId,removeProduct}= data

        let userId =req.params.userId
        if(!validator.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userid is not valid" })

        if(! productId)return res.status(404).send({ status: false, message: "Productid is not present" })
        if(!validator.isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Productid is not valid" })
        let product = await productModel.findOne({_id:productId,isDeleted:false})
        if(! product) return res.status(404).send({ status: false, message: "No such product found or already deleted" })

        if(!validator.isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "cartid is not valid" })
        const cart = await cartModel.findOne({_id:cartId, userId:userId})
        if(!cart) return res.status(404).send({staus:false,message:'cart is not present or alreasdy deleated'})

        let itemInCart = cart.items
        for(let i=0;i<itemInCart.length;i++){  
        if(itemInCart[i][productId]=productId && itemInCart[i][quantity]>1) itemInCart[i][quantity]--
        if( itemInCart[i][quantity]< 1) return res.status(404).send({ status: false, message: "No such product found or already deleted" })

        let updateProduct = {}
        

        
    }
    const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId, userId: userId },
        updateProduct,
        { new: true }
      );
  
      return res.status(200).send({ status: true, message: "Cart is updated", data: updatedCart });
          
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}